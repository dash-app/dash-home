export const API_URL: string = _API_ADDRESS_ ?
  `${window.location.protocol}//${_API_ADDRESS_}` :
  `${window.location.protocol}//${window.location.host}`;

export const RELEASE_VERSION: string = _RELEASE_VERSION_ ?
  _RELEASE_VERSION_ :
  'UNKNOWN';
