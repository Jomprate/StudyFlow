import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import user_p from '../../../assets/user_p.svg';
import { courseApi, userApi, announceApi } from '../../../services/api';
import Pagination from '@components/pagination/Pagination';
import { useAuth } from '../../../contexts/AuthContext';
import { useUser } from '../../../contexts/UserContext';
import { useConvertUtcToLocal } from '../../../utils/date/dateUtils.ts';

const Announces: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showAnnouncementBox, setShowAnnouncementBox] = useState(false);
    const [noAnnouncements, setNoAnnouncements] = useState(false);
    const { state: authState } = useAuth();
    const { state: userState } = useUser();
    const convertUtcToLocal = useConvertUtcToLocal();

    const fetchUserProfileImage = async (userId: string) => {
        if (userId === authState.userName && userState.imageBase64) {
            return userState.imageBase64; // Usa la imagen del contexto si está disponible
        }
        try {
            const response = await userApi.getuserbyid(userId);
            const userData = response.data;
            return userData.profilePicture
                ? `data:image/png;base64,${userData.profilePicture}`
                : user_p; // Imagen predeterminada
        } catch (error) {
            console.error(`Error fetching profile image for user ${userId}:`, error);
            return user_p; // Imagen predeterminada en caso de error
        }
    };

    const fetchAnnouncements = useCallback(async () => {
        if (!courseId) return;

        try {
            const data = await announceApi.getCourseAnnouncesPaginated(courseId, currentPage, recordsPerPage, '');

            if (!data || data.data.length === 0) {
                setNoAnnouncements(true);
                setAnnouncements([]);
            } else {
                const sortedAnnouncements = await Promise.all(
                    data.data
                        .filter((announcement) => !announcement.isDeleted)
                        .map(async (announcement) => {
                            const creatorProfileImageUrl = await fetchUserProfileImage(announcement.userId);
                            return {
                                ...announcement,
                                creatorProfileImageUrl,
                            };
                        })
                );

                // Ordenar del más reciente al más antiguo
                const orderedAnnouncements = sortedAnnouncements.sort(
                    (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
                );

                setAnnouncements(orderedAnnouncements);
                setTotalPages(data.totalPages);
                setNoAnnouncements(false);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setNoAnnouncements(true);
            } else {
                console.error('Error fetching paginated announcements:', error);
            }
        }
    }, [courseId, currentPage, recordsPerPage]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    const handleNewAnnouncement = async (newAnnouncement: any) => {
        const safeAnnouncement = {
            ...newAnnouncement,
            title: newAnnouncement.title || t('announce_defaultTitle'),
            youTubeVideos: newAnnouncement.youTubeVideos || [],
            googleDriveLinks: newAnnouncement.googleDriveLinks || [],
            alternateLinks: newAnnouncement.alternateLinks || [],
        };

        // Inserta el nuevo anuncio temporalmente
        setAnnouncements((prevAnnouncements) => [
            { ...safeAnnouncement },
            ...prevAnnouncements,
        ]);
        setShowAnnouncementBox(false);

        // Refresca los anuncios desde el backend
        await fetchAnnouncements();
    };

    return (
        <div className={`announces-page ${theme}`}>
            <div className="announces-container">
                <div className="announces-layout">
                    <div className="announces-main">
                        <div className="announcement-create-container" onClick={() => setShowAnnouncementBox(!showAnnouncementBox)}>
                            <img
                                src={userState.imageBase64 || user_p}
                                alt="User Icon"
                                className="announcement-icon"
                            />
                            <span className="announcement-create-text">
                                {t('announce_announceSomething')}
                            </span>
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
                                                title={announcement.title}
                                                description={announcement.description}
                                                date={convertUtcToLocal(announcement.creationDate)}
                                                user={announcement.userName}
                                                creatorProfileImageUrl={announcement.creatorProfileImageUrl || user_p}
                                                videos={(announcement.youTubeVideos || []).map((url: string) => ({ url }))}
                                                googleDriveLinks={(announcement.googleDriveLinks || []).map((url: string) => ({ url }))}
                                                otherLinks={(announcement.alternateLinks || []).map((url: string) => ({ url }))}
                                                isCreator={authState.userName === announcement.userId}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            recordsPerPage={recordsPerPage}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                            }}
                            onRecordsPerPageChange={(newRecordsPerPage) => {
                                setRecordsPerPage(newRecordsPerPage);
                                setCurrentPage(1); // Reiniciar a la primera página al cambiar los registros por página
                            }}
                        />
                    </div>

                    <div className="announces-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Announces;