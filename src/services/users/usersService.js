import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const getProfile = createAsyncThunk(
  "authSlice/getProfile",
  async (data, thunkAPI) => {
    try {
      const response = await apiFetch(`/api/alumni/${data.username}`, {
        method: "GET",
      });

      if (response.success) {
        enqueueSnackbar("Se ha obtenido el perfil", typeSuccess);
        return {
          message: "Se ha obtenido el perfil",
          profile: response.data,
        };
      } else {
        throw response.message || "Error al obtener el perfil";
      }
    } catch (error) {
      enqueueSnackbar(error, typeError);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const getUsers = createAsyncThunk(
  "authSlice/getUsers", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/alumni/search?page=${data.page}&limit=${data.limit}${data.query === null || data.query === undefined ? "" : "&query=" + data.query
        }${data.degree === null || data.degree === undefined ? "" : ("&degree=" + data.degree)
        }${data.location === null || data.location === undefined ? "" : ("&location=" + data.location)
        }${data.graduationYear === null || data.graduationYear === undefined ? "" : ("&graduationYear=" + data.graduationYear)
        }`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Usuarios cargados correctamente", typeSuccess)
        return {
          message: "Usuarios cargados correctamente",
          pagination: response.pagination,
          users: response.data
        }
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

export const updatePictureProfile = createAsyncThunk(
  "authSlice/updatePictureProfile", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(`/api/alumni/profile/picture`, {
        method: "PATCH",
        body: data,
      });

      if (response.success) {
        enqueueSnackbar("Se actualizó la foto de perfil", typeSuccess)
        return {
          message: "Se actualizó la foto de perfil",
          picture: response.data.profilePicture
        }
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

export const updateProfile = createAsyncThunk(
  "authSlice/updateProfile",
  async (data, thunkAPI) => {
    try {
      console.log(data)
      const response = await apiFetch("/api/alumni/update-profile", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)
      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          message: response.message,
          profile: response.data,
        };
      } else {
        if (response.message === "Error de validación") {
          throw response.metadata.errors[0].message;
        }
        throw response.message || "Error al actualizar el perfil";
      }
    } catch (error) {
      enqueueSnackbar(error, typeError);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);