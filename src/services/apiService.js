import { URL_API } from "../config";
import store from "../app/store";
import { logoutSesion } from "./auth/authServiceApiFetch";
import logger from "../utils/logger";
import notify from "../utils/notifications";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const apiFetch = async (url, options = {}) => {
  const { dispatch } = store;

  // Configuración por defecto
  const defaultOptions = {
    mode: "cors",
    credentials: "include", // Importante para manejar cookies HTTP-Only
    ...options,
  };

  try {
    // Primera llamada a la API
    let response = await fetch(`${URL_API}${url}`, defaultOptions);

    // Si la respuesta es 401 (no autorizado), intentamos renovar el token
    if (response.status === 401) {
      const originalRequest = { url, options: defaultOptions };

      // Si ya estamos refrescando, encolamos la petición
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiFetch(originalRequest.url, originalRequest.options))
          .catch(err => {
            throw err;
          });
      }

      isRefreshing = true;

      try {
        // Intentamos renovar el token
        const refreshResponse = await fetch(`${URL_API}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!refreshResponse.ok) {
          // Si el refresh falla, hacemos logout
          await dispatch(logoutSesion());
          notify.error("Tu sesión ha expirado. Por favor inicia sesión nuevamente.", false);
          throw new Error("Failed to refresh token");
        }

        // Procesamos la cola de peticiones pendientes
        processQueue(null);

        // Reintentamos la petición original con el nuevo token
        response = await fetch(`${URL_API}${url}`, defaultOptions);
      } catch (error) {
        processQueue(error, null);
        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    // Procesamos la respuesta
    const data = await response.json();

    if (!response.success) {
      return data;
    }

    return data;
  } catch (error) {
    logger.error("API request failed:", error);
    throw error;
  }
};