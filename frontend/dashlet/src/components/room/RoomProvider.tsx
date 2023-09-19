import React from 'react';
import { useEffect, useState } from 'react';
import { fetchRoom as fetch, fetchRoom, RoomResult } from '../../clients/Room';

interface Props {
  children: React.ReactNode,
}

interface Context {
  roomResult?: RoomResult,
  fetchRoom: () => void,
}

export const RoomContext = React.createContext<Context>({
  fetchRoom: () => null,
});

export const RoomProvider: React.FC<Props> = props => {
  const fetchRoom = () => {
    console.debug(':: Update room...');
    fetch(setRoom);
  };

  const [roomResult, setRoom] = useState<RoomResult | undefined>(undefined);
  useEffect(() => {
    fetchRoom();
  }, []);

  console.debug(':: Rendering > RoomProvider...');

  return (
    <RoomContext.Provider value={{ roomResult, fetchRoom }}>
      {props.children}
    </RoomContext.Provider>
  );
};