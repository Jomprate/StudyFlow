import React, { useState } from 'react';
import './announcementBox.css';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user_p.svg';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { announceApi } from '../../../services/api';

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
    announceId: string;
    title: string;
    description: string;
    date: string;
    user: string;
    creatorProfileImageUrl?: string;
    videos?: VideoProps[];
    googleDriveLinks?: GoogleDriveLinkProps[];
    otherLinks?: OtherLinkProps[];
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({
    announceId,
    title,
    description,
    date,
    user,
    creatorProfileImageUrl,
    videos = [],
    googleDriveLinks = [],
    otherLinks = []
}) => {
    const { t } = useTranslation();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    /*console.log(`Profile image used for announcement ${announceId}: ${creatorProfileImageUrl}`);*/

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        console.log('Deleting announcement with ID:', announceId);
        try {
            await announceApi.deleteAnnounce(announceId);
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
        return null;
    }

    return (
        <div className="announcement-box">
            <button className="announcement-delete-button" onClick={handleDeleteClick}>x</button>

            <div className="announcement-header">
                <img
                    src={creatorProfileImageUrl ? creatorProfileImageUrl : userImage}
                    alt={t('user_image_alt')}
                    className="announcement-user-image"
                />
                <div>
                    <p className="announcement-user-name">{user || t('unknown_user')}</p>
                    <small>{date || t('no_date_available')}</small>
                </div>
            </div>
            <h2 className="announcement-title">{title}</h2>

            <div className="announcement-description" dangerouslySetInnerHTML={{ __html: description }} />

            {videos.length > 0 && (
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <YTVideoAnnounceCard key={index} url={video.url} />
                    ))}
                </div>
            )}

            {googleDriveLinks.length > 0 && (
                <div className="googledrive-grid">
                    {googleDriveLinks.map((link, index) => (
                        <GoogleDriveAnnounceCard key={index} url={link.url} />
                    ))}
                </div>
            )}

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