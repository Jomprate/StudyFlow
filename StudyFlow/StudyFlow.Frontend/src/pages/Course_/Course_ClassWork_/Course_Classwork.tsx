import React, { useState, useEffect } from 'react';
import './course_classwork.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import ClassworkBox from '@components/classworkBox/classworkBox/ClassworkBox';
import ClassworkBox_Create from '@components/classworkBox/classworkBox_Create/ClassworkBox_Create';
import { useAuth } from '../../../contexts/AuthContext';
import { getSubjectsByCourseId } from '../../../services/subjectApi'; // Asegúrate de que el path sea correcto
import { useParams } from 'react-router-dom'; // Para obtener el CourseId desde la URL

const Course_Classwork: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { state } = useAuth();
    const { courseId } = useParams<{ courseId: string }>(); // Obtener CourseId desde los parámetros de la URL
    const [isModalOpen, setModalOpen] = useState(false);
    const [classworks, setClassworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClassworks = async () => {
            try {
                if (!courseId) {
                    setError(t('error_course_id_required'));
                    return;
                }

                setLoading(true);

                // Llamar a la API para obtener los subjects del curso
                const response = await getSubjectsByCourseId(courseId, {
                    page: 1,
                    recordsNumber: 10, // Puedes ajustar el número de registros por página
                    filter: '',
                });

                setClassworks(response.data.paginationResult.listResult); // Actualiza el estado con los datos obtenidos
                setError(null);
            } catch (error: any) {
                setError(t('error_loading_classworks'));
                console.error('Error fetching classworks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassworks();
    }, [courseId, t]);

    const handleAddClasswork = (classwork: any) => {
        console.log('Classwork added:', classwork);
        setClassworks([...classworks, classwork]);
        setModalOpen(false);
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
                                        key={classwork.id || index} // Usa el ID del subject como key si está disponible
                                        title={classwork.name} // Nombre del subject
                                        description={classwork.htmlContent} // Descripción o contenido
                                        date={classwork.listScheduleds?.[0]?.scheduledDate || t('no_date')} // Primera fecha programada si existe
                                        creator={classwork.course?.teacherDTO?.fullName || t('unknown_creator')} // Creador
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="course-classwork-empty"></div>
                </div>
            </div>
        </div>
    );
};

export default Course_Classwork;