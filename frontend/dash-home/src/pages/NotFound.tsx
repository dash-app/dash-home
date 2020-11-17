import * as React from 'react';
import { Link } from 'react-router-dom';
import { Center, H1, P } from '../components/atoms/Core';
import { Button } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';

interface Props { }

const NotFound: React.FC<Props> = () => {
  return (
    <Basement>
      <Center>
        <H1>Not Found</H1>
        <P>That page does not exists.</P>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </Center>
    </Basement>
  )
}

export default NotFound;