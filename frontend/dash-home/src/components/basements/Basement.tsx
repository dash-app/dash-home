import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { Button } from '../atoms/Themed';
import { ThemeContext } from '../themes/ThemeProvider';
import { RoomContext } from './RoomProvider';
import { NotifyError } from '../atoms/Notify';
import { Link, Redirect } from 'react-router-dom';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeSwitcher from '../themes/ThemeSwitcher';
import { RELEASE_VERSION } from '../../config';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode,
}

const Basement: React.FC<Props> = props => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [otaku, setOtaku] = React.useState<boolean>(false);
  const [otakuCount, setOtakuCount] = React.useState<number>(0);
  React.useEffect(() => {
    console.log("Combo!")
    if (otakuCount >= 10) {
      console.log("OTAKU!")
      setOtaku(true);
    }
  }, [otakuCount])

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <RoomContext.Consumer>
          {(roomResult) => {
            return (
              <>
                <Navigation menuHandler={() => setShowMenu(true)} />
                {roomResult?.error != null && (
                  roomResult.error.data["code"] === "ROOM_NOT_FOUND" ?
                    <Redirect to={"/room/setup"} />
                    :
                    <NotifyError title="Failed fetch room data" />
                )}
                <Modal
                  size="lg"
                  show={showMenu}
                  onHide={() => setShowMenu(false)}
                  // backdrop="static"
                  variant="dark"
                  // centered={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <Icon icon={["fas", "terminal"]} />MENU
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      {/* Main Menu */}
                      <p><Icon icon={["fas", "ellipsis-h"]} />{"Main Menu"}</p>
                      <CustomRow>
                        <Col>
                          <Link to={"/"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "home"]} />
                              <p>Home</p>
                            </Button>
                          </Link>
                        </Col>
                      </CustomRow>
                      <CustomRow>
                        <Col>
                          <Link to={"/controllers"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "wifi"]} />
                              <p>Controllers</p>
                            </Button>
                          </Link>
                        </Col>
                        {/* TODO: Implements */}
                        {/* <Col>
                          <Link to={"/settings"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "cog"]} />
                              <p>Settings</p>
                            </Button>
                          </Link>
                        </Col> */}
                      </CustomRow>
                      <hr />
                      <CustomRow>
                        {/* + */}
                        <Col>
                          <p onClick={() => { setOtakuCount(otakuCount + 1) }}><Icon icon={["fas", "swatchbook"]} />{"Appearance"}</p>
                          <ThemeSwitcher otaku={otaku} />
                        </Col>
                        <Col>
                          <p><Icon icon={["fas", "server"]} />{"Environment"}</p>
                          <p style={{ fontSize: "2rem" }}>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "thermometer-three-quarters"]} />{roomResult?.room?.ambient.temp.toFixed(1)}
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>℃</span>
                          </p>
                          <p style={{ fontSize: "2rem" }}>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "tint"]} />{roomResult?.room?.ambient.humid.toFixed(0)}
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>%</span>
                          </p>
                          <p style={{ fontSize: "2rem" }}>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "wind"]} />{roomResult?.room?.ambient.pressure.toFixed(1)}
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>hPa</span>
                          </p>
                        </Col>
                      </CustomRow>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <p>Version: {RELEASE_VERSION}</p>
                  </Modal.Footer>
                </Modal>
                <Container fluid>
                  {props.children}
                </Container>
              </>
            )
          }}
        </RoomContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const CustomRow = styled(Row)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export default Basement;