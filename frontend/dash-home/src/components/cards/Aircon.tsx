import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardBase } from './CardBase';
import { AirconState } from '../../remote-go/Controller';

interface AirconProps {
  name: string,
  state: AirconState,
  send?: boolean,
  children: React.ReactNode,
}

const AirconCard = (props: AirconProps) => {
  let color: string = "#5A5A5A"; // #0088FF
  if (!props.state.operation) {
    color = "#3A3A3A";
  } else {
    switch (props.state.mode) {
      case "auto":
        color = "#FFB600";
        break;
      case "cool":
        color = "#007BFF";
        break;
      case "dry":
        color = "#3CA811";
        break;
      case "heat":
        color = "#FF650D";
        break;
      case "fan":
        color = "#AFAFAF";
        break;
    }
  }

  return (
    <CardBase
      color={color}
      icon={<FontAwesomeIcon icon={["fas", "fan"]} />}
      title={props.name}
      send={props.send}
    >
      {props.children}
    </CardBase>
  )
}

export {
  AirconCard
};