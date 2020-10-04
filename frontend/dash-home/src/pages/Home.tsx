import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AppCard from '../components/cards/AppCard';
import { Button } from '../components/atoms/Themed';

interface Props {
  ctrl: any,
}
interface State { }

class Home extends React.Component<Props, State> {
  render() {
    console.debug(this.props.ctrl)
    return (
      <div>
        {/* Cards.... */}
        <Row>
          <Col lg="3">
            {/* <div>{this.props.ctrl}</div> */}
            <Link to="/about">
              <Button>About</Button>
            </Link>
          </Col>
          {/* TODO: カードの上下幅が項目数でかわってしまうので固定長にするべき。 */}
          <Col lg="3">
            <AppCard type="AIRCON" />
          </Col>
          <Col lg="3">
            <AppCard type="LIGHT" />
          </Col>
          <Col lg="3">
            <AppCard type="LIGHT" />
          </Col>
          <Col lg="3">
            <AppCard type="UNKNOWN" />
          </Col>
        </Row>
      </div>
    );
  }
};

export default Home;