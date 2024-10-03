import React from 'react';
import './calendar.css';
import { useTheme } from '../../ThemeContext';

const Calendar: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`calendar_page ${theme}`}>
            <div className="calendar-container">
                <h1>Calendar</h1>
                <p>Here is your Calendar.</p>
            </div>
        </div>
    );
};

export default Calendar;