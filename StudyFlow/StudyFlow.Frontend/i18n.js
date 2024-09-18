import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        backend: {
            // Aquí defines la URL desde donde cargar las traducciones
            loadPath: 'https://localhost:7033/api/Localization/{{lng}}', // Cambia esta ruta según tu API
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;