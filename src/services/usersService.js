import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from "../utils/notifications";
import { typeError, typeSuccess } from "../models/alertModels";
import { URL_API } from "../config";
import logger from "../utils/logger";

// Action asíncrona
export const postData = createAsyncThunk(
  "authSlice/postData", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/register/alumni`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      if (datas.success) {
        notify.success(datas.message, false)
        return ({message: datas.message, email: data.email});
      } else {
        if (datas.metadata.context === "input_validation") {
          throw `${datas.metadata.errors[0].message}`;
        }
        if (datas.metadata.context === "security") {
          throw `${datas.message}`;
        }
        if (datas.metadata.action === "register_duplicate") {
          throw `${datas.message}`;
        }
        logger.log(datas);
        throw "no conozco el error";
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const loginUserFetch = createAsyncThunk(
  "authSlice/loginUserFetch", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/login`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      if (datas.success) {
        notify.success(datas.message, true)
        return (datas.message);
      }
      if (datas.metadata.context === "security") {
        throw `${datas.message}`;
      }
      if (datas.metadata.context === "input_validation") {
        throw `${datas.metadata.errors[0].message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);