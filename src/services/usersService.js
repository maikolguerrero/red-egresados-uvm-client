import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from "../utils/notifications";
import { URL_API } from "../config";
import logger from "../utils/logger";

// Action asíncrona
export const postData = createAsyncThunk(
  "authSlice/postData", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/auth/register/alumni`,
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
          notify.error(datas.metadata.errors[0].message, false);
          return thunkAPI.rejectWithValue({ continue: false });
        }
        if (datas.metadata.context === "security") {
          notify.error(datas.message, false);
          return thunkAPI.rejectWithValue({ continue: false });
        }
        if (datas.metadata.action === "register_duplicate") {
          notify.error(datas.message, false);
          return thunkAPI.rejectWithValue({ continue: false });
        }
        logger.log(datas);
        notify.error("Error al registrar", false);
        return thunkAPI.rejectWithValue({ continue: false });
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, true);
      notify.errorDefault();
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
        `${URL_API}/auth/login`,
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
        notify.error(datas.message, false);
        return thunkAPI.rejectWithValue({ continue: false });
      }
      if (datas.metadata.context === "input_validation") {
        notify.error(datas.metadata.errors[0].message, false);
        return thunkAPI.rejectWithValue({ continue: false });
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, true);
      notify.errorDefault();
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);