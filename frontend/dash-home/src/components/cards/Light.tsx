import * as React from 'react';
import { CardBase } from './CardBase';

interface LightProps {
  name: string,
  send?: boolean,
  children: React.ReactNode,
}

const LightCard = (props: LightProps) => {
  return (
    <CardBase
      color={"#5A5A5A"}
      title={props.name}
      icon={["fas", "lightbulb"]}
      send={props.send}
    >
      {props.children}
    </CardBase>
  )
}

export {
  LightCard
};