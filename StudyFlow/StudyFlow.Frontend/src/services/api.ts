import axios from 'axios';

// configuraci�n de la url base para las solicitudes axios
const api = axios.create({
    baseURL: 'https://localhost:7033/api', // Aseg�rate de que sea 'baseURL' con may�sculas
    headers: {
        'content-type': 'application/json',
    },
});

// definici�n del tipo para los datos del usuario
interface userdata {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    countryid: string; // usamos el id del pa�s
    usertype: string;
    image?: string; // el campo image es opcional
}

// definici�n del tipo para los datos del pa�s
interface country {
    id: number;
    name: string;
}

// funci�n para establecer el token de autenticaci�n
export const setauthtoken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['authorization'] = `bearer ${token}`;
    } else {
        delete api.defaults.headers.common['authorization'];
    }
};

// funci�n para crear un usuario
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
            console.error('no se recibi� respuesta del servidor:', error.request);
            throw new error('no se recibi� respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

// funci�n para obtener todos los usuarios
export const getallusers = async (): Promise<userdata[]> => {
    try {
        const response = await api.get('/user/getallusers');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibi� respuesta del servidor:', error.request);
            throw new error('no se recibi� respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

// funci�n para eliminar un usuario
export const deleteuser = async (userid: string): Promise<void> => {
    try {
        const response = await api.delete(`/user/deleteuser/${userid}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibi� respuesta del servidor:', error.request);
            throw new error('no se recibi� respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

// funci�n para obtener un usuario por id
export const getuserbyid = async (userid: string): Promise<userdata> => {
    try {
        const response = await api.get(`/user/getuserbyid/${userid}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('error en la respuesta de la api:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error('no se recibi� respuesta del servidor:', error.request);
            throw new error('no se recibi� respuesta del servidor');
        } else {
            console.error('error al configurar la solicitud:', error.message);
            throw new error('error al configurar la solicitud');
        }
    }
};

export const getCountries = async (): Promise<{ id: number; name: string; isoCode: string }[]> => {
    try {
        const response = await api.get('/Country/GetAllCountries/'); // Usar la ruta relativa

        // Verifica si response.data es un array
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('El formato de los datos recibidos no es un array.');
        }
    } catch (error) {
        console.error('Error al obtener los pa�ses:', error);
        throw error;
    }
};