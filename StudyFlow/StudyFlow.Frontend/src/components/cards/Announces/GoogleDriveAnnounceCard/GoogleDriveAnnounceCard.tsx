import React from 'react';
import './googledriveAnnounceCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

interface GoogleDriveCardProps {
    url: string;
}

const GoogleDriveAnnounceCard: React.FC<GoogleDriveCardProps> = ({ url }) => {
    return (
        <a href={url} className="googledriveAnnounceCard_card" target="_blank" rel="noopener noreferrer">
            <div className="googledriveAnnounceCard_thumbnail">
                <FontAwesomeIcon icon={faGoogleDrive} size="3x" />
            </div>
            <div className="googledriveAnnounceCard_details">
                <h3>Google Drive Link</h3>
                <p>Click para ver el archivo</p>
            </div>
        </a>
    );
};

export default GoogleDriveAnnounceCard;