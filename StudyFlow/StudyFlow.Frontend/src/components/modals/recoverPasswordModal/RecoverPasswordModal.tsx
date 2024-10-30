import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import './recoverPasswordModal.css';
import { authApi } from '../../../services/api';
import Popup from '../PopUp/PopUp'; // Importar el Popup

interface RecoverPasswordModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onBackToLogin: () => void;
}

const RecoverPasswordModal: React.FC<RecoverPasswordModalProps> = ({ open, setOpen, onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el popup
    const [popupMessage, setPopupMessage] = useState(''); // Estado para el mensaje del Popup

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const popupMessage: string = await authApi.RecoveryPassword(email);
        setPopupMessage(popupMessage); // Establecer el mensaje del Popup
        setShowPopup(true); // Mostrar el Popup
    };

    if (!open) return null;

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`}>
            <div className={`recover-password-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className="recover-password-modal-header">
                    {t('global_recoPass')}
                </h2>

                <p className="recover-password-message">
                    {t('recoPass_instructions')}
                </p>

                <form className="recover-password-modal-form" onSubmit={handleSubmit}>
                    <div className="recover-password-modal-field">
                        <label className="recover-password-modal-label" htmlFor="email">
                            {t('global_Email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="recover-password-modal-input"
                            placeholder={t('global_emailPlaceholder')}
                            required
                        />
                    </div>
                    <button type="submit" className="recover-password-modal-submit">
                        {t('global_recoPass')}
                    </button>
                </form>
                <div className="recover-password-modal-footer">
                    <a href="#" className="back-to-login-link" onClick={onBackToLogin}>
                        {t('recoPass_backToLogin')}
                    </a>
                </div>
            </div>
            {/* Renderización condicional del Popup */}
            {
                showPopup && (
                    <Popup
                        message={popupMessage}
                        onClose={() => { setShowPopup(false); setOpen(false); }} // Cerrar el popup cuando el usuario haga clic en OK
                    />
                )
            }
        </div >
    );
};

export default RecoverPasswordModal;