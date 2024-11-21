import React, { useState } from 'react';
import './classworkBox.css';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user_p.svg';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';

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
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        // Implementa la lógica para eliminar el trabajo si es necesario
        console.log(`Deleting classwork with ID: ${classworkId}`);
        setIsDeleted(true);
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

            <div className="classwork-footer">
                <button className="classwork-view-button">{t('view_classwork')}</button>
            </div>
        </div>
    );
};

export default ClassworkBox;