import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";

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
        enqueueSnackbar("Se cargo el contenido del home", typeSuccess)
        return {
          message: "Se cargo el contenido del home",
          home: response.data
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
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          homeUpdate: response.data
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
        enqueueSnackbar("Se agrego la imagen a la galeria", typeSuccess)
        return {
          message: "Se agrego la imagen a la galeria",
          pictureCarrousel: response.data
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
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          idItemCarrouse: data.idItem
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