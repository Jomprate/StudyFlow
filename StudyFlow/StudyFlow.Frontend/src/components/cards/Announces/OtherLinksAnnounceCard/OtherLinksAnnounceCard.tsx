import React from 'react';
import './otherLinksAnnounceCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface OtherLinksCardProps {
    url: string;
}

const OtherLinksAnnounceCard: React.FC<OtherLinksCardProps> = ({ url }) => {
    return (
        <a href={url} className="otherLinksAnnounceCard_card" target="_blank" rel="noopener noreferrer">
            <div className="otherLinksAnnounceCard_thumbnail">
                <FontAwesomeIcon icon={faLink} size="3x" />
            </div>
            <div className="otherLinksAnnounceCard_details">
                <h3>External Link</h3>
                <p>Click to view the link</p>
            </div>
        </a>
    );
};

export default OtherLinksAnnounceCard;
