import React from 'react';
import './PopUp.css';
import { useTheme } from '../../../ThemeContext'; // Importa el contexto de tema

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    const { theme } = useTheme(); // Obtiene el tema actual

    return (
        <div className={`popup-overlay ${theme}`}>
            <div className={`popup-content ${theme}`}>
                <p>{message}</p>
                <button onClick={onClose} className="popup-close-button">
                    OK
                </button>
            </div>
        </div>
    );
};

export default Popup;