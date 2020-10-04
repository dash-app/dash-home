import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

interface AirconProps {
  name: string,
  mode: string,
  send: boolean,
  children: React.ReactNode,
}

const AirconCard = (props: AirconProps) => {
  let modeColor: string = "#5A5A5A"; // #0088FF
  switch (props.mode) {
    case "auto":
      modeColor = "#5A5A5A";
      break;
    case "cool":
      modeColor = "#0088FF";
      break;
    case "dry":
      modeColor = "#00AA00";
      break;
    case "heat":
      modeColor = "#FF5500";
      break;
  }
  return (
    <div
      style={{
        borderColor: modeColor,
        boxShadow: `0.1px 0px 2px 1.5px ${modeColor}`,
        border: `1px solid ${modeColor}`
      }}
    >
      <Header>
        <Row>
          <Col>
            <Icon icon={["fas", "fan"]} style={{ color: modeColor }} />
            {/* <CardTitle>{props.name}</CardTitle> */}
          </Col>
          {props.send && <Col style={{ textAlign: "right" }}><Icon icon={["fas", "wifi"]} style={{ color: modeColor }} /></Col>}
        </Row>
      </Header>
      <Card.Body>
        {props.children}
      </Card.Body>
    </div>
  )
}

const Header = styled(Card.Header)`
  background-color: initial;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  margin-left: 4px;
  margin-right: 4px;
`

export {
  AirconCard
};