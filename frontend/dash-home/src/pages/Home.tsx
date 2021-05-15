import React, { useState } from 'react';
import { Button, Row, Col, Spinner, Container, ModalBody, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Center, Div, P, Span } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import { Icon } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';
import { CardBase } from '../components/cards/CardBase';
import { Controller, ControllersResult, fetchControllers } from '../remote-go/Controller';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { ControllerUI } from '../components/controller/Controller';
import { MiniPanel } from '../components/cards/MiniPanel';
import DeleteController from './DeleteController';

interface Props extends RouteComponentProps<{ id: string }> { }

const Home: React.FC<Props> = props => {
  const { t } = useTranslation();
  const id = props.match.params.id;
  const history = useHistory();

  // useStateで状態の保存場所を定義する。 参考：(https://ja.reactjs.org/docs/hooks-state.html)
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);
  const [deleteQueue, setDeleteQueue] = React.useState<Controller | undefined>(undefined);
  const [anger, setAnger] = useState<boolean>(false);

  // useEffectでコンポーネントのレンダリング後にfetchControllersを叩いてAPIから取得する。 参考：(https://ja.reactjs.org/docs/hooks-effect.html)
  // 第2引数に空の配列を渡してあげることで、stateが更新されてもレンダリングが走らないようにする。 (無限ループ対策)
  const fetch = () => {
    fetchControllers(setControllers);
  }

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <Basement>
      <Container fluid>
        {controllersResult?.error ?
          <NotifyError title={t("controller.error.fetchControllers")} />
          :
          !controllersResult?.controllers ?
            <Div>
              <CustomSpinner animation="border" aria-hidden="true" />
              <Span>{t("status.loading")}</Span>
            </Div>
            :
            <>
              {/* Pop-up Controller*/}
              {id &&
                <Modal
                  size="xl"
                  show={true}
                  backdrop="static"
                  variant="dark"
                  animation={true}
                  centered
                  style={{ border: "none" }}
                  onHide={() => history.push('/')}
                >
                  <ModalBody as={Div} style={{ padding: "0" }}>
                    <ControllerUI id={id} />
                  </ModalBody>
                </Modal>
              }

              {/* When controlles is empty */}
              {Object.values(controllersResult.controllers).length === 0 &&
                <Center>
                  <CardBase
                    color="#2A2A2A"
                  >
                    <div>
                      {anger ?
                        <Span>
                          <Icon style={{ color: "#FF5555", fontSize: "8rem" }} icon={["fas", "angry"]} className="shake" onClick={() => setAnger(true)}></Icon>
                          <P style={{ fontSize: "2rem", fontWeight: 900 }}>{t("controller.secret.title")}</P>
                          <P style={{ fontSize: "1rem", textTransform: "initial" }}>{t("controller.secret.description")}</P>
                        </Span>
                        :
                        <Span>
                          <Icon style={{ fontSize: "4rem" }} icon={["fas", "sad-tear"]} onClick={() => setAnger(true)}></Icon>
                          <P style={{ fontSize: "1.5rem" }}>{t("controller.empty.title")}</P>
                          <P style={{ fontSize: "1rem", textTransform: "initial" }}>{t("controller.empty.description")}</P>
                        </Span>
                      }
                    </div>
                    <Div>
                      <LinkContainer exact to="/controllers/new">
                        <Button>{t("controller.empty.create")}</Button>
                      </LinkContainer>
                    </Div>
                  </CardBase>
                </Center>
              }

              {/* Delete Controller Modal */}
              {deleteQueue &&
                <DeleteController
                  controller={deleteQueue}
                  handleClose={() => setDeleteQueue(undefined)}
                  whenSuccess={() => fetch()}
                  visible={deleteQueue != null}
                />
              }

              {/* Show Controllers */}
              <Row xs={1} sm={1} md={2} lg={3} noGutters>
                {Object.values(controllersResult.controllers!).map((c: Controller) => {
                  return (
                    <Col sm key={c.id} style={{ maxWidth: "28rem", backgroundColor: "initial", padding: "0.5rem", border: "0" }}>
                      <MiniPanel id={c.id} controller={c} onDelete={() => setDeleteQueue(c)} />
                    </Col>
                  );
                })}
              </Row>
            </>
        }
      </Container>
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Home;