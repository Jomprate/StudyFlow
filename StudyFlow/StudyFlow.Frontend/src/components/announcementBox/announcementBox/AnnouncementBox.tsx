import React from 'react';
import './announcementBox.css';
import userImage from '../../../assets/user_p.svg';  // Asegúrate de que esta ruta apunte al archivo correcto

interface AnnouncementBoxProps {
    description: string;
    date: string;
    user: string;
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({ description, date, user }) => {
    return (
        <div className="announcement-box">
            <div className="announcement-header">
                {/* Imagen del usuario */}
                <img src={userImage} alt="Imagen del usuario" className="announcement-user-image" />
                <div>
                    {/* Nombre del usuario y fecha */}
                    <p className="announcement-user-name">{user || "Usuario desconocido"}</p>
                    <small>{date || "Fecha no disponible"}</small>
                </div>
            </div>
            <p>{description || "Descripción no disponible"}</p>
        </div>
    );
};

export default AnnouncementBox;
