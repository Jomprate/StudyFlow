import api from './apiConfig';
import i18n from '../i18n';

// Define la interfaz completa para SubjectDTO y su estructura
// Define la interfaz completa para SubjectDTO
export interface SubjectDTO {
    id?: string;
    name: string;
    htmlContent: string;
    type: string;
    link?: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
    listScheduleds?: Array<{
        id?: string;
        subjectId?: string;
        scheduledDate: string;
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
    creationDate: string; // Fecha de creación
    modifiedDate?: string; // Fecha de última modificación (opcional)
}

export const addSubjectByCourse = async (payload: {
    courseId: string; // Course ID
    subjectDTO: {
        course: {
            id: string; // Course ID
            teacherDTO: {
                id: string; // Teacher ID
                fullName: string; // Teacher name
            };
            name: string; // Course name
            description: string; // Course description
            logo: string; // Course logo
            isEnabled: boolean; // Is course enabled
        };
        name: string;
        htmlContent: string;
        type: string;
        link?: string;
        youTubeVideos?: string[];
        googleDriveLinks?: string[];
        alternateLinks?: string[];
        listScheduleds?: Array<{
            id: string;
            subjectId: string;
            scheduledDate: string;
            link: string;
        }>;
        creationDate?: string; // Fecha de creación (opcional)
        modifiedDate?: string; // Fecha de modificación (opcional)
    };
}): Promise<{ id: string }> => {
    try {
        // Enviar el payload ajustado al backend
        const response = await api.post('/OnBoardingTeacher/AddSubjectByCourse/', {
            courseId: payload.courseId,
            subjectDTO: payload.subjectDTO,
        });

        return response.data; // Suponiendo que devuelve { id: string }
    } catch (error: any) {
        console.error('API Error:', error);

        const errorMessage = error.response?.data?.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred';

        throw new Error(errorMessage);
    }
};

// Función para agregar un Subject por curso
//export const addSubjectByCourse = async (payload: {
//    courseId: string; // Course ID
//    subjectDTO: {
//        course: {
//            id: string; // Course ID
//            teacherDTO: {
//                id: string; // Teacher ID
//                fullName: string; // Teacher name
//            };
//            name: string; // Course name
//            description: string; // Course description
//            logo: string; // Course logo
//            isEnabled: boolean; // Is course enabled
//        };
//        name: string;
//        htmlContent: string;
//        type: string;
//        link?: string;
//        youTubeVideos?: string[];
//        googleDriveLinks?: string[];
//        alternateLinks?: string[];
//        listScheduleds?: Array<{
//            id: string;
//            subjectId: string;
//            scheduledDate: string;
//            link: string;
//        }>;
//    };
//}): Promise<{ id: string }> => {
//    try {
//        // Enviar el payload ajustado al backend
//        const response = await api.post('/OnBoardingTeacher/AddSubjectByCourse/', {
//            courseId: payload.courseId,
//            subjectDTO: payload.subjectDTO,
//        });

//        return response.data; // Suponiendo que devuelve { id: string }
//    } catch (error: any) {
//        console.error('API Error:', error);

//        const errorMessage = error.response?.data?.message
//            ? error.response.data.message
//            : error.message || 'An unexpected error occurred';

//        throw new Error(errorMessage);
//    }
//};

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

        // Mapear y agregar el CourseDTO completo a cada SubjectDTO
        const updatedResponse = {
            ...response.data,
            data: {
                ...response.data.data,
                paginationResult: {
                    ...response.data.data.paginationResult,
                    listResult: response.data.data.paginationResult.listResult.map(
                        (subject: SubjectDTO) => ({
                            ...subject,
                            creationDate: subject.creationDate || 'Unknown',
                            modifiedDate: subject.modifiedDate || null,
                            course: {
                                id: courseId,
                                teacherDTO: {
                                    id: subject.course?.teacherDTO?.id || '',
                                    fullName: subject.course?.teacherDTO?.fullName || 'Unknown Teacher',
                                },
                                name: subject.course?.name || 'Unknown Course',
                                description: subject.course?.description || 'No Description',
                                logo: subject.course?.logo || '',
                                isEnabled: subject.course?.isEnabled ?? true,
                            },
                        })
                    ),
                },
            },
        };

        return updatedResponse;
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