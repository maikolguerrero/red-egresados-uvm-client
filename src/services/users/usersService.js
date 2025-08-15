import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

export const getProfile = createAsyncThunk(
  "authSlice/getProfile",
  async (data, thunkAPI) => {
    try {
      const response = await apiFetch(`/api/alumni/${data.username}`, {
        method: "GET",
      });

      if (response.success) {
        notify.success("Obtenido el perfil", true)
        return {
          success: true,
          message: "Obtenido el perfil",
          profile: response.data,
        };
      } else {
        return {
          success: false,
          message: "Usuario no encontrado",
        }
      }
    } catch (error) {
      notify.error(error, true)
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
        notify.success("Egresados cargados correctamente", true)

        return {
          message: "Egresados cargados correctamente",
          pagination: response.pagination,
          users: response.data
        }
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
        notify.success("Actualizada la foto de perfil", false)
        return {
          message: "Actualizada la foto de perfil",
          picture: response.data.profilePicture
        }
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

export const updateProfile = createAsyncThunk(
  "authSlice/updateProfile",
  async (data, thunkAPI) => {
    try {
      logger.log(data)
      const response = await apiFetch("/api/alumni/update-profile", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      logger.log(response)
      if (response.success) {
        notify.success(response.message, false)
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
      notify.error(error, false)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);