import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import user_p from '../../../assets/user_p.svg';
import { courseApi } from '../../../services/api';
import Pagination from '@components/pagination/Pagination';

const Announces: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [currentPage, setCurrentPage] = useState(1);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [showAnnouncementBox, setShowAnnouncementBox] = useState(false);
    const [noAnnouncements, setNoAnnouncements] = useState(false);
    const [announcementsFetched, setAnnouncementsFetched] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (!courseId || announcementsFetched) {
                return;
            }

            try {
                const data = await courseApi.getCourseAnnouncesPaginated(courseId, currentPage, recordsPerPage);
                console.log("Full response from API:", data);

                if (data && data.data.length === 0) {
                    setNoAnnouncements(true);
                } else {
                    const sortedAnnouncements = data.data
                        .filter((announcement) => !announcement.isDeleted)
                        .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());

                    console.log("Mapped announcementsArray:", sortedAnnouncements);
                    setAnnouncements(sortedAnnouncements);
                    setTotalPages(data.totalPages);
                    setNoAnnouncements(false);
                }
                setAnnouncementsFetched(true);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    console.log("No announcements found for this course.");
                    setNoAnnouncements(true);
                } else {
                    console.error('Error fetching paginated announcements:', error);
                }
            }
        };

        setAnnouncements([]);
        setAnnouncementsFetched(false);
        fetchAnnouncements();
    }, [courseId, currentPage, recordsPerPage]);

    const handleAnnouncementClick = () => {
        setShowAnnouncementBox(!showAnnouncementBox);
    };

    const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
        const firstItemIndex = (currentPage - 1) * recordsPerPage;
        const newPage = Math.floor(firstItemIndex / newRecordsPerPage) + 1;
        setRecordsPerPage(newRecordsPerPage);
        setCurrentPage(newPage);
    };

    const handleNewAnnouncement = (newAnnouncement: any) => {
        const safeAnnouncement = {
            ...newAnnouncement,
            youTubeVideos: newAnnouncement.youTubeVideos || [],
            googleDriveLinks: newAnnouncement.googleDriveLinks || [],
            alternateLinks: newAnnouncement.alternateLinks || [],
        };

        setAnnouncements((prevAnnouncements) =>
            [safeAnnouncement, ...prevAnnouncements].sort(
                (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
            )
        );
        setShowAnnouncementBox(false);
        setNoAnnouncements(false);
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

                        {showAnnouncementBox && <AnnouncementBox_Create onAnnounceCreated={handleNewAnnouncement} />}

                        <div className="announcement-list">
                            <h3>{t('announce_Announces')}</h3>
                            {noAnnouncements ? (
                                <p>{t('announce_thereIsNotAnnounces')}</p>
                            ) : (
                                <ul>
                                    {announcements.map((announcement, index) => (
                                        <li key={`${announcement.id}-${index}`}>
                                            <AnnouncementBox
                                                announceId={announcement.id}
                                                description={announcement.description}
                                                date={announcement.creationDate}
                                                user={announcement.userName}
                                                videos={(announcement.youTubeVideos || []).map((url: string) => ({ url }))}
                                                googleDriveLinks={(announcement.googleDriveLinks || []).map((url: string) => ({ url }))}
                                                otherLinks={(announcement.alternateLinks || []).map((url: string) => ({ url }))}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            recordsPerPage={recordsPerPage}
                            onRecordsPerPageChange={handleRecordsPerPageChange}
                        />
                    </div>

                    <div className="announces-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Announces;