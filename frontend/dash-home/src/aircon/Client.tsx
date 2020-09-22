import axios from 'axios';
import { Aircon } from "../remote-go/Template";
import { API_ADDRESS } from '../config';

export function push(id: string, payload: Aircon) {
  axios
    .post<Aircon>(`${API_ADDRESS}/api/v1/controller/${id}/aircon`)
    .then(response => function() {})
    .catch(error => error.response);
}