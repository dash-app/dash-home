import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppCard from '../components/cards/AppCard';
import styled from 'styled-components';

interface Props {}
interface State {}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Home are here.</h1>
        {/* Cards.... */}
          <Row>
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