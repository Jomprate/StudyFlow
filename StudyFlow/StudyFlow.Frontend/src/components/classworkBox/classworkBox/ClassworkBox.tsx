import React, { useState } from 'react';
import './classworkBox.css';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user_p.svg';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
interface VideoProps {
    url: string;
}

interface GoogleDriveLinkProps {
    url: string;
}

interface OtherLinkProps {
    url: string;
}

interface ClassworkBoxProps {
    classworkId: string;
    title: string;
    htmlContent: string; // Contenido HTML para mostrar en el cuerpo del componente
    date: string;
    creator: string;
    creatorProfileImageUrl?: string;
    videos?: VideoProps[];
    googleDriveLinks?: GoogleDriveLinkProps[];
    otherLinks?: OtherLinkProps[];
}

const ClassworkBox: React.FC<ClassworkBoxProps> = ({
    classworkId,
    title,
    htmlContent,
    date,
    creator,
    creatorProfileImageUrl,
    videos = [],
    googleDriveLinks = [],
    otherLinks = [],
}) => {
    const { t } = useTranslation();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        // Implementa la l�gica para eliminar el trabajo si es necesario
        setDeleteModalOpen(true);
        console.log(`Deleting classwork with ID: ${classworkId}`);
        //setIsDeleted(true);
    };

    const handleConfirmDelete = async () => {
        console.log('Deleting announcement with ID:', classworkId);
        try {
            //await announceApi.deleteAnnounce(announceId);
            console.log('Announcement deleted');
            setIsDeleted(true);
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    };
    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };

    if (isDeleted) {
        return null; // Si se elimina, no se renderiza
    }

    return (
        <div className="classwork-box">
            <button className="classwork-delete-button" onClick={handleDelete}>
                x
            </button>

            <div className="classwork-header">
                <img
                    src={creatorProfileImageUrl ? creatorProfileImageUrl : userImage}
                    alt={t('user_image_alt')}
                    className="classwork-user-image"
                />
                <div>
                    <p className="classwork-user-name">{creator || t('unknown_user')}</p>
                    <small>{date || t('no_date_available')}</small>
                </div>
            </div>

            <h2 className="classwork-title">{title}</h2>

            <div
                className="classwork-html-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {videos.length > 0 && (
                <div className="video-grid">
                    {videos
                        .filter(video => video && video !== 'string') // Filtra valores inv�lidos y "string"
                        .map((video, index) => (
                            <YTVideoAnnounceCard
                                key={index}
                                url={typeof video === 'string' ? video : video.url} // Maneja tanto strings como objetos
                            />
                        ))}
                </div>
            )}

            {googleDriveLinks.length > 0 && googleDriveLinks.some(link => link.url !== 'string') && (
                <div className="googledrive-grid">
                    {googleDriveLinks
                        .filter(link => link.url && link.url !== 'string') // Filtra los valores inv�lidos
                        .map((link, index) => (
                            <GoogleDriveAnnounceCard key={index} url={link.url} />
                        ))}
                </div>
            )}

            {otherLinks.length > 0 && otherLinks.some(link => link.url !== 'string') && (
                <div className="other-links-grid">
                    {otherLinks
                        .filter(link => link.url && link.url !== 'string') // Filtra los valores inv�lidos
                        .map((link, index) => (
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

            <div className="classwork-footer">
                <button className="classwork-view-button">{t('view_classwork')}</button>
            </div>
        </div>
    );
};

export default ClassworkBox;