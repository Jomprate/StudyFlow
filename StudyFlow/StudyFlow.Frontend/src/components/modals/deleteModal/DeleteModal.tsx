import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './deleteModal.css';
import { useTheme } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (password?: string) => void; // Ahora acepta una contraseña opcional
    itemToDelete: string;
    deleteTitle?: string;
    deleteMessage?: string;
    deleteButtonText?: string;
    cancelButtonText?: string;
    requirePassword?: boolean; // Indica si se requiere contraseña
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    itemToDelete,
    deleteTitle,
    deleteMessage,
    deleteButtonText,
    cancelButtonText,
    requirePassword = false, // Por defecto, no se requiere contraseña
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [password, setPassword] = useState<string>(''); // Estado para la contraseña

    if (!isOpen) return null;

    const handleDeleteClick = () => {
        onDelete(requirePassword ? password : undefined); // Envía la contraseña solo si se requiere
    };

    const modalContent = (
        <div className={`modal-overlay show`}>
            <div className={`delete-modal ${theme === 'dark' ? 'dark' : ''}`}>
                <div className="delete-modal-header">
                    {deleteTitle || t('delete_confirmation')}
                </div>
                <div className="delete-modal-body">
                    <p>
                        {deleteMessage || t('delete_message', { item: itemToDelete })}
                    </p>
                    {requirePassword && (
                        <div className="delete-modal-password">
                            <label htmlFor="delete-password">{t('enter_password')}</label>
                            <input
                                type="password"
                                id="delete-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`password-input ${theme}`}
                            />
                        </div>
                    )}
                    <div className="delete-modal-buttons">
                        <button
                            className="delete-modal-delete-button"
                            onClick={handleDeleteClick}
                            disabled={requirePassword && !password.trim()} // Deshabilita si se requiere contraseña y está vacía
                        >
                            {deleteButtonText || t('delete')}
                        </button>
                        <button
                            className="delete-modal-cancel-button"
                            onClick={onClose}
                        >
                            {cancelButtonText || t('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default DeleteModal;