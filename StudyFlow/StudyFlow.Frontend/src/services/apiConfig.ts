import axios from 'axios';

const api = axios.create({
    /*baseURL: 'https://localhost:7033/api',*/
    baseURL: 'https://studyflowbackend.azurewebsites.net/api',
    headers: {
        'content-type': 'application/json',
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configurar el encabezado Authorization
        console.log("Authorization header set:", api.defaults.headers.common['Authorization']);
    } else {
        delete api.defaults.headers.common['Authorization']; // Eliminar el encabezado si no hay token
        console.log("Authorization header removed");
    }
};

export default api;