import { API_ADDRESS } from "../config";
import axios from "../httpClient";

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

export function fetchController(id: string, setResult: React.Dispatch<React.SetStateAction<ControllerResult | undefined>>) {
  axios.get<Controller>(`${API_ADDRESS}/api/v1/controllers/${id}`)
    .then(response => setResult({
      controller: response.data,
    }))
    .catch(error => {
      console.error(`*** Fetch error:`)
      console.error(error)
      setResult({
        error: error,
      })
    });
}