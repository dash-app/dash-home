import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import Toggle from '../components/controller/Toggle';
import Range from '../components/controller/Range';
import List from '../components/controller/List';
import Shot from '../components/controller/Shot';
import { H1 } from '../components/atoms/Core';

interface Props { }
interface State { }

class Sandbox extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <H1>Sandboxx</H1>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Toggle description="Operation" value={false} icon={["fas", "power-off"]} />
          </Col>
          <Col>
            <Range description="TEMP" value={20} step={0.5} from={16.0} to={31.0} suffix="℃" />
          </Col>
          <Col>
            <List description="List" values={["auto", "1", "2", "3", "4", "5"]} status={"auto"} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Shot description="Shot" default="test" value="hoge" />
          </Col>
        </Row>
      </div>
    );
  }
};

export default Sandbox;