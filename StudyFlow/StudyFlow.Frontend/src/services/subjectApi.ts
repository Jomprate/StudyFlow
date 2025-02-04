/* eslint-disable no-console */
import i18n from '../i18n';
import api from './apiConfig';
import { AxiosError } from 'axios';

const handleError = (error: unknown) => {
    let errorKey = 'errors.unexpected';

    if (error instanceof AxiosError) {
        if (!error.response) {
            errorKey = 'errors.network';
        } else if (error.response.status >= 500) {
            errorKey = 'errors.server';
        } else if (error.response.status === 400) {
            errorKey = 'errors.validation';
        } else if (error.response.data?.message?.includes('No subjects found')) {
            errorKey = 'errors.noSubjects';
        }
    } else if (error instanceof Error) {
        errorKey = 'errors.unexpected';
    }

    const translatedMessage = i18n.t(errorKey);
    console.error('API Error:', error);
    throw new Error(translatedMessage);
};

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
    creationDate: string;
    modifiedDate?: string;
}

export const addSubjectByCourse = async (payload: {
    courseId: string;
    subjectDTO: SubjectDTO;
}): Promise<{ id: string }> => {
    try {
        const response = await api.post('/OnBoardingTeacher/AddSubjectByCourse/', {
            courseId: payload.courseId,
            subjectDTO: payload.subjectDTO,
        });

        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const setSubjectSchedules = async (scheduleDTO: {
    courseId: string;
    subjectDTO: SubjectDTO;
}): Promise<void> => {
    try {
        const { subjectDTO } = scheduleDTO;

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
                listScheduleds,
            },
        };

        const response = await api.put('/OnBoardingTeacher/SetSubjectByCourse/', payload);

        console.log('Schedules successfully added:', response.data);
    } catch (error: unknown) {
        handleError(error);
        throw error;
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

        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

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
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};
