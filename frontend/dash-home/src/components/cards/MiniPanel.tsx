import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Div, P, Span } from '../atoms/Core';
import { Button } from '../atoms/Themed';

interface Props {
  id?: string,
  title: string,
  note?: string,
  description?: string,
}

export const MiniPanelInner = (props: Props) => {
  return (
    <Div style={{minWidth: "22rem"}}>
      <Title>{props.title} {props.note && <Note>{"//"} {props.note}</Note>}</Title>
      <Description>{props.description && props.description}</Description>
      {props.id && <Link to={`/controllers/${props.id}`}><Button>Click to Edit</Button></Link>}
    </Div>
  )
}

const Note = styled(Span)`
  font-size: 1rem;
  font-weight: 100;
  line-height: 1;
  margin-left: 0.2rem;
  word-wrap: keep-all;
  white-space: nowrap;
`

const Title = styled(P)`
  font-weight: 200;
  font-size: 4.5rem;
  margin: 0px;
  text-transform: uppercase;
  line-height: 1;
  word-wrap: keep-all;
`

const Description = styled(P)`
  font-weight: 100;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding-top: 0.5rem;
`