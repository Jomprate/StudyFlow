import React from 'react';
import './settings.css';
import { useTheme } from '../../ThemeContext';

const Settings: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`settings_page ${theme}`}>
            <div className="settings-container">
                <h1>Settings</h1>
                <p>Here are your settings.</p>
            </div>
        </div>
    );
};

export default Settings;