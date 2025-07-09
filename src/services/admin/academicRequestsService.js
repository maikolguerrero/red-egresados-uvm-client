import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";

export const getContentAcademicRequests = createAsyncThunk(
  "academicRequestsSlice/getContentAcademicRequests", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/academic-requests`,
        {
          method: "GET",
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Se cargo el contenido academic requests", typeSuccess)
        return {
          message: "Se cargo el contenido academic requests",
          academicRequests: datas.data
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

export const updateContentAcademicRequests = createAsyncThunk(
  "academicRequestsSlice/updateContentAcademicRequests", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/academic-requests`,
        {
          method: "PATCH",
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
          academicRequestsUpdate: response.data
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