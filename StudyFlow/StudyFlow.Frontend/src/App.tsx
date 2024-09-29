import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';

function App() {
    const [i18nReady, setI18nReady] = useState(false);
    const [backendReady, setBackendReady] = useState(false); // Controla si el backend está listo
    const [showLoadingScreen, setShowLoadingScreen] = useState(true); // Estado de la pantalla de carga
    const { theme } = useTheme();

    // Verifica el estado del backend
    const checkBackendStatus = async () => {
        try {
            console.log("Verificando estado del backend...");
            const response = await axios.get('https://localhost:7033/api/Status'); // Cambia a la URL de tu backend
            console.log("Respuesta del backend:", response.data);

            if (response.data.status === 'ready') {
                console.log("Backend listo, estableciendo backendReady a true");
                setBackendReady(true);
            } else {
                console.warn("El backend no está listo. Reintentando en 5 segundos...");
                setTimeout(checkBackendStatus, 2000); // Reintentar después de 5 segundos si no está listo
            }
        } catch (error) {
            console.error("Error verificando el estado del backend:", error);
            setTimeout(checkBackendStatus, 2000); // Reintentar después de 5 segundos en caso de error
        }
    };

    // Inicializa i18next
    const initializeI18n = async () => {
        try {
            console.log("Iniciando i18n...");
            await initializeI18next();
            console.log("i18n listo");
            setI18nReady(true); // Establecer i18next como listo
        } catch (error) {
            console.error("Error durante la inicialización de i18n:", error);
        }
    };

    useEffect(() => {
        // Ejecuta ambas inicializaciones en paralelo
        initializeI18n();
        checkBackendStatus();
    }, []);

    // Recargar la página automáticamente cuando el backend esté listo
    useEffect(() => {
        const alreadyReloaded = sessionStorage.getItem('reloaded'); // Verificar si ya se recargó
        if (backendReady && !alreadyReloaded) {
            sessionStorage.setItem('reloaded', 'true'); // Marcar como recargado
            window.location.reload(); // Recargar la página automáticamente
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