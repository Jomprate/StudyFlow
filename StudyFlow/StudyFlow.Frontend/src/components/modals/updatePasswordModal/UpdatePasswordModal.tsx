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
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    if (!userId) {
        console.warn("UserId is missing");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Initialize errors with the correct shape
        const newErrors: { currentPassword: string; newPassword: string; repeatNewPassword: string } = {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        };

        let isValid = true;

        if (!currentPassword) {
            newErrors.currentPassword = t('update_pass_error_current_required');
            isValid = false;
        }
        if (!newPassword) {
            newErrors.newPassword = t('update_pass_error_new_required');
            isValid = false;
        }
        if (newPassword !== repeatNewPassword) {
            newErrors.repeatNewPassword = t('passwords_do_not_match');
            isValid = false;
        }

        // Update state with the complete object
        setErrors(newErrors);

        if (!isValid) return;

        try {
            const response = await authApi.updatePassword({
                currentPassword,
                newPassword,
                confirmNewPassword: repeatNewPassword,
            });
            setSuccessMessage(response || t('update_pass_success'));
            setTimeout(() => setOpen(false), 2000);
        } catch (error: any) {
            const serverErrors = error.response?.data?.errors || {};
            const updatedErrors = { ...newErrors };

            if (serverErrors.currentPassword) {
                updatedErrors.currentPassword = t('update_pass_error_incorrect_current');
            } else if (serverErrors.newPassword) {
                updatedErrors.newPassword = t('update_pass_error_invalid_new');
            } else {
                updatedErrors.currentPassword = error.response?.data?.message || t('unexpected_error');
            }

            setErrors(updatedErrors);
        }
    };

    if (!open) return null;

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`}>
            <div className={`update-password-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>
                <h2 className={`update-password-header ${theme}-text`}>{t('update_pass_Title')}</h2>
                <form onSubmit={handleSubmit} className="update-password-form">
                    <div className="form-group">
                        <label htmlFor="current-password" className={`${theme}-text`}>
                            {t('update_pass_current_pass')}
                        </label>
                        <input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                        {errors.currentPassword && (
                            <p className="update-password-error">{errors.currentPassword}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password" className={`${theme}-text`}>
                            {t('update_pass_new_pass')}
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                        {errors.newPassword && (
                            <p className="update-password-error">{errors.newPassword}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeat-new-password" className={`${theme}-text`}>
                            {t('update_pass_repeat_new_pass')}
                        </label>
                        <input
                            id="repeat-new-password"
                            type="password"
                            value={repeatNewPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                            className={`update-password-input ${theme}-input`}
                            required
                        />
                        {errors.repeatNewPassword && (
                            <p className="update-password-error">{errors.repeatNewPassword}</p>
                        )}
                    </div>
                    {successMessage && (
                        <p className={`update-password-success ${theme}-text`}>{successMessage}</p>
                    )}
                    <div className="button-container">
                        <button type="submit" className={`submit-button ${theme}-button`}>
                            {t('update')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;