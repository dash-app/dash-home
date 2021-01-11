import * as React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface Props {
  color: string,
  icon?: React.ReactNode,
  title?: string,
  send?: boolean,
  children: React.ReactNode,
}

export const CardBase = (props: Props) => {
  return (
    <div
      style={{
        borderColor: props.color,
        boxShadow: `0px 0px 2px 0.75px ${props.color}`,
        border: `1px solid ${props.color}`,
        backgroundColor: "initial"
      }}
    >
      <Header style={{ color: props.color }}>
        <Row>
          <Col style={{verticalAlign: "middle"}}>
            {props.icon &&
              <IconWrapper>
                {props.icon}
              </IconWrapper>
            }
            {props.title &&
              <span style={{fontSize: "1rem"}}>
                {props.title}
              </span>
            }
          </Col>
          {props.send &&
            <Col style={{ textAlign: "right" }}>
              <IconWrapper>
                <FontAwesomeIcon icon={["fas", "wifi"]} />
              </IconWrapper>
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
  font-size: 2em;
`

const IconWrapper = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`