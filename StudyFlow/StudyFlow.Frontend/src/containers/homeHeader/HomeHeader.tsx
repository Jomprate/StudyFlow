import React from 'react';
import './homeheader.css';
import { useTranslation } from 'react-i18next';
import { Segment, Container } from 'semantic-ui-react';
import { Navbar, Card, Slider } from '../../components';
import People from '../../assets/studyflow-people.png';
import { SwiperSlide } from 'swiper/react';
import itmImg from '../../assets/itm.png';
import unalImg from '../../assets/unal.png';
import pascualImg from '../../assets/pascual.png';
import udemImg from '../../assets/udem.png';
import udeaImg from '../../assets/udea.png';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import { useTheme } from '../../ThemeContext';

const institutions = [
    {
        img: itmImg,
        title: 'Instituto Tecnológico Metropolitano',
    },
    {
        img: unalImg,
        title: 'Universidad Nacional',
    },
    {
        img: pascualImg,
        title: 'Pascual Bravo',
    },
    {
        img: udeaImg,
        title: 'Universidad de Antioquia',
    },
    {
        img: udemImg,
        title: 'Universidad de Medellín',
    },
];

const HomeHeader: React.FC = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const getInstitutions = () => {
        if (institutions.length === 0) return null;

        return institutions.map((institution) => (
            <SwiperSlide key={institution.title}>
                <Card {...institution} />
            </SwiperSlide>
        ));
    };

    const swiperConfig: SwiperOptions = {
        autoplay: {
            delay: 500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        freeMode: true,
        loop: true,
        modules: [Autoplay, Navigation, A11y],
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 2000,
    };

    return (
        <div className={`homeheader_page ${theme}`}>
            <div className="homeheader_page-content">
                <div className="homeheader_page-text-ctn">
                    <h3 className="homeheader_page-title">StudyFlow</h3>
                    <p className="homeheader_page-description">{t('home_page-description_1')}</p>
                    <h3 className="homeheader_page-institutions">{t('home_page-question_1')}</h3>
                    <p className="homeheader_page-description">{t('home_page-description_2')}</p>
                    <h3 className="homeheader_page-institutions">{t('home_page-institutions-relay')}</h3>
                    <div className="homeheader_page-slider">
                        <Slider swiperConfig={swiperConfig}>{getInstitutions()}</Slider>
                    </div>
                </div>
                <div className="homeheader_page-img-ctn">
                    <div className="homeheader_page-img-container">
                        <img src={People} alt="homeheader_page-img" />
                    </div>
                </div>
            </div>

            <Segment inverted vertical className="home-footer">
                <Container textAlign="center">
                    <p>&copy; {t('home_footer')}</p>
                </Container>
            </Segment>
        </div>
    );
};

export default HomeHeader;