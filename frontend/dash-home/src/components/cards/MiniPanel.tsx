import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Div, P, Span } from '../atoms/Core';
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
    <Div style={{ minWidth: "22rem" }}>
      <Title>{props.title} {props.note && <Note>{"//"} {props.note}</Note>}</Title>
      <Description>{props.description && props.description}</Description>
      {
        props.id &&
        <Link to={`/controllers/${props.id}`}>
          <span><Button block>{t("button.tapToEdit")}</Button></span>
        </Link>
      }
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
  font-size: 4rem;
  margin: 0px;
  text-transform: uppercase;
  line-height: 1;
  word-wrap: keep-all;
`

const Description = styled(P)`
  font-weight: 300;
  font-size: 1.5rem;
  text-transform: initial;
  padding-top: 0.5rem;
`