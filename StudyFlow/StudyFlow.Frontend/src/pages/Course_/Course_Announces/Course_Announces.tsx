import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import user_p from '../../../assets/user_p.svg';
import { courseApi, userApi } from '../../../services/api';
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

    // Función para obtener la imagen de perfil de un usuario dado su userId en formato base64
    const fetchUserProfileImage = async (userId: string) => {
        try {
            const response = await userApi.getuserbyid(userId);
            const userData = response.data;

            console.log(`User data for ${userId}:`, userData); // Verifica el contenido de userData

            // Agregar el prefijo de base64 a la imagen si está disponible
            if (userData.profilePicture) {
                const imageBase64 = `data:image/png;base64,${userData.profilePicture}`;
                console.log(`Image in base64 for user ${userId}:`, imageBase64);
                return imageBase64;
            }
            return user_p; // Devuelve la imagen genérica si no hay imagen
        } catch (error) {
            console.error(`Error fetching profile image for user ${userId}:`, error);
            return user_p; // Si hay un error, usa la imagen genérica
        }
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (!courseId || announcementsFetched) return;

            try {
                const data = await courseApi.getCourseAnnouncesPaginated(courseId, currentPage, recordsPerPage);
                console.log("Full response from API:", data);

                if (data && data.data.length === 0) {
                    setNoAnnouncements(true);
                } else {
                    const sortedAnnouncements = await Promise.all(
                        data.data
                            .filter((announcement) => !announcement.isDeleted)
                            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
                            .map(async (announcement) => {
                                // Obtén la imagen de perfil del usuario creador
                                const creatorProfileImageUrl = await fetchUserProfileImage(announcement.userId);

                                // Imprime la URL de la imagen obtenida para cada usuario
                                console.log(`Profile image for user ${announcement.userId}: ${creatorProfileImageUrl}`);

                                return {
                                    ...announcement,
                                    creatorProfileImageUrl, // Añade la URL de la imagen de perfil
                                };
                            })
                    );

                    console.log("Mapped announcementsArray with profile images:", sortedAnnouncements);
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
                                                creatorProfileImageUrl={announcement.creatorProfileImageUrl || user_p}
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