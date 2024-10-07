import React, { useState } from 'react';
import AnnouncementsModalBase from './AnnouncementsModalBase';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../ThemeContext';

interface AnnouncementsYouTubeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (link: string) => void; // Añadir onSave como prop
}

const AnnouncementsYouTubeModal: React.FC<AnnouncementsYouTubeModalProps> = ({ isOpen, onClose, onSave }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [youtubeLink, setYoutubeLink] = useState<string>('');

    const handleAddLink = () => {
        if (youtubeLink.trim() !== '') {
            console.log('YouTube Link Added:', youtubeLink);
            onSave(youtubeLink); // Llamar a onSave para guardar el enlace temporalmente
            setYoutubeLink(''); // Limpiar el campo de entrada
            onClose(); // Cerrar el modal
        }
    };

    return (
        <AnnouncementsModalBase
            title={t('announce_youtubeModal_Title')}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddLink} // Mantener el uso de onSubmit
            descriptionText={t('announce_youtubeModal_Description')}
        >
            <div className={theme === 'dark' ? 'dark' : ''}>
                <label htmlFor="youtubeLink">{t('announce_youtubeModal_Label')}</label>
                <input
                    type="text"
                    id="youtubeLink"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="announcements-modal-input"
                    placeholder={t('youtubeModal.placeholder')}
                />
            </div>
        </AnnouncementsModalBase>
    );
};

export default AnnouncementsYouTubeModal;