import * as React from 'react';
import { AirconPanel, AirconMiniPanel } from "../../aircon/Aircon";
import { LightPanel, LightMiniPanel } from "../../light/Light";
import { Controller } from '../../remote-go/Controller';
import { H1 } from '../atoms/Core';
import { ControllerProps } from './Controller';

interface Props extends Controller {
  children?: React.ReactNode,
}

export const SummonMiniPanel: React.FC<Props> = props => {
  if (props.kind === "AIRCON" && props.type === "REMOTE") {
    return (<><AirconMiniPanel {...props} />{ props.children }</>)
  } else if (props.kind === "LIGHT" && props.type === "REMOTE") {
    return (<><LightMiniPanel {...props} />{ props.children }</>)
  } else {
    return (<H1>Unknown Controller</H1>)
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