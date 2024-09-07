import React from 'react';
import './footer.css';
import { t } from 'i18next';
import { Segment, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment inverted vertical className="home-footer">
      <Container textAlign="center">
        <p>&copy; {t('home_footer')}</p>
      </Container>
    </Segment>
  );
};

export default Footer;
