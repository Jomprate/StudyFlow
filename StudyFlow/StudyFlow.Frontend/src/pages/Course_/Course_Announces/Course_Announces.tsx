import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import announcementsData from '../announcements.json';
import user_p from '../../../assets/user_p.svg';

interface Video {
    url: string;
}

interface Announcement {
    id: number;
    description: string;
    date: string;
    user: string;
    videos?: Video[];
}

const Announces: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [showAnnouncementBox, setShowAnnouncementBox] = useState(false);

    useEffect(() => {
        setAnnouncements(announcementsData.map(announcement => ({
            ...announcement,
            videos: announcement.videos ?? []
        })));
    }, []);

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
                                            <AnnouncementBox
                                                description={announcement.description}
                                                date={announcement.date}
                                                user={announcement.user}
                                                videos={announcement.videos}
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