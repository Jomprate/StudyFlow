import React from 'react';
import './Home.css';
import { Navbar } from '../../components';
import { HomeHeader } from '../../containers';

const Home: React.FC = () => {
    return (
        <div className="homepage">
            <Navbar />
            <HomeHeader />

        </div>
    );
};

export default Home;