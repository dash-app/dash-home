import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  hideTitle?: boolean,
  description?: string,
  i18nKey?: string,
  default: string,
  onClick?: any,
  value: string,
}

const Shot: React.FC<Props> = props => {
  const { t } = useTranslation();
  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.value);
    }
  }

  return (
    <>
      {!props.hideTitle &&
        <>
          <div>
            <H1 style={{ whiteSpace: "nowrap" }}>
              <Span>{props.default}</Span>
            </H1>
            <H1 style={{ whiteSpace: "nowrap" }}>
              <Span>{props.value}</Span>
            </H1>
          </div>
          <Row>
            <Col>
              <P>
                <Span>{props.description}</Span>
              </P>
            </Col>
          </Row>
        </>
      }
      <Button
        type="button"
        size="lg"
        onClick={() => onClick()}
      >
        {props.i18nKey ? t([`${props.i18nKey}.${props.value}`, '_'], { value: props.value }) : props.value}
      </Button>
    </>
  )

}

const Span = styled.span`
  display: inline-block;
`

export default Shot;