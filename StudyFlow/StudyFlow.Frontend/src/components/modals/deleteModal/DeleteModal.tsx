import React from 'react';
import './deleteModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    itemToDelete: string;
    deleteTitle?: string;
    deleteMessage?: string;
    deleteButtonText?: string;
    cancelButtonText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    itemToDelete,
    deleteTitle,
    deleteMessage,
    deleteButtonText,
    cancelButtonText
}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay show">
            <div className={`delete-modal ${theme === 'dark' ? 'dark' : 'light'}`}>
                <div className="delete-modal-header">
                    {deleteTitle || t('delete_confirmation')}
                </div>
                <div className="delete-modal-body">
                    <p>
                        {deleteMessage || t('delete_message', { item: itemToDelete })}
                    </p>
                    <div className="delete-modal-buttons">
                        <button className="delete-modal-delete-button" onClick={onDelete}>
                            {deleteButtonText || t('delete')}
                        </button>
                        <button className="delete-modal-cancel-button" onClick={onClose}>
                            {cancelButtonText || t('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;