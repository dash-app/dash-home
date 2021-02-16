import * as React from 'react';
import { Center, H1, P } from '../components/atoms/Core';
import Basement from '../components/basements/Basement';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface Props { }

const NotFound: React.FC<Props> = () => {
  return (
    <Basement>
      <Center>
        <H1>Not Found</H1>
        <P>That page does not exists.</P>
        <LinkContainer exact to="/">
          <Button>Back to Home</Button>
        </LinkContainer>
      </Center>
    </Basement>
  )
}

export default NotFound;