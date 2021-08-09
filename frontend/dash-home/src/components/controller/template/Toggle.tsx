import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  hideTitle?: boolean,
  description?: string,
  i18nKey?: string,
  value: boolean,
  icon?: IconProp,
  btnText?: string,
  onClick?: any,
}

const Toggle: React.FC<Props> = props => {
  const { t } = useTranslation();
  const onToggleEvent = () => {
    if (props.onClick) {
      props.onClick(!props.value);
    }
  }

  return (
    <>
      {!props.hideTitle &&
        <span>
          <Row>
            <Col>
              <H1>
                <Span style={{ whiteSpace: "nowrap" }}>{
                  props.value ?
                    props.i18nKey ? t([`${props.i18nKey}.on`, '_'], { value: "on" }) : "on"
                    :
                    props.i18nKey ? t([`${props.i18nKey}.off`, '_'], { value: "off" }) : "off"
                }</Span>
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
          {(props.icon || props.btnText) &&
            <Button
              type="button"
              size="lg"
              onClick={onToggleEvent}
            >
              {props.icon && <Icon icon={props.icon} />}
              {props.btnText}
            </Button>
          }
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

export default Toggle;