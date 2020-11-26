import axios from "axios";
import { API_ADDRESS } from "../config";
import { FAILED, PENDING, Status, SUCCESS } from "./Status";

// Template
export interface Template {
  vendor: string,
  model: string,
  kind: string,
  aircon?: Aircon,
  light?: Light,
}

// Action - define controller action
export interface Action {
  type: string,
  default: any,
  list: string[],
  range: Range,
  toggle: Toggle,
  shot: Shot,
  multiple: Action[],
}

// Range - Numeric range
export interface Range {
  step: number,
  from: number,
  to: number,
  suffix?: string,
}

// Toggle - Switch value for boolean
export interface Toggle {
  on: any,
  off: any,
}

// Shot - Raise when pushed
export interface Shot {
  value: any,
}

// -----

// Aircon - Aircon Template
export interface Aircon {
  operation: Action,
  modes: { [mode: string]: AirconModes },
}

// AirconModes - Aircon entry (per modes)
export interface AirconModes {
  temp?: Action,
  humid?: Action,
  fan?: Action,
  horizontal_vane?: Action,
  vertical_vane?: Action,
}

// Light - Light Template
export interface Light {
  mode: Action,
  brightness: Action,
  color: Action,
}

// ---
export interface TemplateResult {
  status: Status,
  template?: Template,
  error?: any,
}

export function fetchTemplate(id: string, setResult: React.Dispatch<React.SetStateAction<TemplateResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios.request<Template>({
    url: `${API_ADDRESS}/api/v1/controllers/${id}/template`,
  })
    .then(response => {
      console.debug(response.data);
      setResult({
        status: SUCCESS,
        template: response.data,
      })
    })
    .catch(error => {
      console.error(`*** Fetch error:`)
      console.error(error)
      setResult({
        status: FAILED,
        error: error,
      })
    });
}