import * as React from 'react';

// Navbar
import Navigation from '../navbar/Navigation';
import { ThemeContext } from '../themes/ThemeProvider';
import { RoomContext } from './RoomProvider';
import { NotifyError } from '../atoms/Notify';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeSwitcher from '../themes/ThemeSwitcher';
import { RELEASE_VERSION } from '../../config';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuTitle, ThemedModal } from '../atoms/Themed';

interface Props {
  children: React.ReactNode,
}

const Basement: React.FC<Props> = props => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [otaku, setOtaku] = React.useState<boolean>(false);
  const [otakuCount, setOtakuCount] = React.useState<number>(0);
  React.useEffect(() => {
    if (otakuCount >= 10) {
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
                <ThemedModal
                  size="lg"
                  show={showMenu}
                  onHide={() => setShowMenu(false)}
                  // backdrop="static"
                  variant="dark"
                  animate={false}
                // centered={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <Icon icon={["fas", "terminal"]} />
                      {"Home"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container fluid>
                      {/* Main Menu */}
                      <MenuTitle><Icon icon={["fas", "ellipsis-h"]} />{t("menu.main.title")}</MenuTitle>
                      <CustomRow>
                        <Col>
                          <LinkContainer exact to={"/"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "home"]} />
                              <p>{t("menu.main.home")}</p>
                            </Button>
                          </LinkContainer>
                        </Col>
                      </CustomRow>
                      <CustomRow>
                        <Col>
                          <LinkContainer exact to={"/controllers"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "wifi"]} />
                              <p>{t("menu.main.controllers")}</p>
                            </Button>
                          </LinkContainer>
                        </Col>
                        <Col>
                          <LinkContainer to={"/agent"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "link"]} />
                              <p>{t("menu.main.agents")}</p>
                            </Button>
                          </LinkContainer>
                        </Col> 
                        {/* TODO: Implements */}
                        {/* <Col>
                          <LinkContainer to={"/settings"}>
                            <Button size="lg" block>
                              <FontAwesomeIcon icon={["fas", "cog"]} />
                              <p>Settings</p>
                            </Button>
                          </LinkContainer>
                        </Col> */}
                      </CustomRow>
                      <hr />
                      <CustomRow>
                        {/* + */}
                        <Col sm style={{ marginTop: "1rem" }}>
                          <MenuTitle><Icon icon={["fas", "server"]} />{t("menu.environment.title")}</MenuTitle>
                          <EnvStatus>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "thermometer-three-quarters"]} />
                            <span>{roomResult?.room?.ambient.temp.toFixed(1)}</span>
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>℃</span>
                          </EnvStatus>
                          <EnvStatus>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "tint"]} />
                            <span>{roomResult?.room?.ambient.humid.toFixed(0)}</span>
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>%</span>
                          </EnvStatus>
                          <EnvStatus>
                            <Icon fixedWidth style={{ fontSize: "1.5rem" }} icon={["fas", "wind"]} />
                            <span>{roomResult?.room?.ambient.pressure.toFixed(1)}</span>
                            <span style={{ marginLeft: "0.2rem", fontSize: "1rem" }}>hPa</span>
                          </EnvStatus>
                        </Col>
                        <Col sm style={{ marginTop: "1rem" }}>
                          <MenuTitle onClick={() => { setOtakuCount(otakuCount + 1) }}><Icon icon={["fas", "swatchbook"]} />{t("menu.theme.title")}</MenuTitle>
                          <ThemeSwitcher otaku={otaku} />
                        </Col>
                      </CustomRow>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <p>Version: {RELEASE_VERSION}</p>
                  </Modal.Footer>
                </ThemedModal>
                {props.children}
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

const EnvStatus = styled(Col)`
  padding-left: 0;
  font-size: 2rem;
`

export default Basement;