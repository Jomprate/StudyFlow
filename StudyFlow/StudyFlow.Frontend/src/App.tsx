import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';

function App() {
    const [i18nReady, setI18nReady] = useState(false);
    const [backendReady, setBackendReady] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const { theme } = useTheme();

    const checkBackendStatus = async () => {
        try {
            console.log("Verificando estado del backend...");
            const response = await axios.get('https://localhost:7033/api/Status');
            console.log("Respuesta del backend:", response.data);

            if (response.data.status === 'ready') {
                console.log("Backend listo, estableciendo backendReady a true");
                setBackendReady(true);
            } else {
                console.warn("El backend no está listo. Reintentando en 5 segundos...");
                setTimeout(checkBackendStatus, 2000);
            }
        } catch (error) {
            console.error("Error verificando el estado del backend:", error);
            setTimeout(checkBackendStatus, 2000);
        }
    };

    // Inicializa i18next
    const initializeI18n = async () => {
        try {
            console.log("Iniciando i18n...");
            await initializeI18next();
            console.log("i18n listo");
            setI18nReady(true);
        } catch (error) {
            console.error("Error durante la inicialización de i18n:", error);
        }
    };

    useEffect(() => {
        initializeI18n();
        checkBackendStatus();
    }, []);

    // Recargar la página automáticamente cuando el backend esté listo
    useEffect(() => {
        const alreadyReloaded = sessionStorage.getItem('reloaded');
        if (backendReady && !alreadyReloaded) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, [backendReady]);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
    };

    // Condiciones de carga
    if (!i18nReady || !backendReady || showLoadingScreen) {
        return showLoadingScreen ? (
            <LoadingScreen onFinish={handleFinishLoadingScreen} />
        ) : (
            <div>Cargando...</div>
        );
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