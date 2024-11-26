import React, { useState } from 'react';
import './classworkBox.css';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user_p.svg';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { formatDate } from '../../../utils/date/dateUtils';
import { useAuth } from '../../../contexts/AuthContext';

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
    htmlContent: string;
    date: string;
    creator: string;
    creatorId: string;
    creatorProfileImageUrl?: string;
    creationDate?: string;
    modifiedDate?: string;
    videos?: VideoProps[];
    googleDriveLinks?: GoogleDriveLinkProps[];
    otherLinks?: OtherLinkProps[];
}

const ClassworkBox: React.FC<ClassworkBoxProps> = ({
    classworkId,
    title,
    htmlContent,
    creator,
    creatorId,
    creatorProfileImageUrl,
    creationDate,
    modifiedDate,
    videos = [],
    googleDriveLinks = [],
    otherLinks = [],
}) => {
    const { t } = useTranslation();
    const { state } = useAuth();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const formattedCreationDate = creationDate ? formatDate(creationDate, true) : t('unknown_creation_date');

    const truncateDate = (date: string): string => {
        const parsedDate = new Date(date);
        return parsedDate.toISOString().slice(0, 16);
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            console.log('Deleting classwork with ID:', classworkId);
            setIsDeleted(true);
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Failed to delete classwork:', error);
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
            {state.userName === creatorId && (
                <button className="classwork-delete-button" onClick={handleDelete}>
                    x
                </button>
            )}

            <div className="classwork-header">
                <img
                    src={creatorProfileImageUrl ? creatorProfileImageUrl : userImage}
                    alt={t('user_image_alt')}
                    className="classwork-user-image"
                />
                <div className="classwork-header-details">
                    <p className="classwork-user-name">{creator || t('unknown_user')}</p>
                    <small className="classwork-dates">
                        {t('created_on')}: {formattedCreationDate}
                        {creationDate && modifiedDate && truncateDate(creationDate) !== truncateDate(modifiedDate) && (
                            <span>
                                {' | '}
                                {/* {t('last_modified')}: {formattedModifiedDate} */}
                            </span>
                        )}
                    </small>
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
                        .filter(video => video && video.toString() !== 'string')
                        .map((video, index) => (
                            <YTVideoAnnounceCard
                                key={index}
                                url={typeof video === 'string' ? video : video.url}
                            />
                        ))}
                </div>
            )}

            {googleDriveLinks.length > 0 && googleDriveLinks.some(link => link.url !== 'string') && (
                <div className="googledrive-grid">
                    {googleDriveLinks
                        .filter(link => link.url && link.url !== 'string')
                        .map((link, index) => (
                            <GoogleDriveAnnounceCard key={index} url={link.url} />
                        ))}
                </div>
            )}

            {otherLinks.length > 0 && otherLinks.some(link => link.url !== 'string') && (
                <div className="other-links-grid">
                    {otherLinks
                        .filter(link => link.url && link.url !== 'string')
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