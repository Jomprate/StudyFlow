import React from 'react';
import './classworkBox.css';
import { useTranslation } from 'react-i18next';

interface ClassworkBoxProps {
    title: string;
    description: string;
    date: string;
    creator: string;
}

const ClassworkBox: React.FC<ClassworkBoxProps> = ({ title, description, date, creator }) => {
    const { t } = useTranslation();

    return (
        <div className="classwork-box">
            <div className="classwork-header">
                <p className="classwork-user-name">{creator}</p>
                <small>{date || t('no_date_available')}</small>
            </div>
            <h2 className="classwork-title">{title}</h2>

            <div className="classwork-description" dangerouslySetInnerHTML={{ __html: description }} />

            <div className="classwork-footer">
                <button className="classwork-view-button">{t('view_classwork')}</button>
            </div>
        </div>
    );
};

export default ClassworkBox;