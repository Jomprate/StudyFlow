import api from './apiConfig';
import i18n from '../i18n';

export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    teacher: string;
    logo?: string;
    isEnabled: boolean;
}

export const getCoursesByStudentIdAsync = async (
    studentId: string,
    page: number,
    recordsNumber: number
): Promise<{ data: CourseDTO[], totalPages: number, totalRecords: number }> => {
    try {
        const response = await api.get('/OnBoardingStudent/GetCoursesByStudent', {
            params: {
                StudentId: studentId,
                'Pagination.Page': page,
                'Pagination.RecordsNumber': recordsNumber
            }
        });

        if (response.data.success && response.data.data?.paginationResult?.listResult) {
            const { listResult, totalPages, totalRecords } = response.data.data.paginationResult;

            const coursesArray: CourseDTO[] = listResult.map((course: any) => ({
                id: course.id || "Unknown",
                name: course.name || "No title",
                description: course.description || "No description",
                createdDate: course.createdDate || "N/A",
                isActive: course.isActive || false,
                teacher: course.teacherDTO?.fullName || "No Teacher",
                logo: course.logo || "",
            }));

            return {
                data: coursesArray,
                totalPages: totalPages || 0,
                totalRecords: totalRecords || 0,
            };
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error("Error en la respuesta de la API:", error);
        throw new Error('Error fetching courses');
    }
};

export const addEnrollmentByStudent = async (enrollmentDTO: {
    courseId: string;
    emailStudent: string;
}): Promise<void> => {
    try {
        const response = await api.post('/OnBoardingStudent/AddEnrollmentByStudent', {
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