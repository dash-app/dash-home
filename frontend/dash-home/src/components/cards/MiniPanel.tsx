import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components';
import { Controller } from '../../remote-go/Controller';
import { P } from '../atoms/Core';
import { Button } from '../atoms/Themed';
import { SummonMiniPanel } from '../controller/SummonPanel';

interface Props {
  id?: string,
  controller: Controller,
}

interface InnerProps {
  id?: string,
  title: any,
  note?: string,
  description?: string,
}

export const MiniPanel = (props: Props) => {
  const { t } = useTranslation();
  return (
    <SummonMiniPanel {...props.controller}>
      {
        props.id &&
        <Dropdown as={CustomButtonGroup}>
          <LinkContainer style={{ marginRight: "1rem" }} to={`/controllers/${props.id}`}>
            <Button block>{t("button.tapToEdit")}</Button>
          </LinkContainer>
          <Dropdown.Toggle id="dropdown-split-basic" />
          <Dropdown.Menu>
            <LinkContainer to={`/controllers/${props.id}/edit`}>
              <Dropdown.Item href="#">{t("button.edit")}</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/controllers/${props.id}/delete`}>
              <Dropdown.Item href="#">{t("button.delete")}</Dropdown.Item>
            </LinkContainer>
          </Dropdown.Menu>
        </Dropdown>
      }
    </SummonMiniPanel>
  )
}

export const MiniPanelInner = (props: InnerProps) => {
  return (
    <>
      <Title>{props.title}</Title>
      {props.note && <Note>{`// ${props.note}`}</Note>}
      <Description>
        {props.description && props.description}
      </Description>
    </>
  )
}

const CustomButtonGroup = (props: any) => {
  return <ButtonGroup style={{ display: "flex" }} {...props} />
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