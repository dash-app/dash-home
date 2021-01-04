import * as React from 'react';
import { AirconPanel, AirconMiniPanel } from "../../aircon/Aircon";
import { LightPanel, LightMiniPanel } from "../../light/Light";
import { Controller } from '../../remote-go/Controller';
import { H1 } from '../atoms/Core';
import { ControllerProps } from './Controller';

export const SummonMiniPanel: React.FC<Controller> = controller => {
  if (controller.kind === "AIRCON" && controller.type === "REMOTE") {
    return (<AirconMiniPanel {...controller} />)
  } else if (controller.kind === "LIGHT" && controller.type === "REMOTE") {
    return (<LightMiniPanel {...controller} />)
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