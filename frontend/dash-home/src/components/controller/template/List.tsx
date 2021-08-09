import * as React from 'react';
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';
import { ValueSet } from './TplBase';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
}

const List: React.FC<Props> = props => {
  const { t } = useTranslation();
  const onClick = (e: string) => {
    if (props.onClick) {
      props.onClick(e);
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
                  {props.title ? props.title :
                    props.shot ? props.description :
                      props.i18nKey ?
                        t([`${props.i18nKey}.${props.status}`, '_'], { value: props.status })
                        :
                        props.status
                  }
                </Span>
              </H1>
            </Col>
          </Row>
          <Row>
            <Col>
              <P>
                <Span>{!props.shot && props.description}</Span>
              </P>
            </Col>
          </Row>
        </span>
      }
      <Row>
        <Col className="d-block d-sm-none">
          <DropdownButton
            title={
              props.i18nKey ?
                t([`${props.i18nKey}.${props.status}`, '_'], { value: props.status })
                :
                props.status
            }
            size="lg"
            drop="right">
            {props.values.map((e) => {
              return (
                <Dropdown.Item
                  key={e.value}
                  onClick={() => onClick(e.value)}
                  active={!props.shot && e.value === props.status}
                >
                  {e.displayComponent ? e.displayComponent :
                    t([`${props.i18nKey}.${e.value}`, '_'], { value: e.value })
                  }
                </Dropdown.Item>
              )
            })}
          </DropdownButton>
        </Col>
        <SlideContents className="d-none d-sm-inline-flex">
          <ButtonGroup>
            {props.values.map((e) => {
              return (
                <Button
                  type="radio"
                  size="lg"
                  key={e.value}
                  variant={(props.shot || e.value === props.status) ? "primary" : ""}
                  onClick={() => onClick(e.value)}
                >
                  {e.displayComponent ? e.displayComponent :
                    t([`${props.i18nKey}.${e.value}`, '_'], { value: e.value })
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

const SlideContents = styled(Col)`
    overflow-x: auto;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    word-break: keep-all;
`

const Span = styled.span`
    display: inline-block;
`

export default List;