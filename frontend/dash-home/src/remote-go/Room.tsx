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
export interface CreateRoomRequest {
  name: string,
}

export interface RoomResult {
  status: Status,
  room?: Room,
  error?: any,
}

export function createRoom(name: string, setResult: React.Dispatch<React.SetStateAction<RoomResult | undefined>>) {
  setResult({
    status: PENDING,
  })
  axios.post<Room>(`${API_ADDRESS}/api/v1/room`, (() => {
    const payload: CreateRoomRequest = {
      name: name,
    }
    return payload
  })())
    .then(response => setResult({
      status: SUCCESS,
      room: response.data,
    }))
    .catch(error => {
      console.error(`*** Room > Create error:`);
      console.error(error);
      console.error(error.response.data)
      setResult({
        status: FAILED,
        error: error.response,
      });
    });
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
        error: error.response,
      });
    });
}