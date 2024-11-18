import api from './apiConfig';
import i18n from '../i18n';

export interface EnrollmentDTO {
    isCompleted: boolean;
    id: string;
    studentName: string;
    email: string;
    enrollmentDate: string;
    isEnabled: boolean;
}

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

//export const getEnrollmentsByCourseId = async (
//    courseId: string,
//    page: number,
//    recordsNumber: number
//): Promise<{ data: EnrollmentDTO[], totalPages: number, totalRecords: number }> => {
//    try {
//        const response = await api.get('/OnBoardingTeacher/GetEnrollmentsByCourseId', {
//            params: {
//                CourseId: courseId,
//                'Pagination.Page': page,
//                'Pagination.RecordsNumber': recordsNumber
//            }
//        });

//        // Ajustar para manejar la estructura de la respuesta
//        if (response.data.success && response.data.data?.paginationResult?.listResult) {
//            const { listResult, totalPages, totalRecords } = response.data.data.paginationResult;

//            const enrollmentsArray: EnrollmentDTO[] = listResult.map((enrollment: any) => ({
//                id: enrollment.studentDTO?.id || "Unknown",
//                studentName: `${enrollment.studentDTO?.firstName || "Unknown"} ${enrollment.studentDTO?.lastName || ""}`,
//                email: enrollment.studentDTO?.email || "",
//                enrollmentDate: enrollment.createdDateTime || "N/A",
//                isEnabled: enrollment.studentDTO?.isEnabled || false,
//            }));

//            return {
//                data: enrollmentsArray,
//                totalPages: totalPages || 0,
//                totalRecords: totalRecords || 0,
//            };
//        } else {
//            console.error("Unexpected response format:", response.data);
//            throw new Error('Unexpected response format');
//        }
//    } catch (error: any) {
//        const errorMessage = error.response
//            ? i18n.t('global_error_apiResponse', { message: JSON.stringify(error.response.data) })
//            : error.request
//                ? i18n.t('global_error_noResponse')
//                : i18n.t('global_error_requestSetup', { message: error.message });

//        console.error(errorMessage);
//        throw new Error(errorMessage);
//    }
//};
// Define el tipo `EnrollmentDTO` para que coincida con la respuesta esperada del backend

export const getEnrollmentsByCourseId = async (
    courseId: string,
    page: number,
    recordsNumber: number
): Promise<{ data: EnrollmentDTO[], totalPages: number, totalRecords: number }> => {
    try {
        // Realizamos la petición GET a la API
        const response = await api.get('/OnBoardingTeacher/GetEnrollmentsByCourseId', {
            params: {
                CourseId: courseId,
                'Pagination.Page': page,
                'Pagination.RecordsNumber': recordsNumber
            }
        });

        // Verificar que la API devuelve la respuesta correcta y que los datos contienen los campos necesarios
        console.log('API Response:', response.data);

        // Comprobar si la respuesta tiene la estructura esperada
        if (response.data.success && response.data.data?.paginationResult?.listResult) {
            const { listResult, totalPages, totalRecords } = response.data.data.paginationResult;

            // Comprobar que los datos de los estudiantes (listResult) contienen la información necesaria
            console.log('List of Students:', listResult);

            const enrollmentsArray: EnrollmentDTO[] = listResult.map((enrollment: any) => {
                // Comprobar cada objeto de estudiante para ver si contiene los valores esperados de isEnabled e isCompleted
                console.log('Student Enrollment Data:', enrollment);

                // Aquí verificamos si isCompleted está presente, si no lo está, lo asignamos a false (o cualquier valor predeterminado)
                const isEnabled = enrollment.isEnabled;
                //const isEnabled = enrollment.studentDTO?.isEnabled;
                const isCompleted = enrollment.isCompleted !== undefined ? enrollment.isCompleted : false;

                console.log(`isEnabled: ${isEnabled}, isCompleted: ${isCompleted}`);

                return {
                    id: enrollment.studentDTO?.id || "Unknown",
                    studentName: `${enrollment.studentDTO?.firstName || "Unknown"} ${enrollment.studentDTO?.lastName || ""}`,
                    email: enrollment.studentDTO?.email || "",
                    enrollmentDate: enrollment.createdDateTime || "N/A",
                    isEnabled: isEnabled, // Verifica si este valor está presente
                    isCompleted: isCompleted, // Verifica si este valor está presente
                };
            });

            return {
                data: enrollmentsArray,
                totalPages: totalPages || 0,
                totalRecords: totalRecords || 0,
            };
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        // Manejo de errores si la API falla
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: JSON.stringify(error.response.data) })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};