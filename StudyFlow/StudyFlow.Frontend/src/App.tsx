import React, { useState, useEffect } from 'react';
import Router from './router';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '@components/LoadingScreen/LoadingScreen'; // Importa el componente de LoadingScreen

function App() {
    const [loading, setLoading] = useState(true);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false); // Nuevo estado para controlar la pantalla de carga
    const { theme } = useTheme();

    useEffect(() => {
        const initialize = async () => {
            try {
                // eslint-disable-next-line no-console
                console.log("Iniciando i18n...");
                await initializeI18next();
                // eslint-disable-next-line no-console
                console.log("i18n inicializado correctamente.");
                setLoading(false);
            } catch (error) {
                console.error("Error durante la inicialización de i18n:", error);
                setLoading(false);
            }
        };

        initialize();
    }, []);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false); // Oculta la pantalla de carga
    };

    if (loading) {
        return <div>Cargando...</div>; // Este es tu mensaje de carga original mientras se inicializa i18n
    }

    if (showLoadingScreen) {
        return <LoadingScreen onFinish={handleFinishLoadingScreen} />; // Muestra la pantalla de carga interactiva
    }

    return (
        <div className={`app ${theme}`}>
            <Router />
        </div>
    );
}

const WrappedApp: React.FC = () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

export default WrappedApp;