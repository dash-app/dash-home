import axios from "axios";
import { API_ADDRESS } from "../config";

export interface Room {
  id: string,
  name: string,
  ambient: Ambient,
}

export interface Ambient {
  temp: number,
  humid: number,
  pressure: number,
  last_fetch: Date,
}

// --
export interface RoomResult {
  room?: Room,
  error?: any,
}

export function fetchRoom(setResult: React.Dispatch<React.SetStateAction<RoomResult | undefined>>) {
  axios.get<Room>(`${API_ADDRESS}/api/v1/room`)
    .then(response => setResult({
      room: response.data,
    }))
    .catch(error => {
      console.error(`*** Room > Fetch error:`);
      console.error(error);
      setResult({
        error: error,
      });
    });
}