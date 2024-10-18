import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
    baseURL: 'https://localhost:7033/api',
    headers: {
        'content-type': 'application/json',
    },
});

export const checkBackendStatus = async (callback: (isReady: boolean) => void) => {
    try {
        console.log("Checking backend status...");
        const response = await api.get('/Status');
        console.log("Backend response:", response.data);

        if (response.data.status === 'ready') {
            console.log("Backend is ready, setting backendReady to true");
            callback(true); // Backend is ready
        } else {
            console.warn("Backend is not ready. Retrying in 2 seconds...");
            setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds
        }
    } catch (error) {
        console.error("Error while checking backend status:", error);
        setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds on error
    }
};

interface userdata {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    countryid: string;
    usertype: string;
    image?: string;
}

export const setauthtoken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['authorization'] = `bearer ${token}`;
    } else {
        delete api.defaults.headers.common['authorization'];
    }
};

export const createUser = async (userDTO: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    countryId: number;
    profilePicture?: string;
    profileId: number;
}): Promise<void> => {
    try {
        const response = await api.post('/user/createuser', userDTO);
        return response.data;
    } catch (error: any) {
        // Captura y formatea adecuadamente el error
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            // Si `error.response.data` es un objeto, lo convertimos en string
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            // Si hay un `error.message`, usamos eso
            errorMessage = error.message;
        }

        console.error(errorMessage); // Para depuración
        throw new Error(errorMessage); // Lanzamos el error para que sea capturado por `onSubmit`
    }
};


export const getallusers = async (): Promise<userdata[]> => {
    try {
        const response = await api.get('/user/getallusers');
        return response.data;
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

export const deleteuser = async (userid: string): Promise<void> => {
    try {
        const response = await api.delete(`/user/deleteuser/${userid}`);
        return response.data;
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

export const getuserbyid = async (userid: string): Promise<userdata> => {
    try {
        const response = await api.get(`/user/getuserbyid/${userid}`);
        return response.data;
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

// Countries

export const getCountries = async (): Promise<{ id: number; name: string; isoCode: string }[]> => {
    try {
        const response = await api.get('/Country/GetAllCountries/');

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error(i18n.t('error.invalidDataFormat'));
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

export const getCountriesWithLanguage = async (): Promise<{ isoCode: string; name: string }[]> => {
    try {
        const currentLanguage = i18n.language || 'en';

        const response = await api.get(`/Country/GetAllCountriesWithLanguage/${currentLanguage}/`);

        const countriesArray = Object.keys(response.data).map(isoCode => ({
            isoCode,
            name: response.data[isoCode],
        }));

        return countriesArray;
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

// Announces

export const createAnnounce = async (announceDTO: {
    title: string;
    htmlContent: string;
    userId?: string;
    courseId?: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
}): Promise<{ id: string }> => {
    try {
        // Valores temporales quemados
        const defaultUserId = "6fe44fdc-cac4-4d08-82d6-8a672b6960c0"; // UserId quemado
        const defaultCourseId = "3c8825f3-f903-45c9-8dac-0a87a51ef37e"; // CourseId quemado

        // Si no se proporcionan userId y courseId, usar los valores quemados
        const userId = announceDTO.userId || defaultUserId;
        const courseId = announceDTO.courseId || defaultCourseId;

        if (!announceDTO) {
            throw new Error(i18n.t('error.announceDataRequired'));
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
            userId: userId, // Usar el valor quemado si no se proporcionó
            courseId: courseId, // Usar el valor quemado si no se proporcionó
        });

        return announceResponse.data;
    } catch (error: any) {
        // Manejo de errores
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
    // Course ID quemado temporalmente dentro de la función
    courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e'; // Course ID quemado

    try {
        // Asegúrate de incluir el prefijo `/api` en la URL
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}`);

        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.listResult)) {
                const announcementsArray = response.data.data.listResult.map((announcement: any) => ({
                    id: announcement.id,
                    title: announcement.title,
                    description: announcement.htmlContent, // Mapeamos correctamente el campo
                    userName: announcement.userName,
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

interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
}

export const getAnnouncesByCourseIdPaginated = async (
    courseId: string,
    page: number,
    recordsNumber: number
): Promise<PaginatedResponse<any>> => {
    courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e'; // Course ID quemado

    try {
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}?page=${page}&recordsNumber=${recordsNumber}`);

        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.listResult)) {
                const announcementsArray = response.data.data.listResult.map((announcement: any) => ({
                    id: announcement.id,
                    title: announcement.title,
                    description: announcement.htmlContent,
                    userName: announcement.userName,
                    creationDate: announcement.creationDate,
                    youTubeVideos: announcement.youTubeVideos,
                    googleDriveLinks: announcement.googleDriveLinks,
                    alternateLinks: announcement.alternateLinks,
                }));

                return {
                    data: announcementsArray,
                    totalPages: response.data.data.totalPages,
                };
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