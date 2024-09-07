import axios from 'axios';

// Define la URL base para las llamadas a tu backend
const api = axios.create({
    baseURL: 'https://tu-backend-url/api', // Cambia esto por la URL de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Definición del tipo para los datos del usuario
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    country: string;
    userType: string;
    image?: string; // El campo image puede ser opcional
}

// Función para crear un usuario
export const createUser = async (userData: UserData): Promise<void> => {
    try {
        const response = await api.post('/User/CreateUser', userData);
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('An error occurred');
    }
};

// Función para obtener todos los usuarios
export const getAllUsers = async (): Promise<UserData[]> => {
    try {
        const response = await api.get('/User/GetAllUsers');
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('An error occurred');
    }
};

// Otras funciones como deleteUser, getUserById, etc., pueden ir aquí