import React, { useState } from 'react';
import './mainCourseCard.css';
import { useTheme } from '../../../ThemeContext';
import { useTranslation } from 'react-i18next';
import CurseImage from '../../../assets/user_p.svg';
import { courseApi } from '../../../services/api';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import { useAuth } from '../../../contexts/AuthContext';
import { Trans } from 'react-i18next';

interface CourseCardProps {
    id: string;
    name: string;
    description: string;
    teacher: string;
    image: string;
    userId: string;
    onCourseDeleted: (courseId: string) => void;
    onClick?: () => void;  // Nueva propiedad para manejar el clic en la tarjeta
}

const MainCourseCard: React.FC<CourseCardProps> = ({ id, name, description, teacher, image, userId, onCourseDeleted, onClick }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { state } = useAuth();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await courseApi.deleteCourse(id);
            console.log(t('course_deleted_successfully'));
            setDeleteModalOpen(false);
            onCourseDeleted(id);
        } catch (error) {
            console.error(t('error_deleting_course'), error);
        }
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };

    const canDelete = state.role === 'Admin' || state.userName === userId;

    return (
        <div
            className={`main_course-card ${theme}`}
            onClick={onClick}  // Manejar el clic en la tarjeta completa
            style={{ cursor: onClick ? 'pointer' : 'default' }} // Cambiar el cursor si hay una acción de clic
        >
            {canDelete && (
                <button
                    className="delete-course-x-button"
                    onClick={(e) => {
                        e.stopPropagation();  // Evita que el clic en el botón de eliminar dispare el evento del contenedor
                        handleDeleteClick();
                    }}
                    aria-label={t('delete_course')}
                >
                    &times;
                </button>
            )}
            <img
                src={image ? `data:image/png;base64,${image}` : CurseImage}
                alt={name}
                className="main_course-image"
            />
            <div className="main_course-details">
                <div className="main_course-title-container">
                    <h2 className="main_course-title">{name}</h2>
                </div>
                <p className="main_course-teacher">{t('global_teacher')}: {teacher}</p>
                <p className="main_course-description">{description}</p>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onDelete={handleConfirmDelete}
                itemToDelete={name}
                deleteTitle={t('delete_course_title')}
                deleteMessage={
                    <Trans
                        i18nKey="delete_course_message"
                        values={{ item: name }}
                        components={{ strong: <strong /> }}
                    />
                }
                deleteButtonText={t('delModal_delete_button')}
                cancelButtonText={t('delModal_cancel_button')}
                requirePassword={false}
            />
        </div>
    );
};

export default MainCourseCard;
