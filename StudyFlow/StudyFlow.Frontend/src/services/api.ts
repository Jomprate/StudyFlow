import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
    baseURL: 'https://localhost:7033/api',
    headers: {
        'content-type': 'application/json',
    },
});

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

export const createUser = async (userdata: userdata): Promise<void> => {
    try {
        const response = await api.post('/user/createuser', userdata);
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