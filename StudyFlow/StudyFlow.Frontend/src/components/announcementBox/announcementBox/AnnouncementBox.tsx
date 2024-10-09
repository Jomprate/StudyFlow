import React from 'react';
import './announcementBox.css';
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

interface AnnouncementBoxProps {
    description: string;
    date: string;
    user: string;
    videos?: VideoProps[];
    googleDriveLinks?: GoogleDriveLinkProps[];
    otherLinks?: OtherLinkProps[];
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({
    description,
    date,
    user,
    videos = [],
    googleDriveLinks = [],
    otherLinks = []
}) => {
    return (
        <div className="announcement-box">
            <div className="announcement-header">
                <img src={userImage} alt="Imagen del usuario" className="announcement-user-image" />
                <div>
                    <p className="announcement-user-name">{user || "Usuario desconocido"}</p>
                    <small>{date || "Fecha no disponible"}</small>
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
        </div>
    );
};

export default AnnouncementBox;