import * as React from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';

interface Props {
  hideTitle?: boolean,
  title?: any,
  description?: string,
  value: number,
  step: number,
  from: number,
  to: number,
  prefix?: string,
  suffix?: string,
  onClick?: any,
}

const Range: React.FC<Props> = props => {
  const onIncrementEvent = () => {
    if (props.onClick) {
      props.onClick(props.value + props.step);
    }
  }

  const onDecrementEvent = () => {
    if (props.onClick) {
      props.onClick(props.value - props.step);
    }
  }

  return (
    <>
      {!props.hideTitle &&
        <span>
          <Row>
            <Col>
              <H1>
                <Span style={{ whiteSpace: "nowrap" }}>
                  {props.title && props.title}
                  {props.value.toFixed((() => {
                    const e = String(props.step).split('.')
                    return e.length !== 1 ? e[e.length - 1].length : 0
                  })())}
                  {props.suffix && <span style={{ fontSize: "0.5em", fontWeight: 400 }}>{props.suffix}</span>}
                </Span>
              </H1>
            </Col>
          </Row>
          <Row>
            <Col>
              <P>
                <Span>{props.description}</Span>
              </P>
            </Col>
          </Row>
        </span>
      }
      <Row>
        <Col>
          <ButtonGroup>
            <Button
              type="button"
              size="lg"
              onClick={onDecrementEvent}
              disabled={props.value <= props.from}
            >
              <Icon icon={["fas", "chevron-down"]} />
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={onIncrementEvent}
              disabled={props.value >= props.to}
            >
              <Icon icon={["fas", "chevron-up"]} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  )
}

const Span = styled.span`
  display: inline-block;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  margin-left: 4px;
  margin-right: 4px;
`

export default Range