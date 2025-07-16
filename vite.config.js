import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      host: true,
      open: (env.VITE_NODE_ENV === 'development' && env.VITE_OPEN_BROWSER === 'true'), // Ejemplo de variable booleana: undefined
    },

    plugins: [react(), flowbiteReact()],
  }
})