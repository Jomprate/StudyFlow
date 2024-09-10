import React from 'react';
import './announcementBox.css'; // Aseg�rate de que el archivo CSS est� correctamente en la ruta

// Definimos los tipos de los props
interface AnnouncementBoxProps {
    title: string;
    description: string;
    date: string;
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({ title, description, date }) => {
    return (
        <div className="announcement-box">
            <h3>{title}</h3>
            <p>{description}</p>
            <small>{date}</small>
        </div>
    );
};

export default AnnouncementBox;