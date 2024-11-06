import api from './apiConfig';
import i18n from '../i18n';

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

export const getAnnouncesByCourseId = async (courseId: string): Promise<any[]> => {
    //courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e';

    try {
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}`);

        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.listResult)) {
                const announcementsArray = response.data.data.listResult.map((announcement: any) => ({
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

                return announcementsArray;
            } else {
                throw new Error('Unexpected response format');
            }
        } else {
            throw new Error(`Response is not JSON, received content-type: ${contentType}`);
        }
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