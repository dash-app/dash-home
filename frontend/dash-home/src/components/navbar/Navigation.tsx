import { Navbar, Row, Col, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as React from 'react';
import styled from 'styled-components';

import ThemeSwitcher from '../themes/ThemeSwitcher';

interface Props {
  theme: string,
  roomName: any,
  // temp: number,
  // humid: number,
}
interface State { }

class Navigation extends React.Component<Props, State> {
  render() {
    return (
      <CustomNavbar
        bg={this.props.theme === "CHEEKY_WHITE" ? "light" : "primary"}
        variant={this.props.theme === "CHEEKY_WHITE" ? "light" : "dark"}
        theme={this.props.theme}
        expand="lg"
      >
        <Row>
          <BarCol>
            <Title>
              <FontAwesomeIcon icon={["fas", "home"]} />
              <span style={{ margin: "0.5em" }}><span>Test House</span><span style={{ fontSize: "0.5em" }}> // Bedroom</span></span>
            </Title>
            <RoomStatus theme={this.props.theme}>
              <StatusBox>
                <FontAwesomeIcon icon={["fas", "thermometer-three-quarters"]} />
                <StatusText>25.5℃</StatusText>
              </StatusBox>
              <StatusBox>
                <FontAwesomeIcon icon={["fas", "tint"]} />
                <StatusText>40%</StatusText>
              </StatusBox>
            </RoomStatus>
          </BarCol>
        </Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <ThemeSwitcher />
          </Nav>
        </Navbar.Collapse>
      </CustomNavbar>
    );
  }
};

const CustomNavbar = styled(Navbar)`
  border: none;
  // background-color: initial !important;
`

const BarCol = styled(Col)`
  // padding-left: 4em;
  // padding-right: 4em;
`

const Title = styled(Navbar.Brand)`
  color: ${props => props.theme === "CHEEKY_WHITE" ? "black" : "white"};
  font-family: "M PLUS 1p";
  font-weight: 400;
  font-size: 2em;
`

const RoomStatus = styled.div`
  color: ${props => props.theme === "CHEEKY_WHITE" ? "black" : "#DBDBDB"};
  font-size: 1.5em;
  font-family: "M PLUS 1p";
  font-weight: 600;
`

const StatusBox = styled.span`
  margin-right: 1em;
  font-weight: 400;
  font-align: center;
`

const StatusText = styled.span`
  margin: 0.5em;
  text-align: center;
  font-size: 1.2em;
`

export default Navigation;