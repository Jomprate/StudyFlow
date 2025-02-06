import React from 'react';
import './courseDataCard.css';

interface CourseDataCardProps {
    title: string;
    value: number | string;
}

const CourseDataCard: React.FC<CourseDataCardProps> = ({ title, value }) => {
    return (
        <div className="course-data-card">
            <h3 className="course-data-title">{title}</h3>
            <p className="course-data-value">{value}</p>
        </div>
    );
};

export default CourseDataCard;
