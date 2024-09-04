import React from 'react';
import './courses.css';
import { useTheme } from '../../ThemeContext';

const Courses: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`courses_page ${theme}`}>
            <div className="courses-container">
                <h1>Courses</h1>
                <p>Here are your courses.</p>
            </div>
        </div>
    );
};

export default Courses;