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
interface State {
  value: number,
}

class Range extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: this.props.value,
    }
  }

  onIncrementEvent = () => {
    this.setState({
      value: this.state.value + this.props.step,
    })
    if (this.props.onClick) {
      this.props.onClick(this.state.value + this.props.step);
    }
  }

  onDecrementEvent = () => {
    this.setState({
      value: this.state.value - this.props.step,
    })
    if (this.props.onClick) {
      this.props.onClick(this.state.value - this.props.step);
    }
  }

  render() {
    return (
      <>
        {!this.props.hideTitle &&
          <span>
            <Row>
              <Col>
                <H1>
                  <Span>
                    {this.props.title && this.props.title}
                    {this.state.value.toFixed((() => {
                      const e = String(this.props.step).split('.')
                      return e.length !== 1 ? e[e.length - 1].length : 0
                    })())}
                    {this.props.suffix && <span style={{ fontSize: "0.5em", fontWeight: 400 }}>{this.props.suffix}</span>}
                  </Span>
                </H1>
              </Col>
            </Row>
            <Row>
              <Col>
                <P>
                  <Span>{this.props.description}</Span>
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
                onClick={this.onDecrementEvent}
                disabled={this.state.value <= this.props.from}
              >
                <Icon icon={["fas", "chevron-down"]} />
              </Button>
              <Button
                type="button"
                size="lg"
                onClick={this.onIncrementEvent}
                disabled={this.state.value >= this.props.to}
              >
                <Icon icon={["fas", "chevron-up"]} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </>
    )
  }
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