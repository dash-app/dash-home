import axios from '../httpClient';
import { API_URL } from '../config';
import { ErrorResponse, FAILED, PENDING, Status, SUCCESS } from './Status';
import { AxiosError } from 'axios';

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
  error?: AxiosError<ErrorResponse>,
}

export function createRoom(name: string, setResult: React.Dispatch<React.SetStateAction<RoomResult | undefined>>) {
  setResult({
    status: PENDING,
  });
  axios.post<Room>(`${API_URL}/api/v1/room`, (() => {
    const payload: CreateRoomRequest = {
      name: name,
    };
    return payload;
  })())
    .then(response => setResult({
      status: SUCCESS,
      room: response.data,
    }))
    .catch(error => {
      console.error('*** Room > Create error:');
      console.error(error);
      console.error(error.response.data);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function fetchRoom(setResult: React.Dispatch<React.SetStateAction<RoomResult | undefined>>) {
  setResult({
    status: PENDING,
  });
  axios.get<Room>(`${API_URL}/api/v1/room`)
    .then(response => setResult({
      status: SUCCESS,
      room: response.data,
    }))
    .catch(error => {
      console.error('*** Room > Fetch error:');
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}