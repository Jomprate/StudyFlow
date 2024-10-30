import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './confirm_page.css';
import { Navbar } from '../../components';
import { Footer } from '../../containers';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../ThemeContext';
import { authApi } from '../../services/api';

const ConfirmPage: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const hasConfirmedRef = useRef(false); // Control de ejecución única

    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const token = queryParams.get('token');

    useEffect(() => {
        if (userId && token && !hasConfirmedRef.current) {
            hasConfirmedRef.current = true;
            authApi.confirmEmail(userId, token)
                .then(() => {
                    setMessage(t('confirm_page_success_message'));
                })
                .catch(() => {
                    setMessage(t('confirm_page_error_message'));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (!userId || !token) {
            setMessage(t('confirm_page_invalid_params'));
            setIsLoading(false);
        }
    }, [userId, token, t]);

    return (
        <div className={`confirmpage ${theme}`}>
            <Navbar />
            <div className="confirmpage-content">
                {isLoading ? (
                    <p>{t('confirm_page_loading')}</p>
                ) : (
                    <p>{message}</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ConfirmPage;