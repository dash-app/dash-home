import React from 'react';
import { Navbar, Container, Nav, Spinner, Button } from 'react-bootstrap';
import { RoomContext } from '../room/RoomProvider';
import { Menu } from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTemperatureFull } from '@fortawesome/free-solid-svg-icons';
import { FAILED, NONE, PENDING } from '../../clients/Status';
import { Center, Div, H1 } from './Core';

export const Board = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const roomContext = React.useContext(RoomContext);
  const room = roomContext.roomResult;

  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  if (room?.status === undefined || room?.status === PENDING) {
    return (
      <Center>
        <Spinner aria-label="Loading" />
        <H1>Loading...</H1>
      </Center>
    );
  } else if (room?.status === FAILED) {
    return (
      <Center>
        <H1>Failed fetch room data</H1>
        <p>Error: {room.error?.message}</p>
        <Button onClick={() => { roomContext.fetchRoom(); }}>Retry</Button>
      </Center>
    );
  }

  return (
    <Div>
      {/* Menu Modal */}
      <Menu show={showMenu} handleClose={() => setShowMenu(false)} />

      {/* NavBar */}
      <Navbar expand="sm" expanded variant="dark">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
          {room?.room?.name}
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link>
              <span className='status-box'>
                <FontAwesomeIcon icon={faTemperatureFull} style={{ fontSize: '1.5em' }} />
                <span className='status-text'>{room?.room?.ambient.temp.toFixed(1)}</span>
                <span style={{ fontSize: '0.85rem' }}>℃</span>
              </span>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link onClick={() => setShowMenu(true)}>MENU</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Container>
        {props.children}
      </Container>
    </Div>
  );
};