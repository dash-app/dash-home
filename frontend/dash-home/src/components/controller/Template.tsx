import React from "react";
import { Action } from '../../remote-go/Template';
import { Container } from "../atoms/Themed";
import List from './template/List';
import Range from './template/Range';
import Shot from "./template/Shot";
import Toggle from './template/Toggle';
import { ValueSet } from './template/TplBase';

interface SummonProps {
  title?: any,
  hideTitle?: boolean,
  onChange?: any,
  description: string,
  default?: any,
  value: any,
  action: Action,
  setter?: any,
  sender?: any,
}

export const SummonByTpl = (props: SummonProps) => {
  switch (props.action.type) {
    case "LIST":
      let values: ValueSet[] = [];
      props.action.list.values.forEach((v) => {
        values.push({
          value: v,
          displayComponent: v,
        })
      });

      return (
        <List
          title={props.title}
          hideTitle={props.hideTitle}
          description={props.description}
          values={values}
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
        <Container fluid>
          {props.action.multiple.map((v) => {
            return (
              <SummonByTpl
                hideTitle={true}
                description={props.description}
                value={props.value}
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
        </Container>
      )
    default:
      return (<p>** Unknown **</p>)
  }
}
