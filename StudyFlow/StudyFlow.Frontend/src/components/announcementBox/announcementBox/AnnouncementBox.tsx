import React from 'react';
import './announcementBox.css';
import YTVideoCard from '../../cards/YoutubeVideoCard/YTVideoCard';
import userImage from '../../../assets/user_p.svg';

interface VideoProps {
    url: string;
}

interface AnnouncementBoxProps {
    description: string;
    date: string;
    user: string;
    videos?: VideoProps[];
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({ description, date, user, videos = [] }) => {
    return (
        <div className="announcement-box">
            <div className="announcement-header">
                <img src={userImage} alt="Imagen del usuario" className="announcement-user-image" />
                <div>
                    <p className="announcement-user-name">{user || "Usuario desconocido"}</p>
                    <small>{date || "Fecha no disponible"}</small>
                </div>
            </div>
            <p>{description || "Descripción no disponible"}</p>

            {videos.length > 0 && (
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <YTVideoCard
                            key={index}
                            url={video.url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementBox;