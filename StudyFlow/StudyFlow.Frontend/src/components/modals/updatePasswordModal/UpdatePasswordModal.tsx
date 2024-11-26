import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import './updatePasswordModal.css';
import { authApi } from '../../../services/api';

interface UpdatePasswordModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({ open, setOpen, userId }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    if (!userId) {
        console.warn("UserId is missing");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setErrorMessage(t('passwords_do_not_match'));
            return;
        }

        try {
            const message = await authApi.updatePassword({
                currentPassword,
                newPassword,
                confirmNewPassword: repeatNewPassword,
            });
            setSuccessMessage(message);
            setErrorMessage('');
            setTimeout(() => setOpen(false), 2000);
        } catch (error: any) {
            setErrorMessage(error.message || t('unexpected_error'));
            setSuccessMessage('');
        }
    };

    if (!open) return null;

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`}>
            <div className={`update-password-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>
                <h2 className={`update-password-header ${theme}-text`}>{t('update_password')}</h2>
                <form onSubmit={handleSubmit} className="update-password-form">
                    <div className="form-group">
                        <label htmlFor="current-password" className={`${theme}-text`}>{t('current_password')}</label>
                        <input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password" className={`${theme}-text`}>{t('new_password')}</label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeat-new-password" className={`${theme}-text`}>{t('repeat_new_password')}</label>
                        <input
                            id="repeat-new-password"
                            type="password"
                            value={repeatNewPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                    </div>
                    {errorMessage && <p className={`update-password-error ${theme}-text`}>{errorMessage}</p>}
                    {successMessage && <p className={`update-password-success ${theme}-text`}>{successMessage}</p>}
                    <div className="button-container">
                        <button type="submit" className={`submit-button ${theme}-button`}>{t('update')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;