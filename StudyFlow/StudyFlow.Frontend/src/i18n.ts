import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadTranslations } from './services/api';

// Inicializar i18next con las traducciones cargadas
const initializeI18next = async (): Promise<void> => {
    try {
        console.log("Initializing translations...");

        const savedLanguage = localStorage.getItem('language') || 'en';
        const enTranslations = await loadTranslations.loadTranslations('en');
        const esTranslations = await loadTranslations.loadTranslations('es');

        console.log("Translations loaded:", {
            en: enTranslations,
            es: esTranslations,
        });

        await i18n.use(initReactI18next).init({
            lng: savedLanguage,
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