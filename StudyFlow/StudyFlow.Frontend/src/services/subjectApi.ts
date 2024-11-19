import api from './apiConfig';
import i18n from '../i18n';

// Define la interfaz completa para SubjectDTO y su estructura
export interface SubjectDTO {
    id?: string;
    name: string;
    htmlContent: string; // Corregido para coincidir con el backend
    type: string; // Ejemplo: Homework, Classroom, etc.
    link?: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
    listScheduleds?: Array<{
        id?: string;
        subjectId?: string;
        scheduledDate: string; // Formato ISO 8601
        link?: string;
    }>;
    course: {
        id: string;
        teacherDTO: {
            id: string;
            fullName: string;
        };
        name: string;
        description: string;
        logo: string;
        isEnabled: boolean;
    };
}

// Función para agregar un Subject por curso
export const addSubjectByCourse = async (subjectDTO: {
    courseId: string;
    name: string;
    htmlContent: string;
    type: string;
    teacherId: string;
    link?: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
}): Promise<{ [x: string]: any; id: string }> => {
    try {
        // Lógica para enviar la solicitud
        const subjectResponse = await api.post('/OnBoardingTeacher/AddSubjectByCourse/', {
            courseId: subjectDTO.courseId,
            subjectDTO: {
                id: crypto.randomUUID(),
                name: subjectDTO.name,
                htmlContent: subjectDTO.htmlContent,
                type: subjectDTO.type,
                link: subjectDTO.link || null,
                youTubeVideos: subjectDTO.youTubeVideos || [],
                googleDriveLinks: subjectDTO.googleDriveLinks || [],
                alternateLinks: subjectDTO.alternateLinks || [],
                course: {
                    id: subjectDTO.courseId,
                    teacherDTO: {
                        id: subjectDTO.teacherId,
                        fullName: 'Teacher Name', // Sustituir con datos reales si están disponibles
                    },
                    name: 'Course Name',
                    description: 'Course Description',
                    logo: 'Logo URL',
                    isEnabled: true,
                },
            },
        });

        return subjectResponse.data;
    } catch (error: any) {
        console.error('API Error:', error);

        const errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred';

        console.error('Error Message:', errorMessage);
        throw new Error(errorMessage); // Lanza el error con más detalles
    }
};

// Nuevo método para agregar horarios al Subject
export const setSubjectSchedules = async (scheduleDTO: {
    courseId: string;
    subjectDTO: {
        id: string;
        course: {
            id: string;
            teacherDTO: {
                id: string;
                fullName: string;
            };
            name: string;
            description: string;
            logo: string;
            isEnabled: boolean;
        };
        listScheduleds?: Array<{
            id?: string;
            scheduledDate: string;
            link?: string;
        }>;
        name: string;
        htmlContent: string;
        type: string;
        link?: string;
        youTubeVideos?: string[];
        googleDriveLinks?: string[];
        alternateLinks?: string[];
    };
}): Promise<void> => {
    try {
        const { subjectDTO } = scheduleDTO;

        // Validación de `listScheduleds`
        const listScheduleds = subjectDTO.listScheduleds?.map((schedule) => ({
            id: schedule.id || crypto.randomUUID(),
            subjectId: subjectDTO.id,
            scheduledDate: schedule.scheduledDate,
            link: schedule.link || '',
        })) || [];

        const payload = {
            courseId: scheduleDTO.courseId,
            subjectDTO: {
                ...subjectDTO,
                listScheduleds, // Usar la lista procesada
            },
        };

        const response = await api.put('/OnBoardingTeacher/SetSubjectByCourse/', payload);

        console.log('Schedules successfully added:', response.data);
    } catch (error: any) {
        console.error('API Error:', error);

        const errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred while adding schedules.';

        console.error('Error Message:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Nuevo método para obtener todos los Subjects por CourseId
export const getSubjectsByCourseId = async (
    courseId: string,
    pagination: { page?: number; recordsNumber?: number; filter?: string }
): Promise<{
    success: boolean;
    data: {
        paginationResult: {
            listResult: SubjectDTO[];
            totalRecords: number;
            totalPages: number;
        };
    };
}> => {
    try {
        const response = await api.get('/OnBoardingTeacher/GetSubjectByCourseId', {
            params: {
                CourseId: courseId,
                'Pagination.Page': pagination.page,
                'Pagination.RecordsNumber': pagination.recordsNumber,
                'Pagination.Filter': pagination.filter,
            },
        });

        console.log('Subjects fetched successfully:', response.data);

        return response.data;
    } catch (error: any) {
        console.error('API Error:', error);

        const errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred while fetching subjects.';

        throw new Error(errorMessage);
    }
};

// Nuevo método para actualizar los horarios (listScheduleds) de un Subject
export const updateSubjectSchedules = async (payload: {
    subjectId: string;
    listScheduleds: Array<{
        id: string;
        subjectId: string;
        scheduledDate: string;
        link: string;
    }>;
}): Promise<void> => {
    try {
        const response = await api.put('/OnBoardingTeacher/UpdateSubjectSchedules', payload);

        console.log('Schedules updated successfully:', response.data);
    } catch (error: any) {
        console.error('API Error:', error);

        const errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred while updating schedules.';

        throw new Error(errorMessage);
    }
};