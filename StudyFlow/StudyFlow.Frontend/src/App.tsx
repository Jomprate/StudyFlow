import React, { useState, useEffect } from 'react';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';
import { checkBackendStatus } from '../src/services/api';

function App() {
    const [i18nReady, setI18nReady] = useState(false);
    const [backendReady, setBackendReady] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
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

    useEffect(() => {
        initializeI18n();
        checkBackendStatus(setBackendReady);
    }, []);

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

const WrappedApp: React.FC = () => (
    <AuthProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </AuthProvider>
);

export default WrappedApp;