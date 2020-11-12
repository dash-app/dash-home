import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { Container } from '../atoms/Themed';
import { Div } from '../atoms/Core';
import ThemeContext from '../themes/Theme';
import { RoomContext } from './RoomProvider';
import { NotifyError } from '../atoms/Notify';
import { Redirect } from 'react-router-dom';

interface Props {
  children: React.ReactNode,
}

const Basement: React.FC<Props> = props => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <RoomContext.Consumer>
          {(roomResult) => {
            console.log(roomResult?.error)
            return (
              <Div>
                <Navigation theme={theme} room={roomResult?.room} />
                {roomResult?.error &&
                  roomResult.error.data["code"] === "ROOM_NOT_FOUND" ?
                  <Redirect to={"/room/setup"}/>
                  :
                  <NotifyError title="Failed fetch room data" />
                }
                <Container fluid>
                  {props.children}
                </Container>
              </Div>
            )
          }}
        </RoomContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

export default Basement;