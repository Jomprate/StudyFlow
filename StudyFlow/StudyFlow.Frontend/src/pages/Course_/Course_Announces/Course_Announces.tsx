import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './course_announces.css';
import { useTheme } from '../../../ThemeContext';
import AnnouncementBox_Create from '@components/announcementBox/announcementBox_Create/AnnouncementBox_Create';
import AnnouncementBox from '@components/announcementBox/announcementBox/AnnouncementBox';
import user_p from '../../../assets/user_p.svg';
import { getAnnouncesByCourseIdPaginated } from '../../../services/api';
import Pagination from '@components/pagination/Pagination';

const Announces: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Inicializamos con 10 registros por p�gina
    const [showAnnouncementBox, setShowAnnouncementBox] = useState(false);

    const courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e';

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncesByCourseIdPaginated(courseId, currentPage, recordsPerPage);
                setAnnouncements(data.data); // Mantenemos la lista de anuncios
                setTotalPages(data.totalPages); // Total de p�ginas para la paginaci�n
            } catch (error) {
                console.error('Error fetching paginated announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [courseId, currentPage, recordsPerPage]);

    const handleAnnouncementClick = () => {
        setShowAnnouncementBox(!showAnnouncementBox);
    };

    // L�gica para actualizar la cantidad de registros por p�gina y recalcular la p�gina correcta
    const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
        const firstItemIndex = (currentPage - 1) * recordsPerPage;
        const newPage = Math.floor(firstItemIndex / newRecordsPerPage) + 1;
        setRecordsPerPage(newRecordsPerPage);
        setCurrentPage(newPage); // Ajusta la p�gina actual seg�n el nuevo n�mero de registros
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
                                                otherLinks={announcement.alternateLinks.map((url: string) => ({ url }))}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <p>{t('announce_thereIsNotAnnounces')}</p>
                                )}
                            </ul>
                        </div>

                        {/* Mantiene la paginaci�n dentro de announces-main */}
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            recordsPerPage={recordsPerPage}
                            onRecordsPerPageChange={handleRecordsPerPageChange} // Actualiza los registros por p�gina
                        />
                    </div>

                    <div className="announces-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Announces;