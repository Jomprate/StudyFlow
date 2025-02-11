﻿import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../src/router/index';
import './App.css';
import { initializeI18next } from './i18n';
import { ThemeProvider, useTheme } from './ThemeContext';
import { AuthProvider } from '../src/contexts/AuthContext';
import { UtcProvider } from '../src/contexts/UtcContext';
import { CoursesProvider } from '../src/contexts/CoursesContext';
import { UserProvider } from '../src/contexts/UserContext';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';
import { checkBackendStatus } from '../src/services/api';
import ScrollToTop from '../src/components/scrollToTop/ScrollToTop';
import ScrollToTopButton from '../src/components/scrollToTop_Button/ScrollToTopButton';

function App() {
    const [i18nReady, setI18nReady] = useState(false);
    const [backendReady, setBackendReady] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const { theme } = useTheme();
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());
    const [isMobile, setIsMobile] = useState(false);

    const INACTIVITY_TIMEOUT = isMobile ? 2 * 60 * 1000 : 5 * 60 * 1000; // 2 minutos en móvil, 5 minutos en escritorio

    useEffect(() => {
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent;
            const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
            setIsMobile(mobileRegex.test(userAgent));
        };

        checkIfMobile();
    }, []);

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

    // Handle user inactivity
    useEffect(() => {
        const handleActivity = () => {
            setLastActivityTime(Date.now());
        };

        const checkInactivity = () => {
            if (Date.now() - lastActivityTime > INACTIVITY_TIMEOUT) {
                setShowLoadingScreen(true);
            }
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('keypress', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        const intervalId = setInterval(checkInactivity, 1000);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            clearInterval(intervalId);
        };
    }, [lastActivityTime, INACTIVITY_TIMEOUT]);

    const handleFinishLoadingScreen = () => {
        setShowLoadingScreen(false);
        setLastActivityTime(Date.now());
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
    <UserProvider>
        <AuthProvider>
            <ThemeProvider>
                <UtcProvider>
                    <CoursesProvider>
                        <BrowserRouter
                            future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true,
                            }}
                        >
                            <ScrollToTop />
                            <App />
                            <ScrollToTopButton />
                        </BrowserRouter>
                    </CoursesProvider>
                </UtcProvider>
            </ThemeProvider>
        </AuthProvider>
    </UserProvider>
);

export default WrappedApp;