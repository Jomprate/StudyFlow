import React, { useState, useEffect } from 'react';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';

function App() {
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const initialize = async () => {
            try {
                await initializeI18next();
            } catch (error) {
                console.error("Error durante la inicialización de i18n:", error);
            }
        };

        initialize();
    }, []);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
    };

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