import axios from "../httpClient";
import { API_ADDRESS } from "../config";
import { FAILED, PENDING, Status, SUCCESS } from "./Status";

export interface RemotesResult {
  status: Status,
  remotes?: Map<string, { [vendor: string]: string[]}>,
  error?: any,
}

export function fetchRemotes(setResult: React.Dispatch<React.SetStateAction<RemotesResult | undefined>>) {
  setResult({
    status: PENDING,
  })
  axios.get<Map<string, { [vendor: string]: string[]}>>(`${API_ADDRESS}/api/v1/remotes`)
  .then(response => setResult({
    status: SUCCESS,
    remotes: new Map<string, { [vendor: string]: string[]}>(Object.entries(response.data)),
  }))
  .catch(error => setResult({
    status: FAILED,
    error: error,
  }));
}