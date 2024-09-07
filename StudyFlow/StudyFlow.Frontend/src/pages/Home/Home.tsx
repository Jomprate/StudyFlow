import React from 'react';
import './Home.css';
import { Navbar } from '../../Components';
import { Footer, HomeHeader } from '../../containers';

const Home: React.FC = () => {
    return (
        <div className="homepage">
            <Navbar />
            <HomeHeader />
            <Footer />
        </div>
    );
};

export default Home;