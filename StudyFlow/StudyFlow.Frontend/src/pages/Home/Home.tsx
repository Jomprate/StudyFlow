import React from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import { Navbar } from '../../components';

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="gradient__bg">
            <Navbar />
            <Segment vertical className="home-main">
                <Container text>
                    <Header as="h2">{t('description')}</Header>
                    <p>{t('descriptionText')}</p>
                    <Button primary size="large">
                        {t('discover_more')}
                    </Button>
                </Container>
            </Segment>

            <Segment inverted vertical className="home-footer">
                <Container textAlign="center">
                    <p>&copy; {t('home_Footer')}</p>
                </Container>
            </Segment>
        </div>
    );
};

export default Home;