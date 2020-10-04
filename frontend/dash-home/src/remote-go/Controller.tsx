import axios from "axios";
import { API_ADDRESS } from "../config";

export interface Controller {
  id: string,
  name: string,
  kind: string, // "AIRCON", "LIGHT"...
  type: string, // "REMOTE"...
  remote: Remote,
  aircon?: AirconState,
}

// Remote
export interface Remote {
  vendor: string,
  model: string,
}

// --
export interface ControllersResult {
  controllers?: Map<string, Controller>,
  error?: any,
}

export interface ControllerResult {
  controller?: Controller,
  error?: any,
}

// --------
// Aircon
// --------
export interface Aircon {
  operation: boolean,
  mode: string,
  temp: any,
  humid: string,
  fan: string,
  horizontal_vane: string,
  vertical_vane: string,
}

export interface AirconState {
  operation: boolean,
  mode: string,
  modes: { [mode: string]: AirconModes },
}

export interface AirconModes {
  temp: any,
  humid: string,
  fan: string,
  horizontal_vane: string,
  vertical_vane: string,
}

export function fetchControllers(setResult: React.Dispatch<React.SetStateAction<ControllersResult | undefined>>) {
  axios.get<Map<string, Controller>>(`${API_ADDRESS}/api/v1/controllers`)
    .then(response => setResult({
      controllers: response.data,
    }))
    .catch(error => {
      console.error(`*** Controllers > Fetch error:`);
      console.error(error);
      setResult({
        error: error,
      });
    });
}

export function fetchController(id: string, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  axios.get<Controller>(`${API_ADDRESS}/api/v1/controllers/${id}`)
    .then(response => setResult({
      controller: response.data,
    }))
    .catch(error => {
      console.error(`*** Controller > Fetch error:`);
      console.error(error);
      setResult({
        error: error,
      });
    });
}

// Emitter
export function sendAircon(id: string, payload: Aircon, callback: any) {
  axios
    .post<Aircon>(`${API_ADDRESS}/api/v1/controllers/${id}/aircon`, payload)
    .then(response => callback(response.data))
    .catch(error => error.response);
}