import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Card, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Container } from '../atoms/Themed';

interface AirconProps {
  mode: string,
  children: React.ReactNode,
}

const AirconCard = (props: AirconProps) => {
  console.log(props.mode);
  return (
    <Base>
      <Card.Body>
        <Card.Title>
          <Icon icon={["fas", "fan"]} style={{ color: "#0088FF" }} />
        </Card.Title>
        {props.children}
      </Card.Body>
    </Base>
  )
}

const Base = styled.div`
  border-color: #0088FF;
  box-shadow: 0.1px 0px 2px 0.5px #0088FF;
  border: 1px solid #0088FF;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin-left: 4px;
  margin-right: 4px;
`

export {
  AirconCard
};