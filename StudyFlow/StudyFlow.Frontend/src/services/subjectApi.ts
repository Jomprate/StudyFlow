import api from './apiConfig';
import i18n from '../i18n';

// Define la interfaz SubjectDTO que usaremos en el request
export interface SubjectDTO {
    name: string;
    content: string;
    type: string;  // Asumiendo que el tipo de subject es un string
    link?: string;
}

// Función para agregar un Subject por curso
export const addSubjectByCourse = async (subjectDTO: {
    courseId: string;
    name: string;
    content: string;
    type: string;  // Asegúrate de que el tipo es correcto (Homework, Classroom, etc.)
    link?: string;
}): Promise<void> => {
    try {
        // Asegurarnos de que el contenido y el tipo están correctos
        if (!subjectDTO.name || !subjectDTO.content || !subjectDTO.type) {
            throw new Error('Missing required fields');
        }

        const subjectData = {
            courseId: subjectDTO.courseId,
            subjectDTO: {
                name: subjectDTO.name,
                content: subjectDTO.content,  // Aquí puedes sanitizar el contenido si es necesario
                type: subjectDTO.type,        // Tipo debe ser uno válido (Homework, Classroom, etc.)
                link: subjectDTO.link,
            }
        };

        // Realizamos la solicitud POST para crear un subject
        const response = await api.post('/OnBoardingTeacher/AddSubjectByCourse', subjectData);

        console.log('Subject added successfully:', response.data);
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