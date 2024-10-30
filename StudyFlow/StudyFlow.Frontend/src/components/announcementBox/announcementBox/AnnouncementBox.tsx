import React, { useState } from 'react';
import './announcementBox.css';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user_p.svg';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { deleteAnnounce } from '../../../services/api';

interface VideoProps {
    url: string;
}

interface GoogleDriveLinkProps {
    url: string;
}

interface OtherLinkProps {
    url: string;
}

interface AnnouncementBoxProps {
    announceId: string; // Añade el ID del anuncio
    description: string;
    date: string;
    user: string;
    videos?: VideoProps[];
    googleDriveLinks?: GoogleDriveLinkProps[];
    otherLinks?: OtherLinkProps[];
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({
    announceId, // Recibimos el ID del anuncio
    description,
    date,
    user,
    videos = [],
    googleDriveLinks = [],
    otherLinks = []
}) => {
    const { t } = useTranslation();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    // Abre el modal de confirmación de borrado
    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    // Función para confirmar el borrado y llamar a la API
    const handleConfirmDelete = async () => {
        console.log('Deleting announcement with ID:', announceId); // Verifica el ID antes de llamar a la API
        try {
            await deleteAnnounce(announceId);
            console.log('Announcement deleted');
            setIsDeleted(true);
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    };

    // Cierra el modal de confirmación sin borrar
    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };

    // Si el anuncio ha sido eliminado, no se renderiza nada
    if (isDeleted) {
        return null;
    }

    return (
        <div className="announcement-box">
            <button className="announcement-delete-button" onClick={handleDeleteClick}>x</button>

            <div className="announcement-header">
                <img src={userImage} alt={t('user_image_alt')} className="announcement-user-image" />
                <div>
                    <p className="announcement-user-name">{user || t('unknown_user')}</p>
                    <small>{date || t('no_date_available')}</small>
                </div>
            </div>

            {/* Renderización del contenido HTML de description */}
            <div className="announcement-description" dangerouslySetInnerHTML={{ __html: description }} />

            {/* Grid para videos de YouTube */}
            {videos.length > 0 && (
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <YTVideoAnnounceCard key={index} url={video.url} />
                    ))}
                </div>
            )}

            {/* Grid para enlaces de Google Drive */}
            {googleDriveLinks.length > 0 && (
                <div className="googledrive-grid">
                    {googleDriveLinks.map((link, index) => (
                        <GoogleDriveAnnounceCard key={index} url={link.url} />
                    ))}
                </div>
            )}

            {/* Grid para otros enlaces */}
            {otherLinks.length > 0 && (
                <div className="other-links-grid">
                    {otherLinks.map((link, index) => (
                        <OtherLinksAnnounceCard key={index} url={link.url} />
                    ))}
                </div>
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onDelete={handleConfirmDelete}
                itemToDelete={t('this_announcement')}
                deleteTitle={t('announce_delete_title')}
                deleteMessage={t('announce_delete_message')}
                deleteButtonText={t('delModal_delete_button')}
                cancelButtonText={t('delModal_cancel_button')}
            />
        </div>
    );
};

export default AnnouncementBox;