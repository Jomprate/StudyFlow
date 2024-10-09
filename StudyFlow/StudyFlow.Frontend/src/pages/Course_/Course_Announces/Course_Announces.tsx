import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import YTVideoAnnounceCard from '../../../components/cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../../components/cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../../components/cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import user_p from '../../../assets/user_p.svg';
import { getAnnouncesByCourseId } from '../../../services/api';

const Announces: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [showAnnouncementBox, setShowAnnouncementBox] = useState(false);

    const courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e';

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const listResult = await getAnnouncesByCourseId(courseId);
                setAnnouncements(listResult);
            } catch (error) {
                console.error('Error al traer los anuncios:', error);
            }
        };

        fetchAnnouncements();
    }, [courseId]);

    const handleAnnouncementClick = () => {
        setShowAnnouncementBox(!showAnnouncementBox);
    };

    return (
        <div className={`announces-page ${theme}`}>
            <div className="announces-container">
                <div className="announces-layout">
                    <div className="announces-main">
                        <div className="announcement-create-container" onClick={handleAnnouncementClick}>
                            <img src={user_p} alt="User Icon" className="announcement-icon" />
                            <span className="announcement-create-text">{t('announce_announceSomething')}</span>
                        </div>

                        {showAnnouncementBox && <AnnouncementBox_Create />}

                        <div className="announcement-list">
                            <h3>{t('announce_Announces')}</h3>
                            <ul>
                                {announcements.length > 0 ? (
                                    announcements.map((announcement) => (
                                        <li key={announcement.id}>
                                            {/* Renderizamos cada anuncio dentro de un AnnouncementBox */}
                                            <AnnouncementBox
                                                description={announcement.description} // HTML del anuncio
                                                date={announcement.creationDate}
                                                user={announcement.userName}
                                                videos={announcement.youTubeVideos.map((url: string) => ({ url }))}
                                                googleDriveLinks={announcement.googleDriveLinks.map((url: string) => ({ url }))}
                                                alternateLinks={announcement.alternateLinks.map((url: string) => ({ url }))}
                                            />

                                        </li>
                                    ))
                                ) : (
                                    <p>{t('announce_thereIsNotAnnounces')}</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="announces-empty">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announces;