import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";

export const getProfile = createAsyncThunk(
  "authSlice/getProfile", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/alumni/" + data.username,
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
      if (datas.success) {
        enqueueSnackbar("Se ha obtenido el perfil", typeSuccess)
        return {
          message: "Se ha obtenido el perfil",
          profile: datas.data
        }
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

export const getUsers = createAsyncThunk(
  "authSlice/getUsers", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/alumni/search",
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
        enqueueSnackbar("Usuarios cargados correctamente", typeSuccess)
        return {
          message: "Usuarios cargados correctamente",
          pagination: datas.pagination,
          users: datas.data
        }
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

export const updatePictureProfile = createAsyncThunk(
  "authSlice/updatePictureProfile", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/alumni/profile/picture",
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH", // or 'PUT'
          body: data
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Se actualizó la foto de perfil", typeSuccess)
        return {
          message: "Se actualizó la foto de perfil",
          picture: datas.data.profilePicture
        }
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

export const updateProfile = createAsyncThunk(
  "authSlice/updateProfile", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/alumni/update-profile",
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          profile: datas.data
        }
      } else {
        if (datas.message === "Error de validación") {
          throw `${datas.metadata.errors[0].message}`;
        }
        throw `${datas.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);