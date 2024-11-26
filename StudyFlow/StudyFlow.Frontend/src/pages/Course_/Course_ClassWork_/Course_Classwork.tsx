import React, { useState, useEffect } from 'react';
import './course_classwork.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import ClassworkBox from '@components/classworkBox/classworkBox/ClassworkBox';
import ClassworkBox_Create from '@components/classworkBox/classworkBox_Create/ClassworkBox_Create';
import { useAuth } from '../../../contexts/AuthContext';
import user_p from '../../../assets/user_p.svg';
import { getSubjectsByCourseId } from '../../../services/subjectApi'; // Asegúrate de que el path sea correcto
import { userApi } from '../../../services/api'; // Asegúrate de que el path sea correcto
import { useParams } from 'react-router-dom'; // Para obtener el CourseId desde la URL
import Pagination from '@components/pagination/Pagination';
import { useConvertUtcToLocal } from "../../../utils/date/dateUtils.ts";

const Course_Classwork: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { state } = useAuth();
    const { courseId } = useParams<{ courseId: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [classworks, setClassworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const convertUtcToLocal = useConvertUtcToLocal();

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchClassworks = async () => {
            try {
                if (!courseId) {
                    setError(t('error_course_id_required'));
                    return;
                }

                setLoading(true);

                const response = await getSubjectsByCourseId(courseId, {
                    page: currentPage,
                    recordsNumber: recordsPerPage,
                    filter: '',
                });

                const classworksWithCreators = await Promise.all(
                    response.data.paginationResult.listResult.map(async (classwork: any) => {
                        const creatorProfileImageUrl = classwork.course?.teacherDTO?.id
                            ? await fetchUserProfileImage(classwork.course.teacherDTO.id)
                            : user_p;

                        return {
                            ...classwork,
                            creatorProfileImageUrl,
                            creationDate: classwork.creationDate || t('unknown_creation_date'),
                            modifiedDate: classwork.modifiedDate || t('unknown_modified_date'),
                        };
                    })
                );

                classworksWithCreators.sort((a, b) => {
                    const dateA = new Date(a.creationDate).getTime();
                    const dateB = new Date(b.creationDate).getTime();
                    return dateB - dateA;
                });

                setClassworks(classworksWithCreators);
                setTotalPages(response.data.paginationResult.totalPages);
                setError(null);
            } catch (error: any) {
                setError(t('error_loading_classworks'));
                console.error('Error fetching classworks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassworks();
    }, [courseId, currentPage, recordsPerPage, t]);

    const fetchUserProfileImage = async (userId: string) => {
        try {
            const response = await userApi.getuserbyid(userId);
            const userData = response.data;
            return userData.profilePicture
                ? `data:image/png;base64,${userData.profilePicture}`
                : user_p;
        } catch (error) {
            console.error(`Error fetching profile image for user ${userId}:`, error);
            return user_p;
        }
    };

    const handleAddClasswork = (newClasswork: any) => {
        const safeClasswork = {
            ...newClasswork,
            listScheduleds: newClasswork.listScheduleds || [],
            youTubeVideos: newClasswork.youTubeVideos || [],
            googleDriveLinks: newClasswork.googleDriveLinks || [],
            alternateLinks: newClasswork.alternateLinks || [],
            creatorProfileImageUrl: newClasswork.creatorProfileImageUrl || user_p,
        };

        setClassworks((prevClassworks) => [safeClasswork, ...prevClassworks]);
        setModalOpen(false);
    };

    const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
        const firstItemIndex = (currentPage - 1) * recordsPerPage;
        const newPage = Math.floor(firstItemIndex / newRecordsPerPage) + 1;
        setRecordsPerPage(newRecordsPerPage);
        setCurrentPage(newPage);
    };

    return (
        <div className={`course-classwork-page ${theme}`}>
            <div className="course-classwork-container">
                <div className="course-classwork-layout">
                    <div className="course-classwork-main">
                        {state.role === 'Teacher' && (
                            <div
                                className="course-classwork-create-container"
                                onClick={() => setModalOpen(!isModalOpen)}
                            >
                                <span className="course-classwork-create-text">
                                    {t('add_classwork')}
                                </span>
                            </div>
                        )}

                        {isModalOpen && (
                            <ClassworkBox_Create onClassworkCreated={handleAddClasswork} />
                        )}

                        <div className="course-classwork-list">
                            <h3>{t('classwork_list')}</h3>
                            {loading ? (
                                <p>{t('loading')}</p>
                            ) : error ? (
                                <p className="error-message">{error}</p>
                            ) : classworks.length === 0 ? (
                                <p>{t('no_classworks')}</p>
                            ) : (
                                classworks.map((classwork, index) => (
                                    <ClassworkBox
                                        key={classwork.id || index}
                                        classworkId={classwork.id || ''}
                                        title={classwork.name || t('no_title')}
                                        htmlContent={classwork.htmlContent || ''}
                                        date={classwork.listScheduleds?.[0]?.scheduledDate || t('no_date')}
                                        creator={classwork.course?.teacherDTO?.fullName || t('unknown_creator')}
                                        creatorId={classwork.course?.teacherDTO?.id || ''} // Agregar ID del creador
                                        creatorProfileImageUrl={classwork.creatorProfileImageUrl}
                                        creationDate={
                                            classwork.creationDate && !isNaN(new Date(classwork.creationDate).getTime())
                                                ? convertUtcToLocal(classwork.creationDate)
                                                : t('unknown_creation_date') // Valor por defecto
                                        }
                                        videos={classwork.youTubeVideos || []}
                                        googleDriveLinks={classwork.googleDriveLinks || []}
                                        otherLinks={classwork.alternateLinks || []}
                                    />
                                ))

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

                    <div className="course-classwork-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Course_Classwork;