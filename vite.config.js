import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useHttps = env.VITE_USE_HTTPS === 'true'; // Convierte el string a booleano

  // Configuración de HTTPS con certificados
  const httpsConfig = useHttps ? {
    key: fs.readFileSync(path.resolve(__dirname, './nginx/certs/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './nginx/certs/cert.pem'))
  } : false;

  return {
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      host: true,
      open: (env.VITE_NODE_ENV === 'development' && env.VITE_OPEN_BROWSER === 'true'),
      https: httpsConfig
    },

    plugins: [react(), flowbiteReact()],
  }
})