import api from './apiConfig';
import i18n from '../i18n';

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