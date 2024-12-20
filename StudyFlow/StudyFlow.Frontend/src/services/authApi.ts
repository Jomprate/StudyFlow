import api, { setAuthToken } from './apiConfig';

const API_ROUTES = {
    LOGIN: '/Auth/Login',
    LOGOUT: '/Auth/LogOut',
    RESEND_CONFIRM_EMAIL: '/User/ResendConfirmEmailByEmail',
    RECOVER_PASSWORD: '/Auth/RecoverPasswordByEmail',
    RESET_PASSWORD: '/Auth/ResetPasswordAsync',
    UPDATE_PASSWORD: '/User/UpdatePassword',
    CONFIRM_EMAIL: '/User/ConfirmEmail',
};

const handleApiError = (error: any): string => {
    return error.response?.data || error.message || 'An unexpected error occurred';
};

const makePostRequest = async (url: string, data: any, headers: object = {}): Promise<any> => {
    try {
        const response = await api.post(url, data, { headers });
        return response.data;
    } catch (error: any) {
        throw new Error(handleApiError(error));
    }
};

export const loginUser = async (loginDTO: { email: string; password: string }): Promise<string> => {
    const token = await makePostRequest(API_ROUTES.LOGIN, loginDTO, {
        'Content-Type': 'application/json',
    });

    if (!token || typeof token !== 'string') {
        throw new Error('Invalid login response: token is missing or not a string');
    }

    localStorage.setItem('token', token);
    setAuthToken(token);

    return token;
};

export const logoutUser = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found, unable to log out.');

    await makePostRequest(API_ROUTES.LOGOUT, {}, {
        Authorization: `Bearer ${token}`,
    });

    localStorage.removeItem('token');
    setAuthToken(null);
};

const handleLinkBasedAction = async (url: string, email: string): Promise<string> => {
    const response = await makePostRequest(url, { Email: email });
    return JSON.stringify(response.data);
};

export const ResendEmailConfirm = async (email: string): Promise<string> => {
    return handleLinkBasedAction(API_ROUTES.RESEND_CONFIRM_EMAIL, email);
};

export const RecoveryPassword = async (email: string): Promise<string> => {
    return handleLinkBasedAction(API_ROUTES.RECOVER_PASSWORD, email);
};

export const ResetPassword = async (ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string }): Promise<string> => {
    const response = await makePostRequest(API_ROUTES.RESET_PASSWORD, ResetPasswordRequestDTO);
    return JSON.stringify(response.data);
};

export const confirmEmail = async (userId: string, token: string): Promise<void> => {
    await makePostRequest(API_ROUTES.CONFIRM_EMAIL, { userId, token });
};

export const updatePassword = async (updatePasswordDTO: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}): Promise<string> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User is not authenticated.');

    const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken?.unique_name;
    if (!userId) throw new Error('UserId is missing in the token.');

    const payload = {
        ...updatePasswordDTO,
        UserId: userId,
    };

    const response = await makePostRequest(API_ROUTES.UPDATE_PASSWORD, payload, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    return response.message || 'Password updated successfully.';
};