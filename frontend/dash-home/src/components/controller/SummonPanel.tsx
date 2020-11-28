import * as React from 'react';
import { Controller } from "../../remote-go/Controller";
import { Template } from "../../remote-go/Template";
import { AirconPanel, AirconMiniPanel } from "../../aircon/Aircon";
import { LightPanel, LightMiniPanel } from "../../light/Light";
import { H1 } from '../atoms/Core';

interface Props {
  controller: Controller,
  template?: Template,
}

const SummonPanel: React.FC<Props> = props => {
  switch (props.controller.kind) {
    case "AIRCON":
      if (props.controller.type === "REMOTE") {
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
      }
      break;
    case "LIGHT":
      if (props.controller.type === "REMOTE") {
        return (
          <span>
            {props.template ?
              <LightPanel
                controller={props.controller}
                template={props.template}
              />
              :
              <LightMiniPanel
                controller={props.controller}
              />
            }
          </span>
        )
      }
      break;
  }

  return (
    <span>
      <H1>Unknown</H1>
    </span>
  )
}

export default SummonPanel;