import React, { useState } from 'react';
import { Card, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Center, Div, P, Span } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import { Button, Container, Icon } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';
import { CardBase } from '../components/cards/CardBase';
import { SummonMiniPanel } from '../components/controller/SummonPanel';
import { Controller, ControllersResult, fetchControllers } from '../remote-go/Controller';

interface Props { }

const Home: React.FC<Props> = () => {
  const { t } = useTranslation();

  // useStateで状態の保存場所を定義する。 参考：(https://ja.reactjs.org/docs/hooks-state.html)
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);
  const [anger, setAnger] = useState<boolean>(false);

  // useEffectでコンポーネントのレンダリング後にfetchControllersを叩いてAPIから取得する。 参考：(https://ja.reactjs.org/docs/hooks-effect.html)
  // 第2引数に空の配列を渡してあげることで、stateが更新されてもレンダリングが走らないようにする。 (無限ループ対策)
  React.useEffect(() => {
    fetchControllers(setControllers);//処理に成功するとcontrollersResultに値が入る    
  }, []);

  return (
    <Basement>
      {controllersResult?.error ?
        <NotifyError title="Failed fetch controllers" />
        :
        !controllersResult?.controllers ?
          <Div>
            <CustomSpinner animation="border" aria-hidden="true" />
            <Span>{t("status.loading")}</Span>
          </Div>
          :
          <Container fluid>
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
                    <Link to="/controllers/new">
                      <Button>{t("controller.empty.create")}</Button>
                    </Link>
                  </Div>
                </CardBase>
              </Center>
            }

            {/* Show Controllers */}
            <Row>
              {Object.values(controllersResult.controllers!).map((c: Controller) => {
                return (
                  <Card style={{ minWidth: "18rem", backgroundColor: "initial", margin: "0.5rem" }}>
                    <SummonMiniPanel {...c} />
                  </Card>
                );
              })}
            </Row>
          </Container>
      }
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Home;