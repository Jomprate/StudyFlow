import React from 'react';
import './homeHeaderLoggedIn.css';
import { useTranslation } from 'react-i18next';
import People from '../../assets/studyflow-people.png';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

const HomeHeaderLoggedIn: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="homeheader_page">
            <div className="homeheader_page-content">
                <div className="homeheader_page-text-ctn">
                    <h3 className="homeheader_page-title">StudyFlow</h3>
                    <p className="homeheader_page-description">{t('home_page-description_1')}</p>
                    <h3 className="homeheader_page-institutions">{t('home_page-question_1')}</h3>
                    <p className="homeheader_page-description">{t('home_page-description_2')}</p>
                    <h3 className="homeheader_page-institutions">{t('home_page-institutions-relay')}</h3>

                </div>
                <div className="homeheader_page-img-ctn">
                    <div className="homeheader_page-img-container">
                        <img src={People} alt="homeheader_page-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeaderLoggedIn;