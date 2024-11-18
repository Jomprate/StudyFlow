import api from './apiConfig';
import i18n from '../i18n';

export const createCourse = async (courseDTO: {
    id?: string;
    teacherId: string;
    name: string;
    description?: string;
    logo?: string;
    isEnabled?: boolean;
}): Promise<void> => {
    try {
        const response = await api.post('/OnBoardingTeacher/CreateCourse', {
            id: courseDTO.id,
            teacherDTO: {
                id: courseDTO.teacherId,
                fullName: "string" // Puedes obtener este dato si es necesario
            },
            name: courseDTO.name,
            description: courseDTO.description,
            logo: courseDTO.logo,
            isEnabled: courseDTO.isEnabled ?? true
        });

        console.log('Course created successfully:', response.data);
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    teacher: string;
    logo?: string;
    isEnabled: boolean;
}

export const getCoursesByTeacherIdPaginatedAsync = async (
    teacherId: string,
    page: number,
    recordsNumber: number
): Promise<{ data: CourseDTO[], totalPages: number, totalRecords: number }> => {
    try {
        const response = await api.get(`/OnBoardingTeacher/GetCoursesByTeacherIdPaginated`, {
            params: {
                TeacherId: teacherId,
                'Pagination.Page': page,
                'Pagination.RecordsNumber': recordsNumber
            }
        });

        console.log("Full response data:", response.data);

        const { value } = response.data;
        if (value && value.data?.listResult) {
            const { listResult, pagination } = value.data;

            const coursesArray: CourseDTO[] = listResult.map((course: any) => ({
                id: course.id,
                name: course.name,
                description: course.description,
                teacher: course.teacherDTO?.fullName || "Unknown",
                logo: course.logo || "",
                userId: course.userId,
                isEnabled: course.isEnabled,
            }));

            return {
                data: coursesArray,
                totalPages: pagination.totalPages,
                totalRecords: pagination.totalRecords
            };
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? `Error en la respuesta de la API: ${error.response.data}`
            : error.request
                ? 'No response received from API'
                : `Error setting up request: ${error.message}`;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getCoursesByTeacherIdAsync = async (teacherId: string): Promise<CourseDTO[]> => {
    try {
        const response = await api.get(`/OnBoardingTeacher/GetCoursesByTeacherId`, {
            params: { TeacherId: teacherId }
        });

        console.log("Full response data:", response.data);

        const { value } = response.data || {};

        const coursesData = Array.isArray(value) ? value : (value?.data || response.data);

        if (coursesData && Array.isArray(coursesData)) {
            const coursesArray: CourseDTO[] = coursesData.map((course: any) => ({
                id: course.id,
                name: course.name,
                description: course.description,
                teacher: course.teacherDTO?.fullName || "Unknown",
                logo: course.logo || "",
                userId: course.userId,
                isEnabled: course.isEnabled,
            }));

            return coursesArray;
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? `API response error: ${error.response.data}`
            : error.request
                ? 'No response received from API'
                : `Request setup error: ${error.message}`;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getCourseByIdAsync = async (courseId: string, teacherId: string): Promise<CourseDTO> => {
    try {
        const response = await api.get(`/OnBoardingTeacher/GetCourseById/${courseId}`, {
            params: { teacherId },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response
            ? `Error en la respuesta de la API: ${JSON.stringify(error.response.data)}`
            : error.request
                ? 'No response received from API'
                : `Error setting up request: ${error.message}`;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
}

export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    teacher: string;
    logo?: string;
    isEnabled: boolean;
}

export const getCourseAnnouncesPaginated = async (
    courseId: string,
    page: number = 1,
    recordsNumber: number = 10
): Promise<PaginatedResponse<any>> => {
    try {
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}`, {
            params: { page, recordsNumber }
        });

        console.log("Full response from API:", response.data);

        const listResult = response.data.value?.data?.listResult || response.data.value?.listResult;

        if (!Array.isArray(listResult)) {
            console.warn("Unexpected response format", response.data);
            return { data: [], totalPages: 0 };
        }

        const announcementsArray = listResult.map((announcement: any) => ({
            id: announcement.id,
            title: announcement.title,
            description: announcement.htmlContent,
            userName: announcement.userName,
            userId: announcement.userId,
            creationDate: announcement.creationDate,
            youTubeVideos: announcement.youTubeVideos,
            googleDriveLinks: announcement.googleDriveLinks,
            alternateLinks: announcement.alternateLinks,
        }));

        console.log("Mapped announcementsArray:", announcementsArray);

        return {
            data: announcementsArray,
            totalPages: response.data.value?.data?.totalPages || response.data.value?.totalPages || 0
        };
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.log("No announcements found for this course. Returning empty result.");
            return { data: [], totalPages: 0 };
        } else {
            const errorMessage = error.response
                ? i18n.t('global_error_apiResponse', { message: error.response.data })
                : error.request
                    ? i18n.t('global_error_noResponse')
                    : i18n.t('global_error_requestSetup', { message: error.message });

            console.error("Error configuring the request:", errorMessage);
            throw new Error(errorMessage);
        }
    }
};

export const addEnrollmentByStudent = async (enrollmentDTO: {
    courseId: string;
    emailStudent: string;
}): Promise<void> => {
    try {
        const response = await api.post('/OnBoardingTeacher/AddEnrollmentByStudent', {
            courseId: enrollmentDTO.courseId,
            emailStudent: enrollmentDTO.emailStudent,
        });

        console.log('Student enrolled successfully:', response.data);
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};