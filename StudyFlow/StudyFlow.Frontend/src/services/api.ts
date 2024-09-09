import axios from 'axios';

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
        // mejor manejo de errores
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibió respuesta del servidor:', error.request);
            throw new error('no se recibió respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

export const getallusers = async (): Promise<userdata[]> => {
    try {
        const response = await api.get('/user/getallusers');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibió respuesta del servidor:', error.request);
            throw new error('no se recibió respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

export const deleteuser = async (userid: string): Promise<void> => {
    try {
        const response = await api.delete(`/user/deleteuser/${userid}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibió respuesta del servidor:', error.request);
            throw new error('no se recibió respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

export const getuserbyid = async (userid: string): Promise<userdata> => {
    try {
        const response = await api.get(`/user/getuserbyid/${userid}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibió respuesta del servidor:', error.request);
            throw new error('no se recibió respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

export const getCountries = async (): Promise<{ id: number; name: string; isoCode: string }[]> => {
    try {
        const response = await api.get('/Country/GetAllCountries/');

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('El formato de los datos recibidos no es un array.');
        }
    } catch (error) {
        console.error('Error al obtener los países:', error);
        throw error;
    }
};