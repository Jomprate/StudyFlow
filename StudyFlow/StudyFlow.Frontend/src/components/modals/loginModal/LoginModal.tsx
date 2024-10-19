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
import { jwtDecode } from 'jwt-decode';

// Usamos el hook de autenticación para obtener login

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
    const { login } = useAuth(); // Obtén la función login del contexto
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

            // Validación de email y password
            if (!data.email || !data.password) {
                console.log("Empty email or password");
                throw new Error('Email or password cannot be null or empty');
            }

            // Crear el objeto DTO que será enviado, asegurando que los valores no tengan espacios extra
            const loginDTO = {
                email: data.email.trim(),
                password: data.password.trim()
            };

            // Llamada a la API de login usando el DTO, obtenemos el token
            const token = await loginUser(loginDTO);

            // Imprimimos el token JWT recibido
            console.log('JWT Token:', token);

            // Decodificar el token JWT para obtener la información del usuario
            const decodedToken: DecodedToken = jwtDecode(token);

            console.log('Decoded JWT:', decodedToken);

            // Asignamos el rol del usuario a partir del token
            const userRole = decodedToken.role;

            // Llamada a la función login que maneja la autenticación en el contexto
            login(userRole, decodedToken.unique_name); // Aquí actualizas el contexto

            // Cerrar el modal de login
            setOpen(false);

            // Redirigir al usuario basado en su rol
            if (userRole === 'Student') {
                console.log("Logged as student");
                window.location.href = '/home_logged_in'; // Redirige al dashboard del estudiante
            } else if (userRole === 'Admin') {
                console.log("Logged as Admin");
                window.location.href = '/home_logged_in'; // Redirige al panel de administración
            } else if (userRole === 'Teacher') {
                console.log("Logged as Teacher");
                window.location.href = '//home_logged_in'; // Redirige al panel del profesor (ejemplo)
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