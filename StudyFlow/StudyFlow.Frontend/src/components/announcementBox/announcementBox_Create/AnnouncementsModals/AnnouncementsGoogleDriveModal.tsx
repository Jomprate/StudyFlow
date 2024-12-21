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
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isGoogleDomain = (link: string): boolean => {
        try {
            const url = new URL(link);
            return (
                url.hostname.endsWith('google.com') &&
                (url.hostname.startsWith('drive.') || url.hostname.startsWith('docs.'))
            );
        } catch {
            return false;
        }
    };

    const checkLinkAccessibility = async (link: string): Promise<boolean> => {
        try {
            setIsChecking(true);
            const response = await fetch(link, { method: 'HEAD' });
            setIsChecking(false);
            return response.ok;
        } catch (error) {
            console.error('Error verificando el enlace:', error);
            setIsChecking(false);
            return false;
        }
    };

    const handleAddLink = async () => {
        if (googleDriveLink.trim() === '') {
            setError(t('googleDriveModal_error_empty'));
            return;
        }

        if (!isGoogleDomain(googleDriveLink)) {
            setError(t('googleDriveModal_error_notGoogleDomain'));
            return;
        }

        const isAccessible = await checkLinkAccessibility(googleDriveLink);

        if (!isAccessible) {
            setError(t('googleDriveModal_error_accessible'));
            return;
        }

        console.log('Google Drive Link Added:', googleDriveLink);
        onSave(googleDriveLink);
        setGoogleDriveLink('');
        setError(null);
        onClose();
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
                    onChange={(e) => {
                        setGoogleDriveLink(e.target.value);
                        setError(null);
                    }}
                    className="announcements-modal-input"
                    placeholder={t('googleDriveModal_placeholder')}
                />
                {isChecking && <p>{t('googleDriveModal_checking')}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </AnnouncementsModalBase>
    );
};

export default AnnouncementsGoogleDriveModal;