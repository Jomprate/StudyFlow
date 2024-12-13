import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios, { AxiosResponse } from 'axios';

// Cargar las traducciones desde el backend
const loadTranslations = async (lng: string): Promise<Record<string, string>> => {
    try {
        const response: AxiosResponse<Record<string, string>> = await axios.get(`https://localhost:7033/api/Localization/${lng}`);
        const contentType = response.headers['content-type'];

        if (contentType?.includes('application/json')) {
            return response.data;
        } else {
            throw new Error(`The response is not a JSON object, it is of type: ${contentType}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error loading translations:', error.response.data);
        } else if (error instanceof Error) {
            console.error('Error loading translations:', error.message);
        } else {
            console.error('Unknown error occurred while loading translations.');
        }
        return {};
    }
};

// Inicializar i18next con las traducciones cargadas
const initializeI18next = async (): Promise<void> => {
    try {
        console.log("Initializing translations...");

        const savedLanguage = localStorage.getItem('language') || 'en';
        const enTranslations = await loadTranslations('en');
        const esTranslations = await loadTranslations('es');

        console.log("Translations loaded:", {
            en: enTranslations,
            es: esTranslations,
        });

        await i18n.use(initReactI18next).init({
            lng: savedLanguage,
            fallbackLng: 'en',
            interpolation: {
                // Se desactiva el escape automático para permitir el uso de etiquetas HTML
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

        console.log("i18n has been initialized with resources:", i18n.options.resources);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error during i18n initialization:", error.message);
        } else {
            console.error("Unknown error occurred during i18n initialization.");
        }
        throw error;
    }
};

export { initializeI18next, i18n as default };