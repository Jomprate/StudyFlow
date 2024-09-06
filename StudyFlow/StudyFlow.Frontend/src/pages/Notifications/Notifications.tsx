import React from 'react';
import './notifications.css';
import { useTheme } from '../../ThemeContext';

const Notifications: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`notifications_page ${theme}`}>
            <div className="notifications-container">
                <h1>Notifications</h1>
                <p>Here are your notifications.</p>
            </div>
        </div>
    );
};

export default Notifications;