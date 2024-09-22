import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './course.css';
import { useTheme } from '../../ThemeContext';
import AnnouncementBox_Create from '../../components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '../../components/announcementBox/announcementBox/AnnouncementBox';
import announcementsData from './announcements.json';
import user_p from '../../assets/user_p.svg';

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

const Course: React.FC = () => {
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
        <div className={`course-page ${theme}`}>
            <div className="course-container">
                <div className="course-header">
                    <h1>2024-II G2 Construcción de Software</h1>
                    <h2>Especialización Ingeniería de Software</h2>
                </div>

                <div className="course-layout">
                    <div className="course-sidebar">
                        <div className="course-upcoming">
                            <h3>{t('upcoming')}</h3>
                            <p>{t('no_tasks')}</p>
                            <a href="#">{t('see_all')}</a>
                        </div>
                    </div>

                    <div className="course-main">
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
                </div>
            </div>
        </div>
    );
};

export default Course;