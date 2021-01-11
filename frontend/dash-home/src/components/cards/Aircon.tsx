import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardBase } from './CardBase';

interface AirconProps {
  name: string,
  mode: string,
  send?: boolean,
  children: React.ReactNode,
}

const AirconCard = (props: AirconProps) => {
  let modeColor: string = "#5A5A5A"; // #0088FF
  switch (props.mode) {
    case "auto":
      modeColor = "#5A5A5A";
      break;
    case "cool":
      modeColor = "#007Bff";
      break;
    case "dry":
      modeColor = "#3CA811";
      break;
    case "heat":
      modeColor = "#FF650D";
      break;
  }
  return (
    <CardBase
      color={modeColor}
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