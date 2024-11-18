import React from 'react';
import './announcementsModalBase.css';
import { useTheme } from '../../../../ThemeContext';

interface AnnouncementsModalBaseProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onSubmit: () => void;
    descriptionText?: string;
}

const AnnouncementsModalBase: React.FC<AnnouncementsModalBaseProps> = ({ title, isOpen, onClose, children, onSubmit, descriptionText }) => {
    const { theme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className={`announcements-modal-overlay ${isOpen ? 'show' : ''}`}>
            <div className={`announcements-modal ${theme === 'dark' ? 'dark' : ''}`}>
                <button className="announcements-close-button" onClick={onClose}>X</button>
                <div className="announcements-modal-header">
                    {title}
                </div>
                {descriptionText && <div className="announcements-modal-description">{descriptionText}</div>}
                <div className="announcements-modal-body">
                    {children}
                </div>
                <button className="announcements-modal-submit" onClick={onSubmit}>Agregar</button>
            </div>
        </div>
    );
};

export default AnnouncementsModalBase;