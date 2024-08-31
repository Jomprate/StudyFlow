import React from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Segment, Container } from 'semantic-ui-react';
import { Navbar } from '../../Components';
import Peolpe from '../../assets/studyflow-people.png';
import { SwiperSlide } from 'swiper/react';
import itmImg from '../../assets/itm.png';
import unalImg from '../../assets/unal.png';
import pascualImg from '../../assets/pascual.png';
import udemImg from '../../assets/udem.png';
import udeaImg from '../../assets/udea.png';
import Card from '../../Components/card/Card';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import Slider from '../../Components/slider/Slider';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Navigation, A11y } from 'swiper/modules';

const institutions = [
  {
    img: itmImg,
    title: 'Instituto Tecnologico Metropolitano',
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
    title: 'Universidad de Medellin',
  },
];

const Home: React.FC = () => {
  const { t } = useTranslation();

  const getInstitutions = () => {
    if (institutions.length === 0) return null;

    return institutions.map((institution) => {
      return (
        <SwiperSlide>
          <Card {...institution} />
        </SwiperSlide>
      );
    });
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
    <div className="homepage">
      <Navbar />
      <div className="home-main">
        <div className="homepage-text-ctn">
          <h3 className="homepage-title">StudyFlow</h3>
          <p className="homepage-description">{t('Schedule your classes, engage, and connect with your peers—all in one place: StudyFlow.')}</p>
          <h3 className="homepage-institutions">{t('Who we are and what we offer ?')}</h3>
          <p className="homepage-description">
            {t(
              'We are a company dedicated to providing efficient solutions for academic management. We make it easy to schedule meetings, assignments, and exams for students and teachers, helping them organize their time effectively and stay on top of their academic responsibilities. Our platform is designed to simplify academic life, enabling more structured planning and easy tracking of all important activities.',
            )}
          </p>
          <h3 className="homepage-institutions">{t('Some institutions that rely on us')}</h3>
          <Slider swiperConfig={swiperConfig}>{getInstitutions()}</Slider>
        </div>
        <div className="homepage-img-ctn">
          <div className="homepage-img-container">
            <img src={Peolpe} alt="homepage-img" />
          </div>
        </div>
      </div>

      <Segment inverted vertical className="home-footer">
        <Container textAlign="center">
          <p>&copy; {t('home_Footer')}</p>
        </Container>
      </Segment>
    </div>
  );
};

export default Home;
