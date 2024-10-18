import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import './userCreatedModal.css';

interface resendActivationEmailModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onBackToLogin: () => void;
}

const UserCreatedModal: React.FC<resendActivationEmailModalProps> = ({ open, setOpen, onBackToLogin }) => {
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
            <div className={`user-created-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className="user-created-modal-header">
                    {t('global_resendEmail')}
                </h2>

                <p className="user-created-message">
                    {t('resendEmail_instructions')}
                </p>

                <form className="user-created-modal-form" onSubmit={handleSubmit}>
                    <div className="user-created-modal-field">
                        <label className="user-created-modal-label" htmlFor="email">
                            {t('global_Email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="user-created-modal-input"
                            placeholder={t('global_emailPlaceholder')}
                            required
                        />
                    </div>
                    <button type="submit" className="user-created-modal-submit">
                        {t('global_recoPass')}
                    </button>
                </form>
                <div className="user-created-modal-footer">
                    <a href="#" className="back-to-login-link" onClick={onBackToLogin}>
                        {t('recoPass_backToLogin')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserCreatedModal;