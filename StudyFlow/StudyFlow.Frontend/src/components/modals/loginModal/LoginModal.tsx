import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './loginModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { handleEmailValidation } from '../../../helpers/validationHelpers';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import RecoverPasswordModal from '../recoverPasswordModal/RecoverPasswordModal';
import ResendActivationEmailModal from '../resendActivationEmailModal/ResendActivationEmailModal';
import { authApi } from '../../../services/api'; // Importamos loginUser
import { useAuth } from '../../../contexts/AuthContext'; // Importamos el contexto de Auth
import { jwtDecode } from 'jwt-decode';

// Definir los tipos de datos

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface DecodedToken {
    role: 'Student' | 'Teacher' | 'Admin';
    unique_name: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [openRecoverPasswordModal, setOpenRecoverPasswordModal] = useState(false);
    const [openResendActivationEmailModal, setOpenResendActivationEmailModal] = useState(false);
    const [problemMessage, setProblemMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log("Form Data:", data);

            const loginDTO = {
                email: data.email.trim(),
                password: data.password.trim(),
            };

            const token = await authApi.loginUser(loginDTO); // Obtén el token desde el loginUser

            console.log('Received token:', token); // Verificar que el token es correcto
            localStorage.setItem('token', token);
            const decodedToken: DecodedToken = jwtDecode(token); // Decodifica el token si necesitas extraer la información
            console.log('Decoded JWT:', decodedToken); // Verificar que el token contiene los valores esperados

            const userRole = decodedToken.role;

            login(decodedToken.role, decodedToken.unique_name, token); // Actualizar el estado global con el token

            setOpen(false);

            if (userRole === 'Student') {
                navigate('/home_logged_in');
            } else if (userRole === 'Admin') {
                navigate('/home_logged_in');
            } else if (userRole === 'Teacher') {
                navigate('/home_logged_in');
            }
        } catch (error: any) {
            setProblemMessage(error.message || 'Error during login');
            console.error('Login error:', error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            /*setOpen(false);*/
        }
    };

    const handleRecoverPasswordClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setOpenRecoverPasswordModal(true);
        setOpen(false);
    };

    const handleResendActivationEmailClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setOpenResendActivationEmailModal(true);
        setOpen(false);
    };

    const handleBackToLogin = () => {
        setOpen(true);
        setOpenRecoverPasswordModal(false);
        setOpenResendActivationEmailModal(false);
    };

    return (
        <div>
            {/* Modal de inicio de sesión */}
            {open && (
                <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
                    <div className={`login-modal ${theme}`}>
                        {/* Botón de cerrar */}
                        <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                        <div className="login-modal-header">{t('global_login')}</div>
                        <div className="login-modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="login-modal-form">
                                <div className="login-modal-field">
                                    <label className="login-modal-label">{t('global_Email')}</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: t('global_error_emailRequired'),
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: t('global_error_invalidEmail')
                                            }
                                        }}
                                        render={({ field }) => (
                                            <input
                                                type="email"
                                                {...field}
                                                placeholder={t('global_emailPlaceholder')}
                                                className="login-modal-input"
                                                onChange={(e) => {
                                                    field.onChange(e); // Mantiene el control de react-hook-form
                                                    handleEmailValidation(e, t); // Agrega la validación personalizada del email
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.email && <p className="login-modal-error">{errors.email.message}</p>}
                                </div>

                                <div className="login-modal-field">
                                    <label className="login-modal-label">{t('global_password')}</label>
                                    <div className="password-container">
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{ required: t('global_error_passwordRequired') }}
                                            render={({ field }) => (
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                    placeholder={t('login_passwordPlaceholder')}
                                                    className="login-modal-input password-input"
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaLockOpen /> : <FaLock />}
                                        </span>
                                    </div>
                                    {errors.password && <p className="login-modal-error">{errors.password.message}</p>}
                                </div>

                                <button type="submit" className="login-modal-submit">
                                    {t('global_login')}
                                </button>

                                <div className="login-modal-footer">
                                    <p className="forgot-password-text">
                                        {t('login_forgotPassword')}
                                        &nbsp;
                                        <a href="#" onClick={handleRecoverPasswordClick} className="forgot-password-link">
                                            {t('login_recoverPassword')}
                                        </a>
                                    </p>

                                    <p className="resend-email-text">
                                        {t('login_resendActivationEmail')}
                                        &nbsp;
                                        <a href="#" onClick={handleResendActivationEmailClick} className="resend-email-link">
                                            {t('login_resendEmail')}
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {openRecoverPasswordModal && (
                <RecoverPasswordModal
                    open={openRecoverPasswordModal}
                    setOpen={setOpenRecoverPasswordModal}
                    onBackToLogin={handleBackToLogin}
                />
            )}

            {openResendActivationEmailModal && (
                <ResendActivationEmailModal
                    open={openResendActivationEmailModal}
                    setOpen={setOpenResendActivationEmailModal}
                    onBackToLogin={handleBackToLogin}
                />
            )}
        </div>
    );
};

export default LoginModal;