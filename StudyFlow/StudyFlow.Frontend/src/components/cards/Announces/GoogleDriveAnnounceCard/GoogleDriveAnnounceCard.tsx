import React from 'react';
import './googledriveAnnounceCard.css';
import excelIcon from '../../../../assets/icons/excel_icon_256.png';
import wordIcon from '../../../../assets/icons/word_icon_256.png';
import pdfIcon from '../../../../assets/icons/pdf_icon_256.png';
import pptIcon from '../../../../assets/icons/powerpoint_icon_256.png';
import formsIcon from '../../../../assets/icons/forms_icon_256.png';

const fileIcons: Record<string, string> = {
    'sheets': excelIcon,  // Icono para Excel
    'spreadsheets': excelIcon, // Icono para Google Sheets
    'docs': wordIcon, // Icono para Google Docs
    'slides': pptIcon, // Icono para Google Slides
    'forms': formsIcon, // Fo/ Icono para Google Forms
    'default': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png' // Icono genérico para Google Drive
};

interface GoogleDriveCardProps {
    url: string;
}

const GoogleDriveAnnounceCard: React.FC<GoogleDriveCardProps> = ({ url }) => {
    const determineFileType = (link: string) => {
        if (link.includes('presentation') || link.includes('slides')) return 'slides';
        if (link.includes('spreadsheets')) return 'sheets';
        if (link.includes('document')) return 'docs';
        if (link.includes('forms')) return 'forms';
        if (link.endsWith('.pdf')) return 'pdf';
        return 'default'; // Para otros casos
    };

    const fileType = determineFileType(url);
    const fileIcon = fileIcons[fileType] || fileIcons['default'];

    return (
        <a href={url} className="googledriveAnnounceCard_card" target="_blank" rel="noopener noreferrer">
            <div className="googledriveAnnounceCard_thumbnail">
                <img
                    src={fileIcon}
                    alt={`${fileType} icon`}
                    className="googledriveAnnounceCard_image"
                />
            </div>
            <div className="googledriveAnnounceCard_details">
                <h3>{fileType === 'default' ? 'Google Drive File' : `${fileType.charAt(0).toUpperCase()}${fileType.slice(1)} File`}</h3>
                <p>Click para ver el archivo</p>
            </div>
        </a>
    );
};

export default GoogleDriveAnnounceCard;