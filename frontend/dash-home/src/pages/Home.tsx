import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Basement from '../components/basements/Basement';
import { ControllersResult, fetchControllers, Controller } from '../remote-go/Controller';

interface Props {}

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
        {/* controllersResultが正常な値の場合のみ処理を行う */}
        {controllersResult?.error == null && !controllersResult?.controllers ?
          <p>hoge</p> :
          <div>
            {Object.values(controllersResult.controllers!).map((controller: Controller) =>
              <div>
                {/* 画面上に取得したデータを出力する。(デバッグ) */}
                <p>{controller.name}</p>
              </div>
            )}
          </div>
        }
      </Container>
    </Basement>
  )
}

export default Home;