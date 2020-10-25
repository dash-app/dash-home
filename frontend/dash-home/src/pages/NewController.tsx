import * as React from 'react';
import Basement from "../components/basements/Basement";
import { Container } from 'react-bootstrap';
import { H1 } from '../components/atoms/Core';

interface Props { }

const NewController: React.FC<Props> = (props: Props) => {
  return (
    <Basement>
      <Container fluid="lg">
        <H1>New Controller...</H1>
      </Container>
    </Basement>
  )
}

export default NewController;