import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

interface Props {
  hideTitle?: boolean,
  description?: string,
  i18nKey?: string,
  value: boolean,
  icon?: IconProp,
  btnText?: string,
  onClick?: any,
  t: any
}

interface State {
  value: boolean,
}

class Toggle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: this.props.value,
    }
  }

  onToggleEvent = () => {
    this.setState({
      value: !this.state.value,
    })
    if (this.props.onClick) {
      this.props.onClick(!this.state.value);
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
                  <Span style={{ whiteSpace: "nowrap" }}>{
                    this.state.value ?
                      this.props.i18nKey ? this.props.t([`${this.props.i18nKey}.on`, '_'], { value: "on" }) : "on"
                      :
                      this.props.i18nKey ? this.props.t([`${this.props.i18nKey}.off`, '_'], { value: "off" }) : "off"
                  }</Span>
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
            {(this.props.icon || this.props.btnText) &&
              <Button
                type="button"
                size="lg"
                onClick={this.onToggleEvent}
              >
                {this.props.icon && <Icon icon={this.props.icon} />}
                {this.props.btnText}
              </Button>
            }
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

export default withTranslation()(Toggle);