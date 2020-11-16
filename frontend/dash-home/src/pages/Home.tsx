import React, { useState } from 'react';
import { Card, CardColumns, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Center, Div, H1, P, Span } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import { Button, Icon } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';
import { CardBase } from '../components/cards/CardBase';
import SummonPanel from '../components/controller/SummonPanel';
import { Controller, ControllersResult, fetchControllers } from '../remote-go/Controller';

interface Props { }

const Home: React.FC<Props> = () => {
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
            <Span>Loading...</Span>
          </Div>
          :
          <Div>
            {/* When controlles is empty */}
            {Object.values(controllersResult.controllers).length == 0 &&
              <Center>
                <CardBase
                  color="#2A2A2A"
                >
                  <div>
                    {anger ?
                      <Span>
                        <Icon style={{ color: "#FF5555", fontSize: "8rem" }} icon={["fas", "angry"]} className="shake" onClick={() => setAnger(true)}></Icon>
                        <P style={{ fontSize: "2rem", fontWeight: 900 }}>Hey!!!</P>
                        <P style={{ fontSize: "1rem", textTransform: "initial" }}>DO NOT PUNCH ME!</P>
                      </Span>
                      :
                      <Span>
                        <Icon style={{ fontSize: "4rem" }} icon={["fas", "sad-tear"]} onClick={() => setAnger(true)}></Icon>
                        <P style={{ fontSize: "1.5rem" }}>Hello?</P>
                        <P style={{ fontSize: "1rem", textTransform: "initial" }}>There is no any controllers.</P>
                      </Span>
                    }
                  </div>
                  <Div>
                    <Link to="/controllers/new">
                      <Button>Add New Controller</Button>
                    </Link>
                  </Div>
                </CardBase>
              </Center>
            }

            {/* Show Controllers */}
            <CardColumns>
              {Object.values(controllersResult.controllers!).map((c: Controller) => {
                return (
                  <Card style={{ backgroundColor: "initial" }}>
                    <SummonPanel controller={c} />
                  </Card>
                );
              })}
            </CardColumns>
          </Div>
      }
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Home;