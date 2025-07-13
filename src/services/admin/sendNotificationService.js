import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const sendNotification = createAsyncThunk(
  "sendNotificationSlice/sendNotification", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/notifications/bulk/graduates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          notification: response.data
        };
      } else {
        return {
          message: response.message,
        };
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);