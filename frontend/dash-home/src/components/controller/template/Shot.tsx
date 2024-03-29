import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

interface Props {
  hideTitle?: boolean,
  description?: string,
  i18nKey?: string,
  default: string,
  onClick?: any,
  value: string,
  t: any
}

class Shot extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentValue: props.value,
    }
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    return (
      <>
        {!this.props.hideTitle &&
          <>
            <div>
              <H1 style={{ whiteSpace: "nowrap" }}>
                <Span>{this.props.default}</Span>
              </H1>
              <H1 style={{ whiteSpace: "nowrap" }}>
                <Span>{this.props.value}</Span>
              </H1>
            </div>
            <Row>
              <Col>
                <P>
                  <Span>{this.props.description}</Span>
                </P>
              </Col>
            </Row>
          </>
        }
        <Button
          type="button"
          size="lg"
          onClick={() => this.onClick()}
        >
          {this.props.i18nKey ? this.props.t([`${this.props.i18nKey}.${this.props.value}`, '_'], { value: this.props.value }) : this.props.value}
        </Button>
      </>
    )
  }
}

const Span = styled.span`
  display: inline-block;
`

export default withTranslation()(Shot);