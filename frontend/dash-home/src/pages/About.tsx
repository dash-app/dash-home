import * as React from 'react';
import { H1, P } from '../components/atoms/Core';
import { Button } from '../components/atoms/Themed';
import { LinkContainer } from 'react-router-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div>
        <H1>Dash-Home</H1>
        <P>This application made for all peoples.</P>
        <LinkContainer to="/">
          <Button>Back</Button>
        </LinkContainer>
      </div>
    );
  }
}

export default About;