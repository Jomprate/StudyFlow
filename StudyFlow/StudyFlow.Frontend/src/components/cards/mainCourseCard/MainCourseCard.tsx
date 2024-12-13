import React, { useState } from 'react';
import './mainCourseCard.css';
import { useTheme } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next';
import CurseImage from '../../../assets/user_p.svg';
import { courseApi } from '../../../services/api';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useAuth } from '../../../contexts/AuthContext';

interface CourseCardProps {
    id: string;
    name: string;
    description: string;
    teacher: string;
    image: string;
    userId: string; // userId del curso
    onCourseDeleted: (courseId: string) => void;
}

const MainCourseCard: React.FC<CourseCardProps> = ({ id, name, description, teacher, image, userId, onCourseDeleted }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { state } = useAuth();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteModalOpen(true); // Abre el modal
    };

    const handleConfirmDelete = async () => {
        try {
            await courseApi.deleteCourse(id); // Llama al servicio para eliminar el curso
            console.log(t('course_deleted_successfully'));
            setDeleteModalOpen(false); // Cierra el modal
            onCourseDeleted(id); // Notifica al padre que el curso fue eliminado
        } catch (error) {
            console.error(t('error_deleting_course'), error);
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false); // Cierra el modal sin realizar ninguna acción
    };

    //console.log("the user id is:" + userId);

    // Verificar si el botón de borrar debe mostrarse
    const canDelete = state.role === 'Admin' || state.userName === userId;

    return (
        <div className={`main_course-card ${theme}`}>
            <img
                src={image ? `data:image/png;base64,${image}` : CurseImage}
                alt={name}
                className="main_course-image"
            />
            <div className="main_course-details">
                <div className="main_course-title-container">
                    <h2 className="main_course-title">{name}</h2>
                </div>
                <p className="main_course-teacher">{t('teacher')}: {teacher}</p>
                <p className="main_course-description">{description}</p>
                {canDelete && (
                    <button
                        className="delete-course-button"
                        onClick={handleDeleteClick}
                    >
                        {t('delete_course')}
                    </button>
                )}
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onDelete={handleConfirmDelete}
                itemToDelete={name}
                deleteTitle={t('delete_course_title')}
                deleteMessage={t('delete_course_message', { item: name })}
                deleteButtonText={t('delete')}
                cancelButtonText={t('cancel')}
                requirePassword={false}
            />
        </div>
    );
};

export default MainCourseCard;