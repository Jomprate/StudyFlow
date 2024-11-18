import api from './apiConfig';
import i18n from '../i18n';

// DTO para los cursos
export interface CourseDTO {
    id: string;
    title: string;
    description: string;
    createdDate: string;
    isActive: boolean;
}

// Obtener cursos por el ID del estudiante
export const getCoursesByStudentId = async (
    studentId: string,
    page: number,
    recordsNumber: number
): Promise<{ data: CourseDTO[], totalPages: number, totalRecords: number }> => {
    try {
        const response = await api.get('/OnBoardingStudent/GetCoursesByStudentId', {
            params: {
                StudentId: studentId,
                'Pagination.Page': page,
                'Pagination.RecordsNumber': recordsNumber
            }
        });

        // Verificar si la respuesta es correcta
        console.log('API Response:', response.data);

        // Comprobar si la respuesta tiene la estructura esperada
        if (response.data.success && response.data.data?.paginationResult?.listResult) {
            const { listResult, totalPages, totalRecords } = response.data.data.paginationResult;

            const coursesArray: CourseDTO[] = listResult.map((course: any) => {
                console.log('Course Data:', course);
                return {
                    id: course.id || "Unknown",
                    title: course.title || "No title",
                    description: course.description || "No description",
                    createdDate: course.createdDate || "N/A",
                    isActive: course.isActive || false
                };
            });

            return {
                data: coursesArray,
                totalPages: totalPages || 0,
                totalRecords: totalRecords || 0,
            };
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: JSON.stringify(error.response.data) })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
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