import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../config";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

export const searchReport = createAsyncThunk(
  "reportsSlice/searchReport", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/reports?page=${data.page}&limit=${data.limit}${
            data.status === null || data.status === undefined ? "" : "&status=" + data.status
          }`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      logger.log(datas)
      if (datas.success) {
        notify.success("Reportes cargados", true)
        return {
          message: "Reportes cargados",
          reports: datas.data,
          pagination: datas.pagination
        }
      } else {
        throw `${datas.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      notify.error(error, true)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const resolveReport = createAsyncThunk(
  "reportsSlice/resolveReport", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/reports/${data.reportId}/resolve`,
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );

      let datas = await response.json();
      logger.log(datas)
      if (datas.success) {
        notify.success(datas.message, false)
        return {
          message: datas.message,
          report: datas.data
        }
      } else {
        if (datas.message === "Error de validación") {
          throw `${datas.metadata.errors[0].message}`
        }
        throw `${datas.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      notify.error(error, false)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);