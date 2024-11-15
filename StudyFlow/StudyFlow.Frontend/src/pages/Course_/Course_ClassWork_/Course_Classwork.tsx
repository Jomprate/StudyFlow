import React, { useState, useEffect } from 'react';
import './course_classwork.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import ClassworkBox from '@components/classworkBox/classworkBox/ClassworkBox'; // Similar a AnnouncementBox
import ClassworkBox_Create from '@components/classworkBox/classworkBox_Create/ClassworkBox_Create'; // Asegúrate de importar correctamente
import './course_classwork.css';

const Course_Classwork: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [isModalOpen, setModalOpen] = useState(false);  // Control para mostrar/ocultar el formulario de creación
    const [classworks, setClassworks] = useState<any[]>([]); // Asegúrate de ajustarlo al tipo adecuado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClassworks = async () => {
            try {
                setLoading(true);
                // Aquí debes hacer la llamada a la API para obtener los "classworks" del curso
                // const response = await classworkApi.getClassworksByCourseId('courseId', 1, 10); // Ajusta la llamada a la API
                // setClassworks(response.data); // Ajusta la estructura de respuesta
                setError(null);
            } catch (error: any) {
                setError(t('error_loading_classworks'));
                console.error("Error fetching classworks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassworks();
    }, []);

    const handleAddClasswork = (classwork: any) => {
        console.log('Classwork added:', classwork);
        setClassworks([...classworks, classwork]);
        setModalOpen(false);  // Cerrar el formulario después de añadir el classwork
    };

    return (
        <div className={`course-classwork-page ${theme}`}>
            <div className="course-classwork-container">
                <div className="course-classwork-layout">
                    <div className="course-classwork-main">
                        {/* Botón para mostrar/ocultar el formulario de creación */}
                        <div className="course-classwork-create-container" onClick={() => setModalOpen(!isModalOpen)}>
                            <span className="course-classwork-create-text">{t('add_classwork')}</span>
                        </div>

                        {/* Si el formulario de creación está abierto, mostrarlo */}
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
                                        key={index}
                                        title={classwork.title}
                                        description={classwork.description}
                                        date={classwork.date}
                                        creator={classwork.creator}
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