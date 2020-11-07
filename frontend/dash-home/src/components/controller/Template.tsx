import React from "react";
import { Action } from '../../remote-go/Template';
import List from './template/List';
import Range from './template/Range';
import Shot from "./template/Shot";
import Toggle from './template/Toggle';

interface SummonProps {
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
      return (
        <List
          description={props.description}
          values={props.action.list}
          key={props.value}
          status={props.value}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
            props.sender();
          })}
        />
      )
    case "RANGE":
      return (
        <Range
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
          description={props.description}
          key={props.value}
          default={props.action.default}
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
        <div>
          {props.action.multiple.map((v) => {
            return (
              <SummonByTpl 
                description={props.description}
                value={props.value}
                action={v}
              />
            )
          })}
        </div>
      )
    default:
      return (<p>** Unknown **</p>)
  }
}
