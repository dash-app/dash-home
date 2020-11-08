import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Div, Span } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import Basement from '../components/basements/Basement';
import { ControllersResult, fetchControllers, Controller } from '../remote-go/Controller';

interface Props { }

const Home: React.FC<Props> = (props: Props) => {
  // useStateで状態の保存場所を定義する。 参考：(https://ja.reactjs.org/docs/hooks-state.html)
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);

  // useEffectでコンポーネントのレンダリング後にfetchControllersを叩いてAPIから取得する。 参考：(https://ja.reactjs.org/docs/hooks-effect.html)
  // 第2引数に空の配列を渡してあげることで、stateが更新されてもレンダリングが走らないようにする。 (無限ループ対策)
  React.useEffect(() => {
    fetchControllers(setControllers);//処理に成功するとcontrollersResultに値が入る    
  }, []);

  return (
    <Basement>
      <Container fluid="lg">
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
              {/* TODO: Implement here... */}
            </Div>
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