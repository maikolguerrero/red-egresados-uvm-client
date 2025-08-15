const vitePort = import.meta.env.VITE_PORT;
// export const VITE_PORT = vitePort || 5173;
export const VITE_PORT = vitePort;

const viteNodeEnv = import.meta.env.VITE_NODE_ENV;
// export const VITE_NODE_ENV = viteNodeEnv || 'development';
export const VITE_NODE_ENV = viteNodeEnv;

const apiUrl = import.meta.env.VITE_API_URL;
// export const URL_API = apiUrl || 'http://localhost:3000';
export const URL_API = apiUrl;

const socketUrl = import.meta.env.VITE_SOCKET_URL;
// export const URL_SOCKET = socketUrl || 'ws://localhost:3000';
export const URL_SOCKET = socketUrl;

const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
// export const URL_FRONTEND = frontendUrl || 'http://localhost:5173';
export const URL_FRONTEND = frontendUrl;