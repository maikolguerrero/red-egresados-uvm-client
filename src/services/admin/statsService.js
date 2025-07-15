import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import notify from "../../utils/notifications";

export const getContentStats = createAsyncThunk(
  "statsSlice/getContentStats", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/stats/all`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        notify.success("Cargaron las estadísticas", true)
        return {
          message: "Cargaron las estadísticas",
          stats: response.data
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, true)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);