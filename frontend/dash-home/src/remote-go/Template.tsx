import { API_ADDRESS } from "../config";
import axios from "../httpClient";

// Template
export interface Template {
  vendor: string,
  model: string,
  kind: string,
  aircon?: Aircon,
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

// ---
export interface TemplateResult {
  template?: Template,
  error?: any,
}

export function fetchTemplate(id: string, setResult: React.Dispatch<React.SetStateAction<TemplateResult | undefined>>) {
  axios.request<Template>({
    url: `${API_ADDRESS}/api/v1/controllers/${id}/template`,
  })
    .then(response => {
      console.log(response.data);
      setResult({
        template: response.data,
      })
    })
    .catch(error => {
      console.error(`*** Fetch error:`)
      console.error(error)
      setResult({
        error: error,
      })
    });
}