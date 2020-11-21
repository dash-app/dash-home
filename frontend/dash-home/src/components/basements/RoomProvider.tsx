import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchRoom, RoomResult } from '../../remote-go/Room';

interface Props {
  children: React.ReactNode,
}

export const RoomContext = React.createContext<RoomResult | undefined>(undefined);

export const RoomProvider: React.FC<Props> = props => {
  const [roomResult, setRoom] = useState<RoomResult | undefined>(undefined);

  useEffect(() => {
    console.debug(`:: Update room...`);
    if (!roomResult) {
      fetchRoom(setRoom);
    }
    if (roomResult?.error) {
      console.error(roomResult.error);
    }
  }, [roomResult]);

  console.debug(`:: Rendering > RoomProvider...`)

  return (
    <RoomContext.Provider value={roomResult}>
      {props.children}
    </RoomContext.Provider>
  ) 
}