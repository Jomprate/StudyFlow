import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './loginModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { handleEmailValidation } from '../../../helpers/validationHelpers';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import RecoverPasswordModal from '../recoverPasswordModal/RecoverPasswordModal';

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [openRecoverPasswordModal, setOpenRecoverPasswordModal] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
        setOpen(false);
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

    const handleBackToLogin = () => {
        setOpen(true);
        setOpenRecoverPasswordModal(false);
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
                                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailValidation(e, t)}
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
        </div>
    );
};

export default LoginModal;