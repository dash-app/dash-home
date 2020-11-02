import axios from "../httpClient";
import { API_ADDRESS } from "../config";
import { FAILED, PENDING, Status, SUCCESS } from "./Status";

export interface Remotes {
  aircon: { [vendor: string]: string[]},
}

export interface RemotesResult {
  status: Status,
  remotes?: Remotes,
  error?: any,
}

export function fetchRemotes(setResult: React.Dispatch<React.SetStateAction<RemotesResult | undefined>>) {
  setResult({
    status: PENDING,
  })
  axios.get<Remotes>(`${API_ADDRESS}/api/v1/remotes`)
  .then(response => setResult({
    status: SUCCESS,
    remotes: response.data,
  }))
  .catch(error => setResult({
    status: FAILED,
    error: error,
  }));
}