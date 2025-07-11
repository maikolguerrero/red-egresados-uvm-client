import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const addGraduatesPregrado = createAsyncThunk(
  "graduatesSlice/addGraduatesPregrado", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/alumni/pregrado`,
        {
          method: "POST",
          body: data,
        }
      );

      if (response.success) {
        enqueueSnackbar("Se agregaron los egresados de pregrado", typeSuccess)
        return {
          message: "Se agregaron los egresados de pregrado",
          data: response
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
)

export const addGraduatesPostgrado = createAsyncThunk(
  "graduatesSlice/addGraduatesPostgrado", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/alumni/postgrado`,
        {
          method: "POST",
          body: data,
        }
      );

      if (response.success) {
        enqueueSnackbar("Se agregaron los egresados de postgrado", typeSuccess)
        return {
          message: "Se agregaron los egresados de postgrado",
          data: response
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  })