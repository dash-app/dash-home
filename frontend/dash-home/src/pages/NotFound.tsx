import * as React from 'react';
import { Center, H1, P } from '../components/atoms/Core';
import { Button } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';
import { LinkContainer } from 'react-router-bootstrap';

interface Props { }

const NotFound: React.FC<Props> = () => {
  return (
    <Basement>
      <Center>
        <H1>Not Found</H1>
        <P>That page does not exists.</P>
        <LinkContainer to="/">
          <Button>Back to Home</Button>
        </LinkContainer>
      </Center>
    </Basement>
  )
}

export default NotFound;