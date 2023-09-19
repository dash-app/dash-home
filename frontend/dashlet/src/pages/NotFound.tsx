import * as React from 'react';
import { Center, H1 } from '../components/elements/Core';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound: React.FC = () => {
  return (
    <Center>
      <H1>Not Found</H1>
      <p>That page does not exists.</p>
      <LinkContainer to="/">
        <Button>Back to Home</Button>
      </LinkContainer>
    </Center>
  );
};

export default NotFound;
