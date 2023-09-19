import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { API_URL, RELEASE_VERSION } from './config';

console.info(`[Dashlet] Welcome. (Rev: ${RELEASE_VERSION} / API: ${API_URL})`);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
