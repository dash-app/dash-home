import axios from "../httpClient";
import { API_ADDRESS } from "../config";
import { ErrorResponse, FAILED, PENDING, Status, SUCCESS } from "./Status";
import { AxiosError } from "axios";

export interface Controller {
  id: string,
  agent_id?: string,
  name: string,
  kind: string, // "AIRCON", "LIGHT"...
  type: string, // "REMOTE"...
  remote?: Remote,
  appliances?: Appliances,
  switchbot?: SwitchBot,
}

// Remote
export interface Remote {
  vendor: string,
  model: string,
}

// Appliances
export interface Appliances {
  aircon?: AirconState,
  light?: LightState,
}

// SwitchBot
export interface SwitchBot {
  mac: string,
  type: string,
  state?: string,
}

// --
export interface ControllersResult {
  status: Status,
  controllers?: Map<string, Controller>,
  error?: AxiosError<ErrorResponse>,
}

export interface ControllerResult {
  status: Status,
  controller?: Controller,
  response?: any,
  error?: AxiosError<ErrorResponse>,
}

export interface SendResult {
  status: Status,
  entry?: Aircon | Light,
  error?: AxiosError<ErrorResponse>,
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

// ---------
// Light
// ---------
export interface Light {
  action: string,
}

export interface LightState {
  last_action: string,
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
    .catch((error: AxiosError<ErrorResponse>) => {
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
    .catch((error: AxiosError<ErrorResponse>) => {
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
    .catch((error: AxiosError<ErrorResponse>) => {
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function createController(payload: Controller, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios
    .post<Controller>(`${API_ADDRESS}/api/v1/controllers`, payload)
    .then(response => setResult({
      status: SUCCESS,
      controller: response.data,
    }))
    .catch((error: AxiosError<ErrorResponse>) => {
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function deleteController(id: string, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios
    .delete(`${API_ADDRESS}/api/v1/controllers/${id}`)
    .then(response => setResult({
      status: SUCCESS,
    }))
    .catch((error: AxiosError<ErrorResponse>) => {
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

// Emitter
export function sendAircon(id: string, payload: Aircon, setResult: React.Dispatch<React.SetStateAction<SendResult | null>>) {
  setResult({
    status: PENDING,
  })

  axios
    .post<Aircon>(`${API_ADDRESS}/api/v1/controllers/${id}/aircon`, payload)
    .then(response => setResult({
      status: SUCCESS,
      entry: response.data,
    }))
    .catch((error: AxiosError<ErrorResponse>) => {
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function sendLight(id: string, payload: Light, callback: any) {
  axios
    .post<Light>(`${API_ADDRESS}/api/v1/controllers/${id}/light`, payload)
    .then(response => callback(response.data))
    .catch(error => error.response);
}