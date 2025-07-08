import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";

export const getAdmins = createAsyncThunk(
  "adminsSlice/getAdmins", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/auth/admins`,
        {
          method: "GET"
        }
      );

      console.log(response)
      if (response.success) {
        enqueueSnackbar("Se listaron los Administradores", typeSuccess)
        return {
          message: "Se listaron los Administradores",
          admins: response.data,
          pagination: response.pagination
        };
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

export const addAdmin = createAsyncThunk(
  "adminsSlice/addAdmin", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/auth/register/admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      console.log(response)
      if (response.success) {
        enqueueSnackbar("Se registro el admin", typeSuccess)
        return {
          message: "Se registro el admin",
          admin: response.data
        }
      } else {
        if (response.message === "Error de validación") {
          throw `${response.metadata.errors[0].message}`
        }
        throw `${response.message}`;
      }

    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "adminsSlice/deleteAdmin", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/auth/admin/${data.username}`,
        {
          method: "DELETE"
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          username: data.username,
          message: response.message,
        };
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