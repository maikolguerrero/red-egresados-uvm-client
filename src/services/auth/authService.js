import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { Bounce, toast } from "react-toastify";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

let optionsToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const verifySesion = createAsyncThunk(
  "authSlice/verifySesion", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/check-session`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          id: datas.user.id,
          username: datas.user.username,
          role: datas.user.role,
        };
      } else {
        throw `${datas.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const logoutSesion = createAsyncThunk(
  "authSlice/logoutSesion", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/logout`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
            console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return (datas.message)
      } else {
        throw `${datas.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const resendEmailFetch = createAsyncThunk(
  "authSlice/resendEmailFetch", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/resend-verification`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
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
      } else {
        throw `${datas.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

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
          method: "POST", // or 'PUT'
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
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          id: datas.user.id,
          role: datas.user.role,
          username: datas.user.username,
        };
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

export const verifyEmail = createAsyncThunk(
  "authSlice/verifyEmail", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        // "http://localhost:3000" + "/api/auth/verify-email?token =" + "?",
         `${URL_API}/api/auth/verify-email?token=${data}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess);
        return {
          message: datas.message,
        };
      } else {
        throw `${datas.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);