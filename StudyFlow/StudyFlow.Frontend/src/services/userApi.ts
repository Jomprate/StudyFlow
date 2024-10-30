import api, { setAuthToken } from './apiConfig';
import i18n from '../i18n';

interface userdata {
    data: any;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    countryid: string;
    usertype: string;
    image?: string;
}

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
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            errorMessage = error.message;
        }

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const updateUser = async (userDTO: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    countryId?: number;
    profilePicture?: string;
    profileId?: number;
}): Promise<void> => {
    try {
        console.log("the updated dto is :" + userDTO);
        setAuthToken(localStorage.getItem('token'));
        console.log("the send token is " + localStorage.getItem('token'));
        const response = await api.put('/user/updateuser/', userDTO);
        return response.data;
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            errorMessage = error.message;
        }

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
        setAuthToken(localStorage.getItem('token') || null);
        const response = await api.get(`/user/getuserbyid?id=${userid}`);
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