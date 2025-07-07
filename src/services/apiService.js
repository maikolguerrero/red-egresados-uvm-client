// apiService.js
import { URL_API } from "../config";
import { enqueueSnackbar } from "notistack";
import { typeError } from "../models/alertModels";
import store from "../app/store";
import { logoutSesion } from "./auth/authService";

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
        const refreshResponse = await fetch(`${URL_API}/api/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!refreshResponse.ok) {
          // Si el refresh falla, hacemos logout
          await dispatch(logoutSesion());
          enqueueSnackbar("Tu sesión ha expirado. Por favor inicia sesión nuevamente.", typeError);
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

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};