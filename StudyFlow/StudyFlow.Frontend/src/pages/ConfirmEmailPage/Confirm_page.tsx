import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Para obtener los parámetros de la URL
import './confirm_page.css'; // Estilos específicos para confirm_page
import { Navbar } from '../../components'; // Asegúrate de importar el Navbar
import { Footer } from '../../containers'; // Si tienes un footer que quieras reutilizar
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../ThemeContext'; // Manejo de temas
import { confirmEmail } from '../../services/api'; // Función para confirmar el email

const ConfirmPage: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const location = useLocation(); // Para obtener los parámetros de la URL
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Obtener parámetros de la URL
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const token = queryParams.get('token');

    // Confirmar el email cuando los parámetros sean válidos
    useEffect(() => {
        if (userId && token) {
            confirmEmail(userId, token)
                .then(() => {
                    setMessage(t('confirm_page_success_message'));
                })
                .catch(() => {
                    setMessage(t('confirm_page_error_message'));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
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
