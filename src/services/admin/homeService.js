import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import notify from "../../utils/notifications";

export const getContentHome = createAsyncThunk(
  "homeSlice/getContentHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/home`,
        {
          method: "GET"
        }
      );

      if (response.success) {
        notify.success("Cargado el contenido del home", true)
        return {
          message: "Cargado el contenido del home",
          home: response.data
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

export const updateContentHome = createAsyncThunk(
  "homeSlice/updateContentHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/home`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.success) {
        notify.success(response.message, false)
        return {
          message: response.message,
          homeUpdate: response.data
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

export const addMediaHome = createAsyncThunk(
  "homeSlice/addMediaHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/home/carousel/media`,
        {
          method: "POST",
          body: data.data,
        }
      );

      if (response.success) {
        notify.success("Imagen agregada a la galeria", false)
        return {
          message: "Imagen agregada a la galeria",
          pictureCarrousel: response.data
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

export const deleteMediaHome = createAsyncThunk(
  "homeSlice/deleteMediaHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/home/carousel/${data.index}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        notify.success(response.message, false)
        return {
          message: response.message,
          idItemCarrouse: data.idItem
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