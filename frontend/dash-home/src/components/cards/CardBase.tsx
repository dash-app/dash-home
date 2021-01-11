import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Span } from '../atoms/Core';

interface Props {
  color: string,
  title?: string,
  icon?: IconProp,
  send?: boolean,
  children: React.ReactNode,
}

export const CardBase = (props: Props) => {
  return (
    <div
      style={{
        borderColor: props.color,
        boxShadow: `0.1px 0px 2px 1.5px ${props.color}`,
        border: `1px solid ${props.color}`,
        backgroundColor: "initial"
      }}
    >
      <Header>
        <Row>
          <Col>
            {props.icon &&
              <Icon icon={props.icon} style={{ color: props.color }} />
            }
            {props.title &&
              <Span style={{ color: props.color, verticalAlign: "initial" }}>{props.title}</Span>
            }
          </Col>
          {props.send &&
            <Col style={{ textAlign: "right" }}>
              <Icon icon={["fas", "wifi"]} style={{ color: props.color }} />
            </Col>
          }
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
  border: none;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  margin-left: 4px;
  margin-right: 4px;
`