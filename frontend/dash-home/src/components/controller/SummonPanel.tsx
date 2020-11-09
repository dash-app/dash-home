import * as React from 'react';
import { Controller } from "../../remote-go/Controller";
import { Template } from "../../remote-go/Template";
import { AirconPanel, AirconMiniPanel } from "../../aircon/Aircon";
import { H1 } from '../atoms/Core';

interface Props {
  controller: Controller,
  template?: Template,
}

const SummonPanel: React.FC<Props> = props => {
  switch (props.controller.kind) {
    case "AIRCON":
      return (
        <span>
          {props.template ?
            <AirconPanel
              controller={props.controller}
              template={props.template}
            />
            :
            <AirconMiniPanel
              controller={props.controller}
            />
          }
        </span>
      )
    default:
      return (
        <span>
          <H1>Unknown</H1>
        </span>
      )
  }
}

export default SummonPanel;