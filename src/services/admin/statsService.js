import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

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
        enqueueSnackbar("Se cargo el contenido landing", typeSuccess)
        return {
          message: "Se cargo el contenido landing",
          stats: response.data
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);