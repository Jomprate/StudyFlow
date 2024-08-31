import React from 'react';
import { Container, Header as SemanticHeader, Button, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import './customHeader.css';

const CustomHeader: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Segment inverted textAlign="center" vertical className="home-header">
            <Container>
                <SemanticHeader as="h1" inverted icon>
                    <Icon name="world" circular />
                    <SemanticHeader.Content>{t('welcome')}</SemanticHeader.Content>
                </SemanticHeader>
                <Button primary size="huge">
                    {t('get_started')}
                </Button>
            </Container>
        </Segment>
    );
};

export default CustomHeader;