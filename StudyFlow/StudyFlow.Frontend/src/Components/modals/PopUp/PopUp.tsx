import React from 'react';
import './PopUp.css';

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
        <div className="popup-overlay" >
            <div className="popup-content" >
                <p>{message} </p>
                < button onClick={onClose} className="popup-close-button" > OK </button>
            </div>
        </div>
    );
};

export default Popup;