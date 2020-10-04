import * as React from 'react';
import { Link } from 'react-router-dom';
import { H1, P } from '../components/atoms/Core';
import { Button } from '../components/atoms/Themed';

class About extends React.Component {
  render() {
    return (
      <div>
        <H1>Dash-Home</H1>
        <P>This application made for all peoples.</P>
        <Link to="/">
          <Button>Back</Button>
        </Link>
      </div>
    );
  }
}

export default About;