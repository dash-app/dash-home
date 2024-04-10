import * as React from 'react';
import { AirconPanel, AirconMiniPanel } from "../../aircon/Aircon";
import { LightPanel, LightMiniPanel } from "../../light/Light";
import { Controller } from '../../remote-go/Controller';
import { H1 } from '../atoms/Core';
import { AirconCard } from '../cards/Aircon';
import { LightCard } from '../cards/Light';
import { ControllerProps } from './Controller';

interface Props extends Controller {
  children?: React.ReactNode,
}

export const SummonMiniPanel: React.FC<Props> = props => {
  if (props.appliances?.aircon! && props.kind === "AIRCON" && props.type === "REMOTE") {
    return (
      <AirconCard name={props.name} state={props.appliances?.aircon!}>
        <AirconMiniPanel {...props} />
        {props.children}
      </AirconCard>
    )
  } else if (props.appliances?.light! && props.kind === "LIGHT" && props.type === "REMOTE") {
    return (
      <LightCard name={props.name}>
        <LightMiniPanel {...props} />
        {props.children}
      </LightCard>
    )
  } else {
    return (<H1>Not implemented yet.</H1>)
  }
}

export const SummonPanel: React.FC<ControllerProps> = props => {
  if (props.controller.kind === "AIRCON" && props.controller.type === "REMOTE") {
    return (<AirconPanel {...props} />)
  } else if (props.controller.kind === "LIGHT" && props.controller.type === "REMOTE") {
    return (<LightPanel {...props} />)
  } else {
    return (<H1>Unknown Controller</H1>)
  }
}