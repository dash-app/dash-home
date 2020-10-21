import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Button } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';

interface Props {
  ctrl: any,
}

const Home: React.FC<Props> = (props: Props) => {
  return (
    <Basement>
      {/* Cards.... */}
      <Container fluid="lg">
        <Link to="/about">
          <Button>About</Button>
        </Link>
      </Container>
    </Basement>
  )
}

export default Home;