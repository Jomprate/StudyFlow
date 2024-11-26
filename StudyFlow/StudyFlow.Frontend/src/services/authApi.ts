import api, { setAuthToken } from './apiConfig';

export const loginUser = async (loginDTO: { email: string; password: string }): Promise<string> => {
    try {
        const response = await api.post('/Auth/Login', loginDTO, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const token = response.data;

        if (!token || typeof token !== 'string') {
            throw new Error('Invalid login response: token is missing or not a string');
        }

        localStorage.setItem('token', token);

        setAuthToken(token);
        console.log(api.defaults.headers.common['Authorization']);

        return token;
    } catch (error: any) {
        throw new Error(error.response?.data || error.message || 'An unexpected error occurred during login');
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found, unable to log out.');
        }

        const response = await api.post('/Auth/LogOut', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            localStorage.removeItem('token');
            setAuthToken(null);
            console.log('Logout successful.');
        } else {
            throw new Error('Logout failed.');
        }
    } catch (error: any) {
        console.error('Error during logout:', error.message || error);
        throw new Error(error.response?.data || 'An unexpected error occurred during logout.');
    }
};

export const ResendEmailConfirm = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/User/ResendConfirmEmailByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }

        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

export const RecoveryPassword = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/Auth/RecoverPasswordByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }

        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

export const ResetPassword = async (ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string; }): Promise<string> => {
    try {
        const response = await api.post('/Auth/ResetPasswordAsync', ResetPasswordRequestDTO);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }

        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

export const confirmEmail = async (userId: string, token: string): Promise<void> => {
    try {
        const response = await api.post('/user/ConfirmEmail', {
            userId,
            token,
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

export const updatePassword = async (updatePasswordDTO: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}): Promise<string> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User is not authenticated.');
        }

        const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken?.unique_name;

        if (!userId) {
            throw new Error('UserId is missing in the token.');
        }

        const payload = {
            ...updatePasswordDTO,
            UserId: userId,
        };

        const response = await api.put('/User/UpdatePassword', payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.message || 'Password updated successfully.';
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data ||
            'An unexpected error occurred.';
        throw new Error(errorMessage);
    }
};