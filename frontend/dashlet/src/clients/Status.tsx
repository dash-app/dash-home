export const NONE = 'NONE';
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

export type Status = 'NONE' | 'PENDING' | 'SUCCESS' | 'FAILED';

export interface ErrorResponse {
  error: unknown,
  code?: string,
}