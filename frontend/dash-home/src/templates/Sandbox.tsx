import * as React from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';

import Name from '../components/test/Name';
import styled from 'styled-components';

import Toggle from '../components/controller/Toggle';

interface Props { }
interface State { }

class Sandbox extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Sandboxx</h1>
        <Row xs={2} md={4} lg={6}>
          <Col>
            <Toggle />
          </Col>
          <Col>
            <Toggle title="TEST" />
          </Col>
          <Col>
            <Toggle title="TEST" description="hoge" />
          </Col>
          <Col>
            <Toggle title="TEST" description="hoge" btnText="something"/>
          </Col>
          <Col>
            <Toggle title="TEST" description="hoge" icon={["fas", "power-off"]}/>
          </Col>
          <Col>
            <Toggle title="TEST" description="hoge" btnText="Power" icon={["fas", "power-off"]} onClick={() => {

            }}/>
          </Col>
        </Row>
      </div>
    );
  }
};

const CustomBase = styled.div`
margin: 0px;
padding: 0px;
`
const CustomContainer = styled.div`
margin: 0px;
padding: 0px;
display: table-cell;
text-align: center;
vertical-aligin: middle;
`
const CustomTitle = styled.label`
margin: 0px;
padding: 0px;
font-size: 4em;
text-align: center;
display: table;
background-color: #87CEFA;
`
const CustomName = styled.div`
margin: 0px;
padding: 0px;
font-size: 2em;
display: table;
background-color: #90EE90;
`
const CustomButton = styled(Button)`
padding: 25px 10px;
font-size: 32px;
color: #000000;
background-color: #FFFFFF;
border: 1px solid #000000;
border-radius:5px;
box-shadow: 1px 1px;
`
export default Sandbox;