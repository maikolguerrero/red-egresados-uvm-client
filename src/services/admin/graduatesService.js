import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from "../../utils/notifications";
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
        notify.success("Agregados los egresados de pregrado", false)
        return {
          message: "Agregados los egresados de pregrado",
          data: response
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false)
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
        notify.success("Agregados los egresados de postgrado", false)
        return {
          message: "Agregados los egresados de postgrado",
          data: response
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  })