import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './loginModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { FaLock, FaLockOpen } from 'react-icons/fa';

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            console.log("Form Data:", data);
            setOpen(false);
        } catch (error) {
            console.error("Validation Error:", error);
        }
    };

    const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        const atSymbolMissing = !emailValue.includes('@');
        const dotMissing = !emailValue.includes('.');
        const atPosition = emailValue.indexOf('@');
        const dotPosition = emailValue.lastIndexOf('.');

        if (atSymbolMissing) {
            e.target.setCustomValidity(t('login_error_atSymbolMissing'));
        } else if (atPosition === emailValue.length - 1 || emailValue[atPosition + 1] === '.') {
            e.target.setCustomValidity(t('login_error_domainMissing'));
        } else if (dotMissing || dotPosition < atPosition + 2) {
            e.target.setCustomValidity(t('login_error_dotMissing'));
        } else if (dotPosition === emailValue.length - 1 || emailValue[dotPosition + 1] === '') {
            e.target.setCustomValidity(t('login_error_invalidDomain'));
        } else {
            e.target.setCustomValidity('');
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

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`login-modal ${theme}`}>
                {/* Botón de cerrar */}
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>
                <div className="login-modal-header">{t('login')}</div>
                <div className="login-modal-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="login-modal-form">
                        <div className="login-modal-field">
                            <label className="login-modal-label">{t('login_email')}</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: t('login_error_emailRequired'),
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: t('login_invalidEmail')
                                    }
                                }}
                                render={({ field }) => (
                                    <input
                                        type="email"
                                        {...field}
                                        placeholder={t('login_emailPlaceholder')}
                                        className="login-modal-input"
                                        onInput={handleEmailValidation}
                                    />
                                )}
                            />
                            {errors.email && <p className="login-modal-error">{errors.email.message}</p>}
                        </div>

                        <div className="login-modal-field">
                            <label className="login-modal-label">{t('login_password')}</label>
                            <div className="password-container">
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: t('login_error_passwordRequired') }}
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
                            {t('login')}
                        </button>

                        <div className="login-modal-footer">
                            <p className="forgot-password-text">
                                {t('login_forgotPassword')} <a href="/forgot-password" className="forgot-password-link">{t('login_recoverPassword')}</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;