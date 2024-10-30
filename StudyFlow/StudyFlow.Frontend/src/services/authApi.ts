import api, { setAuthToken } from './apiConfig';

// Función para hacer login
export const loginUser = async (loginDTO: { email: string; password: string }): Promise<string> => {
    try {
        // Realizamos la petición al endpoint de login
        const response = await api.post('/Auth/Login', loginDTO, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Verificamos si la respuesta tiene el token
        const token = response.data;  // Aquí asumimos que el token es el único dato devuelto en response.data

        if (!token || typeof token !== 'string') {
            throw new Error('Invalid login response: token is missing or not a string');
        }

        // Guardar el token en localStorage
        localStorage.setItem('token', token);

        // Configurar el token en los encabezados de axios
        setAuthToken(token);
        console.log(api.defaults.headers.common['Authorization']);

        // Retornamos el token
        return token;
    } catch (error: any) {
        throw new Error(error.response?.data || error.message || 'An unexpected error occurred during login');
    }
};

// Función para hacer logout
export const logoutUser = async (): Promise<void> => {
    try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found, unable to log out.');
        }

        // Hacer la solicitud de logout al API
        const response = await api.post('/Auth/LogOut', {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
            },
        });

        // Si la respuesta es exitosa, limpiar el token
        if (response.status === 200) {
            localStorage.removeItem('token'); // Limpiar el token de localStorage
            setAuthToken(null); // Remover el token de los encabezados de axios
            console.log('Logout successful.');
        } else {
            throw new Error('Logout failed.');
        }
    } catch (error: any) {
        console.error('Error during logout:', error.message || error);
        throw new Error(error.response?.data || 'An unexpected error occurred during logout.');
    }
};

// Función para reenviar la confirmación de email
export const ResendEmailConfirm = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/User/ResendConfirmEmailByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

// Función para recuperar contraseña
export const RecoveryPassword = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/Auth/RecoverPasswordByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

// Función para restablecer contraseña
export const ResetPassword = async (ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string; }): Promise<string> => {
    try {
        const response = await api.post('/Auth/ResetPasswordAsync', ResetPasswordRequestDTO);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

// Función para confirmar el correo
export const confirmEmail = async (userId: string, token: string): Promise<void> => {
    try {
        const response = await api.post('/user/ConfirmEmail', {
            userId,  // Enviado en el cuerpo
            token,   // Enviado en el cuerpo
        });
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