import React from 'react';
import './requests.css';
import { useTheme } from '../../ThemeContext';

const Requests: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`requests_page ${theme}`}>
            <div className="requests-container">
                <h1>Requests</h1>
                <p>Here are your requests.</p>
            </div>
        </div>
    );
};

export default Requests;