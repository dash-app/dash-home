import { Navbar, Nav, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as React from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../themes/ThemeProvider';
import { Span } from '../atoms/Core';
import { RoomContext } from '../basements/RoomProvider';
import { SUCCESS } from '../../remote-go/Status';

interface Props {
  menuHandler: any,
}

interface ThemeProps {
  theme: string,
}

const Navigation: React.FC<Props> = props => {
  const roomContext = React.useContext(RoomContext);
  const roomResult = roomContext.roomResult;
  const theme = React.useContext(ThemeContext).theme;

  return (
    <CustomNavbar
      bg={theme === "CHEEKY_WHITE" ? "light" : "primary"}
      variant={theme === "CHEEKY_WHITE" ? "light" : "dark"}
      theme={theme}
      expand="sm"
    >
      <div>
        <Title>
          <FontAwesomeIcon icon={["fas", "home"]} />
          <span style={{ margin: "0.5em" }}>
            <span>{roomResult?.room && roomResult.room.name}</span>
            {/* TODO: Add house name */}
            {/* <span style={{ fontSize: "0.5em" }}> // Bedroom</span> */}
          </span>
        </Title>
        <RoomStatus theme={theme}>
          <StatusBox>
            <FontAwesomeIcon icon={["fas", "thermometer-three-quarters"]} />
            <StatusText>{roomResult?.room ? roomResult?.room.ambient.temp.toFixed(1) : "--.-"}<span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>℃</span></StatusText>
          </StatusBox>
          <StatusBox>
            <FontAwesomeIcon icon={["fas", "tint"]} />
            <StatusText>{roomResult?.room ? roomResult?.room.ambient.humid.toFixed(0) : "--"}<span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>%</span></StatusText>
          </StatusBox>
        </RoomStatus>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Just Blank... */}
        </Nav>
        <Nav>
          <Span style={{ marginRight: "1rem" }}>
            Dash-App
          </Span>
        </Nav>
        <Nav>
          <Button onClick={() => { props.menuHandler() }}>
            <FontAwesomeIcon icon={["fas", "ellipsis-v"]} style={{ marginRight: "1rem" }} />
            <span>MENU</span>
          </Button>
          <Button onClick={() => { roomContext.fetchRoom() }} disabled={roomContext.roomResult?.status !== SUCCESS}>
            <FontAwesomeIcon icon={["fas", "sync"]} />
          </Button>
        </Nav>
      </Navbar.Collapse>
    </CustomNavbar>
  );
}

const CustomNavbar = styled(Navbar)`
  border: none;
  background-color: initial !important;
  padding-left: 4em;
  padding-right: 4em;
`

const Title = styled(Navbar.Brand) <ThemeProps>`
  color: ${({ theme }) => theme === "CHEEKY_WHITE" ? "black" : "white"};
  font-weight: 400;
  font-size: 2em;
`

const RoomStatus = styled.div<ThemeProps>`
  color: ${({ theme }) => theme === "CHEEKY_WHITE" ? "black" : "#DBDBDB"};
  font-size: 1.5em;
  font-weight: 600;
`

const StatusBox = styled.span`
  margin-right: 1em;
  font-weight: 400;
  text-align: center;
`

const StatusText = styled.span`
  margin: 0.5em;
  text-align: center;
  font-size: 1.2em;
`

export default Navigation;