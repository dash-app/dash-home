import React from 'react';
import axios from '../httpClient';
import { AxiosError } from 'axios';
import { API_URL } from '../config';
import { ErrorResponse, FAILED, PENDING, Status, SUCCESS } from './Status';

export interface Agent {
  id: string;
  address: string;
  default?: boolean;
  label?: string;
  online?: boolean;
}

export interface AgentsResult {
  status: Status;
  agents?: Agent[];
  error?: AxiosError<ErrorResponse>;
}

export interface AgentResult {
  status: Status;
  agent?: Agent;
  error?: AxiosError<ErrorResponse>;
}

export function fetchAgents(
  setResult: React.Dispatch<React.SetStateAction<AgentsResult | undefined>>
) {
  setResult({
    status: PENDING,
  });

  axios
    .get<Agent[]>(`${API_URL}/api/v1/agents`)
    .then((response: { data?: Agent[] }) =>
      setResult({
        status: SUCCESS,
        agents: response.data,
      })
    )
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error('*** Agents > Fetch error:');
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function addAgent(
  payload: Agent,
  setResult: React.Dispatch<React.SetStateAction<AgentResult | undefined>>
) {
  setResult({
    status: PENDING,
  });

  axios
    .post<Agent>(`${API_URL}/api/v1/agents`, payload)
    .then((response: { data?: Agent }) =>
      setResult({
        status: SUCCESS,
        agent: response.data,
      })
    )
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error('*** Agents > Add error:');
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function deleteAgent(
  id: string,
  setResult: React.Dispatch<React.SetStateAction<AgentResult | undefined>>
) {
  setResult({
    status: PENDING,
  });

  axios
    .delete(`${API_URL}/api/v1/agents/${id}`)
    .then(() =>
      setResult({
        status: SUCCESS,
      })
    )
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error('*** Agents > Delete error:');
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}

export function updateAgent(
  id: string,
  payload: Agent,
  setResult: React.Dispatch<React.SetStateAction<AgentResult | undefined>>
) {
  setResult({
    status: PENDING,
  });

  axios
    .patch<Agent>(`${API_URL}/api/v1/agents/${id}`, payload)
    .then((response: { data?: Agent }) =>
      setResult({
        status: SUCCESS,
        agent: response.data,
      })
    )
    .catch((error: AxiosError<ErrorResponse>) => {
      console.error('*** Agents > Update error:');
      console.error(error);
      setResult({
        status: FAILED,
        error: error,
      });
    });
}
