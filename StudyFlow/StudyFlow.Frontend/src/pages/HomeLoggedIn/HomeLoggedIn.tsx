import React from 'react';
import './home_Logged_In.css';
import { NavbarLoggedIn } from '../../components';
import { HomeHeaderLoggedIn } from '../../containers';

const HomeLoggedIn: React.FC = () => {
    return (
        <div className="homepage">
            <NavbarLoggedIn />
            <HomeHeaderLoggedIn />

        </div>
    );
};

export default HomeLoggedIn;