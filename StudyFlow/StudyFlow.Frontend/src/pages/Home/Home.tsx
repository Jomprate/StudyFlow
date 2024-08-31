import React from 'react';
import './Home.css';
import { Navbar } from '../../components';
import { HomeHeader } from '../../containers';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

const Home: React.FC = () => {
    return (
        <div className="homepage">
            <Navbar />
            <HomeHeader />

        </div>
    );
};

export default Home;