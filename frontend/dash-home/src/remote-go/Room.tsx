import axios from "axios";
import { API_ADDRESS } from "../config";
import { FAILED, PENDING, Status, SUCCESS } from "./Status";

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
  status: Status,
  room?: Room,
  error?: any,
}

export function fetchRoom(setResult: React.Dispatch<React.SetStateAction<RoomResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios.get<Room>(`${API_ADDRESS}/api/v1/room`)
    .then(response => setResult({
      status: SUCCESS,
      room: response.data,
    }))
    .catch(error => {
      console.error(`*** Room > Fetch error:`);
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}