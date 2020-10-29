import axios from "../httpClient";
import { API_ADDRESS } from "../config";
import { FAILED, PENDING, Status, SUCCESS } from "./Status";

export interface Controller {
  id: string,
  name: string,
  kind: string, // "AIRCON", "LIGHT"...
  type: string, // "REMOTE"...
  remote?: Remote,
  aircon?: AirconState,
}

// Remote
export interface Remote {
  vendor: string,
  model: string,
}

// --
export interface ControllersResult {
  status: Status,
  controllers?: Map<string, Controller>,
  error?: any,
}

export interface ControllerResult {
  status: Status,
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
  setResult({
    status: PENDING,
  })
  
  axios.get<Map<string, Controller>>(`${API_ADDRESS}/api/v1/controllers`)
    .then(response => setResult({
      status: SUCCESS,
      controllers: response.data,
    }))
    .catch(error => {
      console.error(`*** Controllers > Fetch error:`);
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function fetchController(id: string, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  axios.get<Controller>(`${API_ADDRESS}/api/v1/controllers/${id}`)
    .then(response => setResult({
      status: SUCCESS,
      controller: response.data,
    }))
    .catch(error => {
      console.error(`*** Controller > Fetch error:`);
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function updateController(id: string, payload: Controller, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios
    .patch<Controller>(`${API_ADDRESS}/api/v1/controllers/${id}`, payload)
    .then(response => setResult({
      status: SUCCESS,
      controller: response.data,
    }))
    .catch(error => setResult({
      status: FAILED,
      error: error,
    }));
}

// Emitter
export function sendAircon(id: string, payload: Aircon, callback: any) {
  axios
    .post<Aircon>(`${API_ADDRESS}/api/v1/controllers/${id}/aircon`, payload)
    .then(response => callback(response.data))
    .catch(error => error.response);
}