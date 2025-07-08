import { verifySesion } from "../auth/authService";
import store from "../../app/store";

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos

let sessionCheckInterval;

export const startSessionChecker = () => {
  // Verificar sesión inmediatamente
  store.dispatch(verifySesion());
  
  // Configurar intervalo para verificación periódica
  sessionCheckInterval = setInterval(() => {
    store.dispatch(verifySesion());
  }, SESSION_CHECK_INTERVAL);

  return () => {
    clearInterval(sessionCheckInterval);
  };
};

export const stopSessionChecker = () => {
  if (sessionCheckInterval) {
    clearInterval(sessionCheckInterval);
  }
};