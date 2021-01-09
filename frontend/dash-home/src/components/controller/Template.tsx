import { Action } from '../../remote-go/Template';
import { Container } from "../atoms/Themed";
import { H1, P } from '../atoms/Core';
import List from './template/List';
import Range from './template/Range';
import Shot from "./template/Shot";
import Toggle from './template/Toggle';
import { ValueSet } from './template/TplBase';
import styled from 'styled-components';
import { Row, Col } from "react-bootstrap";

interface SummonProps {
  title?: any,
  hideTitle?: boolean,
  onChange?: any,
  description: string,
  i18nKey?: string,
  default?: any,
  value: any,
  wide?: boolean,
  action: Action,
  setter?: any,
  sender?: any,
}

export const SummonByTpl = (props: SummonProps) => {
  if (!props.wide) {
    return (
      <Container fluid>
        <Summoner {...props} />
      </Container>
    )
  } else {
    return (
      <Summoner {...props} />
    )
  }
}

const Summoner = (props: SummonProps) => {
  let values: ValueSet[] = [];

  switch (props.action.type) {
    case "LIST":
      props.action.list.values.forEach((v) => {
        values.push({
          value: v,
        })
      });

      return (
        <List
          title={props.title}
          hideTitle={props.hideTitle}
          description={props.description}
          values={values}
          i18nKey={props.i18nKey}
          key={props.value}
          status={props.value}
          shot={props.action.list.shot}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
            props.sender();
          })}
        />
      )
    case "RANGE":
      return (
        <Range
          title={props.title}
          hideTitle={props.hideTitle}
          description={props.description}
          key={props.value}
          value={props.value}
          step={props.action.range.step}
          from={props.action.range.from}
          to={props.action.range.to}
          suffix={props.action.range.suffix ? props.action.range.suffix : ""}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
            props.sender();
          })}
        />
      )

    case "TOGGLE":
      return (
        <Toggle
          hideTitle={props.hideTitle}
          description={props.description}
          i18nKey={props.i18nKey}
          key={props.value}
          value={props.value}
          icon={["fas", "power-off"]}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
            props.sender();
          })}
        />
      )
    case "SHOT":
      return (
        <Shot
          hideTitle={props.hideTitle}
          description={props.description}
          i18nKey={props.i18nKey}
          key={props.value}
          default={props.action.default ? props.action.default : props.action.shot.value}
          value={props.action.shot.value}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
            props.sender(() => {
              props.setter(props.action.default)
            });
          })}
        />
      )
    case "MULTIPLE":
      return (
        <Row xs={1}>
          <Col>
            <H1>
              <Span>
                {
                  props.title ?
                    props.title
                    :
                    props.value
                }
              </Span>
            </H1>
            <P>
              <Span>{props.description}</Span>
            </P>
          </Col>
          <Col>
            {props.action.multiple.map((v, i) => {
              return (
                <SummonByTpl
                  key={i}
                  hideTitle={true}
                  i18nKey={props.i18nKey}
                  description={props.description}
                  value={props.value}
                  wide={true}
                  setter={props.setter && ((e: any) => {
                    props.setter(e);
                  })}
                  sender={props.sender && ((e: any) => {
                    props.sender(e);
                  })}
                  action={v}
                />
              )
            })}
          </Col>
        </Row>
      )
    default:
      return (<p>** Unknown **</p>)
  }
}

const Span = styled.span`
  display: inline-block;
`