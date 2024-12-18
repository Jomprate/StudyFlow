import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface ExternalDataLinksProps {
    onOpenModal: (modalType: 'youtube' | 'googleDrive' | 'otherLinks') => void;
}

const ExternalDataLinks: React.FC<ExternalDataLinksProps> = ({ onOpenModal }) => {
    return (
        <div className="classworkBox_Create_external-data-links">
            <button
                className="classworkBox_Create_control-button youtube"
                onClick={() => onOpenModal('youtube')}
            >
                <FontAwesomeIcon icon={faYoutube} />
            </button>
            <button
                className="classworkBox_Create_control-button google-drive"
                onClick={() => onOpenModal('googleDrive')}
            >
                <FontAwesomeIcon icon={faGoogleDrive} />
            </button>
            <button
                className="classworkBox_Create_control-button links"
                onClick={() => onOpenModal('otherLinks')}
            >
                <FontAwesomeIcon icon={faLink} />
            </button>
        </div>
    );
};

export default ExternalDataLinks;