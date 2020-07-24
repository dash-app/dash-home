import { Container, Navbar, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as React from 'react';
import styled from 'styled-components';

interface Props { }
interface State { }

const THEME_COLOR = {
  statusBox: {
    "foreground": "#000000"
  }
}

class Navigation extends React.Component<Props, State> {
  render() {
    // TODO: Switch later
    let THEME: string = "CHEEKY_WHITE";

    if (THEME === "CHEEKY_WHITE") {

      return (
        <Navbar bg="light" variant="light">
          <Row>
            <BarCol>
              <Title>
                <FontAwesomeIcon icon={["fas", "home"]} />
                <span style={{ margin: "0.5em" }}>太郎さんのおうち / 寝室</span>
              </Title>
              <RoomStatus>
                <StatusBox>
                  <FontAwesomeIcon icon={["fas", "thermometer-three-quarters"]} />
                  <StatusText>25.5℃</StatusText>
                </StatusBox>
                <StatusBox>
                  <FontAwesomeIcon icon={["fas", "tint"]} />
                  <StatusText>70%</StatusText>
                </StatusBox>
              </RoomStatus>
            </BarCol>
          </Row>
        </Navbar>
      );
    }
  }
};

const BarCol = styled(Col)`
  padding-left: 4em;
  padding-right: 4em;
`

const Title = styled(Navbar.Brand)`
  font-family: "M PLUS 1p";
  font-weight: 400;
  font-size: 2em;
`

const RoomStatus = styled.div`
  color: ${THEME_COLOR.statusBox.foreground};
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