const rawHost = import.meta.env.VITE_API_HOST;
const rawPort = import.meta.env.VITE_API_PORT;

export const API_PORT = rawPort || '8080';

export const API_HOST =
  rawHost && rawHost !== '0.0.0.0' ? rawHost : window.location.hostname;

//export const API_HOSTNAME = `http://${API_HOST}:${API_PORT}`;
export const API_HOSTNAME = './api';
