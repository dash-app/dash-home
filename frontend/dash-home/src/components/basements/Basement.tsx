import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { Container } from '../atoms/Themed';
import { Div } from '../atoms/Core';
import ThemeContext from '../themes/Theme';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { RoomContext } from './RoomProvider';

interface Props {
  children: React.ReactNode,
}

const Basement: React.FC<Props> = props => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <RoomContext.Consumer>
          {(roomResult) => (
            <Div>
              <Navigation theme={theme} room={roomResult?.room} />
              {roomResult?.error &&
                <Alert variant="danger">
                  <Alert.Heading>
                    <CustomIcon icon={["fas", "exclamation-triangle"]} />
                    <span>Failed fetch room data</span>
                  </Alert.Heading>
                  <p>(Please see console.)</p>
                </Alert>
              }
              <Container fluid>
                {props.children}
              </Container>
            </Div>
          )}
        </RoomContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

const CustomIcon = styled(FontAwesomeIcon)`
  margin-right: 4px;
`

export default Basement;