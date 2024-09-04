import React, { useState } from 'react';
import './LoadingScreen.css';
import loadingSvg from '../../assets/logo_t.svg';

const LoadingScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleFadeOut = () => {
        setIsFadingOut(true);
        setTimeout(onFinish, 3500);
    };

    return (
        <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
            <img src={loadingSvg} alt="Loading" className="loading-svg" />
            <button className="enter-button" onClick={handleFadeOut}>
                Presiona para Entrar
            </button>
        </div>
    );
};

export default LoadingScreen;