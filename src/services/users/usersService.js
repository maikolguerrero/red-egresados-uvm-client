import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const getProfile = createAsyncThunk(
  "authSlice/getProfile", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/alumni/` + data.username,
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
      console.log("obtenido datas")
      console.log(datas)
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
        `${URL_API}/api/alumni/search?page=${data.page}&limit=${data.limit}${data.query === null || data.query === undefined ? "" : "&query=" + data.query
        }${data.degree === null || data.degree === undefined ? "" : "&degree=" + data.degree
        }${data.location === null || data.location === undefined ? "" : "&location=" + data.location
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

      console.log(`${URL_API}/api/alumni/search?page=${data.page}&limit=${data.limit}${data.query === null || data.query === undefined ? "" : "?query=" + data.query
        }${data.degree === null || data.degree === undefined ? "" : "?degree=" + data.degree
        }${data.location === null || data.location === undefined ? "" : "?location=" + data.location
        }`)
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
        `${URL_API}/api/alumni/profile/picture`,
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH",
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
        `${URL_API}/api/alumni/update-profile`,
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH",
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