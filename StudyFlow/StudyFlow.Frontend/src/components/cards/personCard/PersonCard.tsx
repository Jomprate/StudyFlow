import React, { useEffect } from 'react';
import './personCard.css';
import userPlaceholder from '../../../assets/user_p.svg';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { formatDate } from '../../../utils/date/dateUtils'; // Función para formatear la fecha

interface PersonCardProps {
    id: string;
    name: string;
    role: string;
    profileImageUrl?: string;
    email: string;
    enrollmentDate: string;
    isEnabled?: boolean;
    isCompleted?: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({ id, name, role, profileImageUrl, email, enrollmentDate, isEnabled, isCompleted }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    console.log("role" + role);
    useEffect(() => {
        //console.log("Profile Image for ID:", id, profileImageUrl || "Using placeholder");
    }, [id, profileImageUrl]);

    // Verificar si tiene imagen, de lo contrario usar el placeholder
    const imageSrc = profileImageUrl && profileImageUrl.trim() !== '' ? profileImageUrl : userPlaceholder;

    // Formatear la fecha de inscripción (con o sin hora)
    const formattedEnrollmentDate = formatDate(enrollmentDate, true); // true para incluir la hora y minutos

    return (
        <div className={`person-card ${theme} ${isEnabled ? 'enabled' : 'disabled'}`}>
            <button className="person-delete-button" onClick={() => console.log(`Deleting user with ID: ${id}`)}>x</button>
            <img
                src={imageSrc}
                alt={t('user_image_alt')}
                className="person-card-image"
            />
            <div className="person-card-content">
                <p className="person-card-name">{name}</p>
                <p className="person-card-email">{email}</p>
                <p className="person-card-enrollment">{t('enrollment_date')}: {formattedEnrollmentDate}</p>

                {/* Mostrar si está habilitado */}
                <p className="person-card-status">
                    {isEnabled ? t('enabled') : t('disabled')}
                </p>

                {/* Mostrar si la inscripción está completada */}
                <p className="person-card-status">
                    {isCompleted ? t('enrollment_completed') : t('enrollment_incomplete')}
                </p>
            </div>
        </div>
    );
};

export default PersonCard;