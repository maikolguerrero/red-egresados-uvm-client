import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";
import notify from "../../utils/notifications";

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
        notify.success("Cargado el contenido de solicitudes académicas", true)
        return {
          message: "Cargado el contenido de solicitudes académicas",
          academicRequests: datas.data
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
        notify.success(response.message, false)
        return {
          message: response.message,
          academicRequestsUpdate: response.data
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
);