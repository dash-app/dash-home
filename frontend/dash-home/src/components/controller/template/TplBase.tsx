import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';

interface Props {
  title?: string,
  description?: string,
  children?: React.ReactNode,
}

export interface ValueSet {
  value: any,
  displayComponent: any,
}

export const TplBase: React.FC<Props> = props => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <H1>{props.title && props.title}</H1>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{props.description && props.description}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}