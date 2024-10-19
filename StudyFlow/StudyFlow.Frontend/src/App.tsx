import React, { useState, useEffect } from 'react';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import { AuthProvider } from './contexts/AuthContext'; // Asegúrate de importar AuthProvider
import LoadingScreen from '@components/loadingScreen/LoadingScreen';
import { checkBackendStatus } from '../src/services/api'; // Import existing checkBackendStatus

function App() {
    const [i18nReady, setI18nReady] = useState(false);
    const [backendReady, setBackendReady] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const { theme } = useTheme();

    // Initialize i18next
    const initializeI18n = async () => {
        try {
            console.log("Initializing i18n...");
            await initializeI18next();
            console.log("i18n is ready");
            setI18nReady(true);
        } catch (error) {
            console.error("Error during i18n initialization:", error);
        }
    };

    // UseEffect to initialize i18n and check backend status on component mount
    useEffect(() => {
        initializeI18n();
        checkBackendStatus(setBackendReady); // Use the imported checkBackendStatus
    }, []);

    // UseEffect to reload the page automatically when the backend is ready
    useEffect(() => {
        const alreadyReloaded = sessionStorage.getItem('reloaded');
        if (backendReady && !alreadyReloaded) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, [backendReady]);

    // Function to hide the loading screen
    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
    };

    // Loading conditions
    if (!i18nReady || !backendReady || showLoadingScreen) {
        return showLoadingScreen ? (
            <LoadingScreen onFinish={handleFinishLoadingScreen} />
        ) : (
            <div>Loading...</div>
        );
    }

    return (
        <div className={`app ${theme}`}>
            <Router />
        </div>
    );
}

// WrappedApp envuelve todo en AuthProvider y ThemeProvider
const WrappedApp: React.FC = () => (
    <AuthProvider> {/* Asegúrate de envolver la aplicación con AuthProvider */}
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </AuthProvider>
);

export default WrappedApp;