import React, { useState } from 'react';
import AnnouncementsModalBase from './AnnouncementsModalBase';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../ThemeContext';

interface AnnouncementsGoogleDriveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (link: string) => void;
}

const AnnouncementsGoogleDriveModal: React.FC<AnnouncementsGoogleDriveModalProps> = ({ isOpen, onClose, onSave }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [googleDriveLink, setGoogleDriveLink] = useState<string>('');

    const handleAddLink = () => {
        if (googleDriveLink.trim() !== '') {
            console.log('Google Drive Link Added:', googleDriveLink);
            onSave(googleDriveLink);
            setGoogleDriveLink('');
            onClose();
        }
    };

    return (
        <AnnouncementsModalBase
            title={t('announce_googleDriveModal_Title')}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddLink}
            descriptionText={t('announce_googleDriveModal_Description')}
        >
            <div className={theme === 'dark' ? 'dark' : ''}>
                <label htmlFor="googleDriveLink">{t('announce_googleDriveModal_Label')}</label>
                <input
                    type="text"
                    id="googleDriveLink"
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    className="announcements-modal-input"
                    placeholder={t('googleDriveModal.placeholder')}
                />
            </div>
        </AnnouncementsModalBase>
    );
};

export default AnnouncementsGoogleDriveModal;