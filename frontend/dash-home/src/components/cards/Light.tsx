import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      icon={<FontAwesomeIcon icon={["fas", "lightbulb"]} />}
      title={props.name}
      send={props.send}
    >
      {props.children}
    </CardBase>
  )
}

export {
  LightCard
};