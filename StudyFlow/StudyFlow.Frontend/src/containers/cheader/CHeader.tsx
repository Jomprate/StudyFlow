import React from 'react';
import { useTranslation } from 'react-i18next';
import './cheader.css';
import calendar_clock from '../../assets/calendar_clock.svg';

const CHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="sf__header section__padding" id="home">
            <div className="sf__header-content">
                <h1 className="gradient__text">{t('home_header_title_1')}</h1>

                <p>{t('home_header_p_1')}</p>

                <div className="sf__header-content__input">
                    <input type="email" placeholder={t('home_header_input_1')} />
                    <button type="button">{t('home_header_button_1')}</button>
                </div>

                <div className="sf__header-content__people">
                    <p>{t('home_header_p_2')}</p>
                </div>

                <div className="sf__header-image">
                    <img src={calendar_clock} alt="calendar_clock" />
                </div>

            </div>
        </div>
    );
};

export default CHeader;