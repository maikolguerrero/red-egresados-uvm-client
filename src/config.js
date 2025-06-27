
const apiUrl = import.meta.env.VITE_API_URL;
export const URL_API = apiUrl || 'http://localhost:3000';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
export const URL_SOCKET = socketUrl || 'ws://localhost:3000';

