import React, { useState, useEffect } from 'react';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';

function App() {
    const [loading, setLoading] = useState(true);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
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
                console.error("Error durante la inicializaci�n de i18n:", error);
                setLoading(false);
            }
        };

        initialize();
    }, []);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (showLoadingScreen) {
        return <LoadingScreen onFinish={handleFinishLoadingScreen} />;
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