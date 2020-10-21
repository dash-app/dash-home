import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import AppCard from '../components/cards/AppCard';
import { Button } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';

interface Props {
  ctrl: any,
}
interface State { }

class Home extends React.Component<Props, State> {
  render() {
    console.debug(this.props.ctrl)
    return (
      <Basement>
        {/* Cards.... */}
        <Container fluid="lg">
          <Link to="/about">
            <Button>About</Button>
          </Link>
        </Container>
      </Basement>
    );
  }
};

export default Home;