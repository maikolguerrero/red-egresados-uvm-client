import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

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

      logger.log(response)
      if (response.success) {
        notify.success("Se listaron los Administradores", true)

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
      notify.error(error, true)
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

      logger.log(response)
      if (response.success) {
        notify.success("Admin registrado", false)
        return {
          message: "Admin registrado",
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
      notify.error(error, false)
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
        notify.success(response.message, false)
        return {
          username: data.username,
          message: response.message,
        };
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