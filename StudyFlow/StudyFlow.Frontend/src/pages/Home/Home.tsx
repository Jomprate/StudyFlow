import React, { useEffect, useCallback } from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import i18n from '../../i18n';

const Home: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const handleI18nInitialized = () => {
            // eslint-disable-next-line no-console
            console.log("Idioma actual:", i18n.language);
        };

        if (i18n.isInitialized) {
            handleI18nInitialized();
        } else {
            i18n.on('initialized', handleI18nInitialized);
        }

        return () => {
            i18n.off('initialized', handleI18nInitialized);
        };
    }, [t]);

    const changeLanguageToEnglish = useCallback(() => {
        i18n.changeLanguage('en')
            .then(() => {
                // eslint-disable-next-line no-console
                console.log("Idioma cambiado a inglés:", i18n.language);
            })
            .catch(error => {
                console.error("Error al cambiar el idioma a inglés:", error);
            });
    }, []);

    const changeLanguageToSpanish = useCallback(() => {
        i18n.changeLanguage('es')
            .then(() => {
                // eslint-disable-next-line no-console
                console.log("Idioma cambiado a español:", i18n.language);
            })
            .catch(error => {
                console.error("Error al cambiar el idioma a español:", error);
            });
    }, []);

    return (
        <div>
            <Segment inverted textAlign="center" vertical className="home-header">
                <Container>
                    <Header as="h1" inverted>
                        {t('welcome')}
                    </Header>
                </Container>
            </Segment>

            <Segment vertical className="home-main">
                <Container text>
                    <Header as="h2">{t('description')}</Header>
                    <p>{t('descriptionText')}</p>
                    <Button primary size="large">
                        {t('discover_more')}
                    </Button>

                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={changeLanguageToEnglish}>{t("english")}</Button>
                        <Button onClick={changeLanguageToSpanish} style={{ marginLeft: '10px' }}>
                            {t("spanish")}
                        </Button>
                    </div>
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