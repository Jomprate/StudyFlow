import api from './apiConfig';
import i18n from '../i18n';

const handleApiError = (error: any): never => {
    const errorMessage = error.response
        ? `API response error: ${JSON.stringify(error.response.data)}`
        : error.request
            ? 'No response received from API'
            : `Request setup error: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
};

export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    teacher: string;
    logo?: string;
    isEnabled: boolean;
    userId?: string;
    creationDate?: string;
    modifiedDate?: string;
    data?: any;
}

const mapCourse = (course: any): CourseDTO => {
    const { id, name, description, teacherDTO, logo, isEnabled, creationDate, modifiedDate, ...extraData } = course;

    return {
        id,
        name,
        description: description || "",
        teacher: teacherDTO?.fullName || "Unknown",
        logo: logo || "",
        isEnabled,
        creationDate: creationDate || null,
        modifiedDate: modifiedDate || null,
        data: extraData,
    };
};

export const createCourse = async (courseDTO: {
    id?: string;
    teacherId: string;
    name: string;
    description?: string;
    logo?: string;
    isEnabled?: boolean;
}): Promise<void> => {
    try {
        console.log("Payload enviado al backend:", {
            id: courseDTO.id,
            teacherDTO: {
                id: courseDTO.teacherId,
                fullName: "string",
            },
            name: courseDTO.name,
            description: courseDTO.description,
            logo: courseDTO.logo,
            isEnabled: courseDTO.isEnabled ?? true,
        });

        const response = await api.post('/OnBoardingTeacher/CreateCourse', {
            id: courseDTO.id,
            teacherDTO: {
                id: courseDTO.teacherId,
                fullName: "string",
            },
            name: courseDTO.name,
            description: courseDTO.description,
            logo: courseDTO.logo,
            isEnabled: courseDTO.isEnabled ?? true,
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
                'Pagination.RecordsNumber': recordsNumber,
            },
        });

        const { listResult, pagination } = response.data.value?.data || {};

        if (!Array.isArray(listResult)) throw new Error('Unexpected response format');

        const coursesArray = listResult
            .filter((course: any) => !course.isDeleted)
            .map(mapCourse);

        return {
            data: coursesArray,
            totalPages: pagination?.totalPages || 0,
            totalRecords: pagination?.totalRecords || 0,
        };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getCoursesByTeacherIdAsync = async (teacherId: string): Promise<{ statusCode: number, data: CourseDTO[] }> => {
    try {
        const response = await api.get(`/OnBoardingTeacher/GetCoursesByTeacherId`, {
            params: { TeacherId: teacherId }
        });

        console.log("Full response data:", response.data);

        const { value } = response.data || {};
        const coursesData = Array.isArray(value?.data) ? value.data : [];

        console.log("Courses Data (Raw):", coursesData);

        if (coursesData.length > 0) {
            const coursesArray: CourseDTO[] = coursesData
                .filter((course: any) => !course.isDeleted)
                .map((course: any) => {
                    console.log("Mapping Course:", course);
                    return {
                        id: course.id,
                        name: course.name,
                        description: course.description,
                        teacher: course.teacherDTO?.fullName || "Unknown",
                        logo: course.logo || "",
                        userId: course.teacherDTO?.id || null,
                        isEnabled: course.isEnabled,
                        data: ""
                    };
                });

            console.log("Mapped Courses Array:", coursesArray); // Debug después del mapeo

            return {
                statusCode: response.status,
                data: coursesArray
            };
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

export const deleteCourse = async (courseId: string): Promise<void> => {
    try {
        const response = await api.delete(`/OnBoardingTeacher/DeleteCourse`, {
            params: { courseId }, // Enviar el parámetro como query
        });
        console.log('Course deleted successfully:', response.data);
    } catch (error: any) {
        const errorMessage = error.response
            ? `Error deleting course: ${error.response.data}`
            : error.request
                ? 'No response received from the server.'
                : `Error setting up the request: ${error.message}`;
        throw new Error(errorMessage);
    }
};