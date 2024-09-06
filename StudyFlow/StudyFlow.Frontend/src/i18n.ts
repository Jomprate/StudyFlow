import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios, { AxiosResponse } from 'axios';

const loadTranslations = async (lng: string): Promise<Record<string, string>> => {
    try {
        const response: AxiosResponse<Record<string, string>> = await axios.get(`https://localhost:7033/api/Localization/${lng}`);
        const contentType = response.headers['content-type'];

        if (contentType?.includes('application/json')) {
            return response.data;
        } else {
            throw new Error(`La respuesta no es un objeto JSON, es de tipo: ${contentType}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error cargando las traducciones:', error.response.data);
        } else if (error instanceof Error) {
            console.error('Error cargando las traducciones:', error.message);
        } else {
            console.error('Error desconocido al cargar las traducciones.');
        }
        return {};
    }
};

const initializeI18next = async (): Promise<void> => {
    try {
        console.log("Inicializando traducciones...");

        const savedLanguage = localStorage.getItem('language') || 'en'; // Usa el idioma guardado o 'en' por defecto
        const enTranslations = await loadTranslations('en');
        const esTranslations = await loadTranslations('es');

        console.log("Traducciones cargadas:", {
            en: enTranslations,
            es: esTranslations,
        });

        await i18n.use(initReactI18next).init({
            lng: savedLanguage, // Aplica el idioma guardado
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            resources: {
                en: {
                    translation: enTranslations,
                },
                es: {
                    translation: esTranslations,
                },
            },
        });

        console.log("i18n ha sido inicializado con los recursos:", i18n.options.resources);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error durante la inicialización de i18n:", error.message);
        } else {
            console.error("Error desconocido durante la inicialización de i18n.");
        }
        throw error;
    }
};

export { initializeI18next, i18n as default };