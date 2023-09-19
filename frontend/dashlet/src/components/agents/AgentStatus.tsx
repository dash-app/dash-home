import React from 'react';
import { RoomContext } from '../room/RoomProvider';


export const AgentStatus: React.FC = (props: AgentProps) => {
  const roomContext = React.useContext(RoomContext);
  const room = roomContext.roomResult;

  return (
    <>
      <p>{room?.room?.name}</p>
      <p>Temp: {room?.room?.ambient.temp}</p>
    </>
  );
};