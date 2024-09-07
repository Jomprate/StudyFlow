import React, { useState, useEffect } from 'react';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';

function App() {
    const [loading, setLoading] = useState(true); // Controla la inicialización de la aplicación
    const [showLoadingScreen, setShowLoadingScreen] = useState(true); // Pantalla de carga desactivada por defecto
    const { theme } = useTheme();

    useEffect(() => {
        const initialize = async () => {
            try {
                console.log("Iniciando i18n...");
                await initializeI18next();
            } catch (error) {
                console.error("Error durante la inicialización de i18n:", error);
            } finally {
                setLoading(false); // Marca la aplicación como inicializada
            }
        };

        initialize();
    }, []);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false); // Cierra la pantalla de carga tras presionar el botón
    };

    // Solo muestra la pantalla de carga si showLoadingScreen es true
    if (loading || showLoadingScreen) {
        return showLoadingScreen ? (
            <LoadingScreen onFinish={handleFinishLoadingScreen} />
        ) : null;
    }

    // Renderiza la aplicación principal cuando loading y showLoadingScreen son false
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