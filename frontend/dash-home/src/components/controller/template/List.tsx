import * as React from 'react';
import { ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';
import { Button } from '../../atoms/Themed';
import { ValueSet } from './TplBase';

import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

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

  render() {
    return (
      <>
        {!this.props.hideTitle &&
          <span>
            <Row>
              <Col>
                <H1>
                  <Span>
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
            <DropdownButton
              title={
                this.props.i18nKey ?
                  this.props.t([`${this.props.i18nKey}.${this.state.status}`, '_'], { value: this.state.status })
                  :
                  this.state.status
              }
              size="lg"
              drop="right">
              {this.props.values.map((e) => {
                return (
                  <Dropdown.Item
                    key={e.value}
                    onClick={() => this.onClick(e.value)}
                    active={!this.props.shot && e.value === this.state.status}
                  >
                    {e.displayComponent ? e.displayComponent :
                      this.props.t([`${this.props.i18nKey}.${e.value}`, '_'], { value: e.value })
                    }
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </Col>
          <SlideContents className="d-none d-sm-inline-flex">
            <ButtonGroup>
              {this.props.values.map((e) => {
                return (
                  <Button
                    type="radio"
                    size="lg"
                    key={e.value}
                    selected={this.props.shot ? true : e.value === this.state.status}
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
    word-break: keep-all;
`

const Span = styled.span`
    display: inline-block;
`

export default withTranslation()(List);