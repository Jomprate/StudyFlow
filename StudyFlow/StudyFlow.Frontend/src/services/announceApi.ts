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

const mapAnnouncement = (announcement: any) => ({
    id: announcement.id,
    title: announcement.title,
    description: announcement.htmlContent,
    userName: announcement.userName,
    userId: announcement.userId,
    creationDate: announcement.creationDate,
    youTubeVideos: announcement.youTubeVideos,
    googleDriveLinks: announcement.googleDriveLinks,
    alternateLinks: announcement.alternateLinks,
});

const validateApiResponse = (data: any) => {
    if (!data || typeof data !== 'object' || !data.success || !data.data) {
        throw new Error('Response format is invalid.');
    }
};

const mapAndSortAnnouncements = (list: any[]): any[] => {
    if (!Array.isArray(list)) {
        throw new Error('listResult is not an array in the response.');
    }

    return list
        .map(mapAnnouncement)
        .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
};

const calculateTotalPages = (totalRecords: number, recordsPerPage: number): number => {
    return Math.ceil(totalRecords / recordsPerPage);
};

const extractPagination = (
    pagination: any,
    defaults: { page: number; recordsNumber: number; filter: string | null }
): { page: number; recordsNumber: number; filter: string | null } => {
    return {
        page: pagination?.page || defaults.page,
        recordsNumber: pagination?.recordsNumber || defaults.recordsNumber,
        filter: pagination?.filter || defaults.filter,
    };
};

export const createAnnounce = async (announceDTO: {
    title: string;
    htmlContent: string;
    userId: string;
    courseId: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
}): Promise<{ [x: string]: any; id: string }> => {
    try {
        if (!announceDTO.userId) {
            throw new Error(i18n.t('error.userIdRequired'));
        }
        if (!announceDTO.courseId) {
            throw new Error(i18n.t('error.courseIdRequired'));
        }
        if (!announceDTO.title.trim()) {
            throw new Error(i18n.t('error.titleCannotBeEmpty'));
        }
        if (!announceDTO.htmlContent.trim()) {
            throw new Error(i18n.t('error.htmlContentCannotBeEmpty'));
        }

        announceDTO.youTubeVideos = announceDTO.youTubeVideos || [];
        announceDTO.googleDriveLinks = announceDTO.googleDriveLinks || [];
        announceDTO.alternateLinks = announceDTO.alternateLinks || [];

        const announceResponse = await api.post('/Announce/CreateAnnounce', {
            title: announceDTO.title,
            htmlContent: announceDTO.htmlContent,
            youTubeVideos: announceDTO.youTubeVideos,
            googleDriveLinks: announceDTO.googleDriveLinks,
            alternateLinks: announceDTO.alternateLinks,
            userId: announceDTO.userId,
            courseId: announceDTO.courseId,
        });

        return announceResponse.data;
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

export const getCourseAnnouncesPaginated = async (
    courseId: string,
    page: number,
    recordsNumber: number,
    filter: string | null
): Promise<{
    data: any[];
    pagination: {
        page: number;
        recordsNumber: number;
        filter: string | null;
    };
    totalPages: number;
    totalRecords: number;
}> => {
    try {
        const response = await api.get(`/Announce/GetAnnouncesPagedByCourse/${courseId}`, {
            params: { page, recordsNumber, filter },
        });

        validateApiResponse(response.data);

        const announcementsArray = mapAndSortAnnouncements(response.data.data.listResult);

        const pagination = extractPagination(response.data.data.pagination, { page, recordsNumber, filter });

        return {
            data: announcementsArray,
            pagination,
            totalPages: response.data.data.totalPages || calculateTotalPages(response.data.data.totalRecords, recordsNumber),
            totalRecords: response.data.data.totalRecords || announcementsArray.length,
        };
    } catch (error) {
        console.error('Error fetching paginated course announcements:', error);
        handleApiError(error);
        throw new Error(`Failed to fetch paginated announcements for courseId: ${courseId}`);
    }
};

export const deleteAnnounce = async (announceId: string): Promise<void> => {
    try {
        const response = await api.delete(`/Announce/DeleteAnnounce/${announceId}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error("Error deleting announcement:", errorMessage);
        throw new Error(errorMessage);
    }
};