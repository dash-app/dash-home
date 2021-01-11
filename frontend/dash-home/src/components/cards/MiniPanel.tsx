import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components';
import { P } from '../atoms/Core';
import { Button } from '../atoms/Themed';

interface Props {
  id?: string,
  title: any,
  note?: string,
  description?: string,
}

export const MiniPanelInner = (props: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Title>{props.title}</Title>
      {props.note && <Note>{`// ${props.note}`}</Note>}
      <Description>
        {props.description && props.description}
      </Description>
      {
        props.id &&
        <LinkContainer to={`/controllers/${props.id}`}>
          <Button block>{t("button.tapToEdit")}</Button>
        </LinkContainer >
      }
    </>
  )
}

const Note = styled(P)`
  font-size: 1rem;
  font-weight: 300;
  margin-left: 0.2rem;
`

const Title = styled(P)`
  font-weight: 300;
  font-size: 3.3rem;
  text-transform: uppercase;
  line-height: 1em;
  margin: 0;
  padding-top: 0;
`

const Description = styled(P)`
  font-weight: 300;
  font-size: 1.5rem;
  text-transform: initial;
`