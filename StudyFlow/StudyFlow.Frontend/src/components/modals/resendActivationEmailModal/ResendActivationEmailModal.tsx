import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import './resendActivationEmailModal.css';

interface resendActivationEmailModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onBackToLogin: () => void;
}

const ResendActivationEmail: React.FC<resendActivationEmailModalProps> = ({ open, setOpen, onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const { theme } = useTheme();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Correo de recuperación enviado a:', email);
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`}>
            <div className={`resend-Email-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className="resend-Email-modal-header">
                    {t('global_resendEmail')}
                </h2>

                <p className="resend-Email-message">
                    {t('resendEmail_instructions')}
                </p>

                <form className="resend-Email-modal-form" onSubmit={handleSubmit}>
                    <div className="resend-Email-modal-field">
                        <label className="resend-Email-modal-label" htmlFor="email">
                            {t('global_Email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="resend-Email-modal-input"
                            placeholder={t('global_emailPlaceholder')}
                            required
                        />
                    </div>
                    <button type="submit" className="resend-Email-modal-submit">
                        {t('global_recoPass')}
                    </button>
                </form>
                <div className="resend-Email-modal-footer">
                    <a href="#" className="back-to-login-link" onClick={onBackToLogin}>
                        {t('recoPass_backToLogin')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResendActivationEmail;