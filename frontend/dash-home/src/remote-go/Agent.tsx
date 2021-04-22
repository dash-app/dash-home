import axios from "../httpClient";
import { API_ADDRESS } from "../config";
import { ErrorResponse, FAILED, PENDING, Status, SUCCESS } from "./Status";
import { AxiosError } from "axios";

export interface Agent {
  id: string,
  address: string,
  default?: boolean,
  label?: string,
  online?: boolean,
}

// --
export interface AgentsResult {
  status: Status,
  agents?: Agent[],
  response?: any,
  error?: AxiosError<ErrorResponse>,
}

export function fetchAgents(setResult: React.Dispatch<React.SetStateAction<AgentsResult | undefined>>) {
  setResult({
    status: PENDING,
  })

  axios.get(`${API_ADDRESS}/api/v1/agents`)
    .then(response => setResult({
      status: SUCCESS,
      agents: response.data,
    }))
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error(`*** Agents > Fetch error:`);
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}