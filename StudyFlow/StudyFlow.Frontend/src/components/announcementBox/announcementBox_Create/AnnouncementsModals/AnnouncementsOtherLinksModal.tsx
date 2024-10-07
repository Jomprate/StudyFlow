import React, { useState } from 'react';
import AnnouncementsModalBase from './AnnouncementsModalBase';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../ThemeContext';

interface AnnouncementsOtherLinksModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (link: string) => void;
}

const AnnouncementsOtherLinksModal: React.FC<AnnouncementsOtherLinksModalProps> = ({ isOpen, onClose, onSave }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [otherLink, setOtherLink] = useState<string>('');

    const handleAddLink = () => {
        if (otherLink.trim() !== '') {
            console.log('Other Link Added:', otherLink);
            onSave(otherLink);
            setOtherLink('');
            onClose();
        }
    };

    return (
        <AnnouncementsModalBase
            title={t('announce_otherLinksModal_Title')}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddLink}
            descriptionText={t('announce_otherLinksModal_Description')}
        >
            <div className={theme === 'dark' ? 'dark' : ''}>
                <label htmlFor="otherLink">{t('announce_otherLinksModal_Label')}</label>
                <input
                    type="text"
                    id="otherLink"
                    value={otherLink}
                    onChange={(e) => setOtherLink(e.target.value)}
                    className="announcements-modal-input"
                    placeholder={t('otherLinksModal.placeholder')}
                />
            </div>
        </AnnouncementsModalBase>
    );
};

export default AnnouncementsOtherLinksModal;