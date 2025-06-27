import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../models/alertModels";
import { URL_API } from "../config";

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
        enqueueSnackbar(datas.message, typeSuccess)
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
        console.log(datas);
        throw "no conozco el error";
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError);
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
        enqueueSnackbar(datas.message, typeSuccess)
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
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);