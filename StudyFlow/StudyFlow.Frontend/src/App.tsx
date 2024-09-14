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
                console.log("Iniciando i18n...");
                await initializeI18next();
            } catch (error) {
                console.error("Error durante la inicialización de i18n:", error);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
    };

    if (loading || showLoadingScreen) {
        return showLoadingScreen ? (
            <LoadingScreen onFinish={handleFinishLoadingScreen} />
        ) : null;
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