import api from './apiConfig';

export const loadTranslations = async (lng: string): Promise<Record<string, string>> => {
    try {
        const response = await api.get(`/Localization/${lng}`);
        const contentType = response.headers['content-type'];

        if (contentType?.includes('application/json')) {
            return response.data;
        } else {
            throw new Error(`The response is not a JSON object, it is of type: ${contentType}`);
        }
    } catch (error: any) {
        if (error.response) {
            console.error('Error loading translations:', error.response.data);
        } else if (error instanceof Error) {
            console.error('Error loading translations:', error.message);
        } else {
            console.error('Unknown error occurred while loading translations.');
        }
        return {};
    }
};