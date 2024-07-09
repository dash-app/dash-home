import * as React from 'react';
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';
import { ValueSet } from './TplBase';

import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { ThemedIcon } from '../../atoms/DashIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  hideTitle?: boolean,
  title?: any,
  description?: string,
  values: ValueSet[],
  i18nKey?: string,
  status?: string,
  drop?: boolean,
  shot?: boolean,
  onClick?: any,
  t: any
}
interface State {
  status?: string,
  values: ValueSet[],
}

class List extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      values: this.props.values,
      status: this.props.status,
    }
  }

  onClick = (e: string) => {
    this.setState({
      status: e
    })
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  getIndex(elements: ValueSet[], val: string | undefined) {
    if (!val) {
      return 0;
    }

    let idx = 0;
    elements.forEach((_v, _idx) => {
      if (_v.value === val) {
        idx = _idx;
      }
    });

    return idx;
  }

  render() {
    return (
      <>
        {!this.props.hideTitle &&
          <span>
            <Row>
              <Col>
                <H1>
                  <Span style={{ whiteSpace: "nowrap" }}>
                    {this.props.title ?
                      this.props.title
                      :
                      this.props.shot ?
                        this.props.description :
                        this.props.i18nKey ?
                          this.props.t([`${this.props.i18nKey}.${this.state.status}`, '_'], { value: this.state.status })
                          :
                          this.state.status
                    }
                  </Span>
                </H1>
              </Col>
            </Row>
            <Row>
              <Col>
                <P>
                  <Span>{!this.props.shot && this.props.description}</Span>
                </P>
              </Col>
            </Row>
          </span>
        }
        <Row>
          <Col className="d-block d-sm-none">
            <Button
              size="lg"
              onClick={() => this.onClick(this.props.values[(this.getIndex(this.state.values, this.state.status) + 1) % this.state.values.length].value)}
            >
              <ThemedIcon>
                <FontAwesomeIcon style={{ marginRight: "0.25rem" }} icon={["fas", "caret-right"]} />
              </ThemedIcon>
              {this.props.i18nKey ?
                this.props.t([`${this.props.i18nKey}.${this.state.status}`, '_'], { value: this.state.status })
                :
                this.state.status}
            </Button>
          </Col>
          <SlideContents className="d-none d-sm-inline-flex">
            <ButtonGroup>
              {this.props.values.map((e) => {
                return (
                  <Button
                    type="radio"
                    size="lg"
                    key={e.value}
                    variant={(this.props.shot || e.value === this.state.status) ? "primary" : ""}
                    onClick={() => this.onClick(e.value)}
                  >
                    {e.displayComponent ? e.displayComponent :
                      this.props.t([`${this.props.i18nKey}.${e.value}`, '_'], { value: e.value })
                    }
                  </Button>
                )
              })}
            </ButtonGroup>
          </SlideContents>
        </Row>
      </>
    )
  }
}

const SlideContents = styled(Col)`
    overflow-x: auto;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    word-break: keep-all;
`

const Span = styled.span`
    display: inline-block;
`

export default withTranslation()(List);