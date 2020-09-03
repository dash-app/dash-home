import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { useSelector } from 'react-redux';
import { Container } from '../atoms/Themed';
import { Div } from '../atoms/Core';

interface Props {
  children: React.ReactNode,
}
interface State { }

const Basement: React.FC<Props> = ({ children }) => {
  const theme = useSelector<any, string>((state) => state.themes.name);

  return (
    <Div>
      <Navigation theme={theme} roomName={"room"} />
      <Container fluid>
        {children}
      </Container>
    </Div>
  );
};

export default Basement;