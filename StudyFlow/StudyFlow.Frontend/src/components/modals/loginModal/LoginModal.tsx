import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './loginModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { handleEmailValidation } from '../../../helpers/validationHelpers';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import RecoverPasswordModal from '../recoverPasswordModal/RecoverPasswordModal';
import ResendActivationEmailModal from '../resendActivationEmailModal/ResendActivationEmailModal';
import { loginUser } from '../../../services/api'; // Importamos loginUser
import { useAuth } from '../../../contexts/AuthContext'; // Importamos el contexto de Auth
import { UserRole } from '../../../contexts/AuthContext';

// Usamos el hook de autenticación para obtener login

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [openRecoverPasswordModal, setOpenRecoverPasswordModal] = useState(false);
    const [openResendActivationEmailModal, setOpenResendActivationEmailModal] = useState(false);
    const [problemMessage, setProblemMessage] = useState('');
    const { login } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    // Función para manejar el envío del formulario
    // Función que se ejecuta al enviar el formulario de login
    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log("Form Data:", data);

            if (!data.email || !data.password) {
                console.log("empty email or password");
                throw new Error('Email or password cannot be null or empty');
            }

            // Crea el objeto DTO que será enviado
            const loginDTO = {
                email: data.email,
                password: data.password,
            };

            // Llamada a la API de login usando el DTO
            const response = await loginUser(loginDTO);

            // Asignamos el rol devuelto o uno por defecto
            const userRole: UserRole = response.role || 'student';

            // Autenticamos al usuario en el contexto
            login(userRole, data.email);

            // Cerramos el modal y redirigimos según el rol
            setOpen(false);

            // Redirigir según el rol
            if (userRole === 'student') {
                window.location.href = '/dashboard'; // Cambia la ruta según sea necesario
            } else if (userRole === 'admin') {
                window.location.href = '/admin';
            }
        } catch (error: any) {
            setProblemMessage(error.message || 'Error during login');
            console.error('Login error:', error.message);
            console.log(problemMessage);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
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