import * as React from 'react';
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
      modeColor = "#0088FF";
      break;
    case "dry":
      modeColor = "#00AA00";
      break;
    case "heat":
      modeColor = "#FF5500";
      break;
  }
  return (
    <CardBase
      color={modeColor}
      title={props.name}
      icon={["fas", "fan"]}
      send={props.send}
    >
      {props.children}
    </CardBase>
  )
}

export {
  AirconCard
};