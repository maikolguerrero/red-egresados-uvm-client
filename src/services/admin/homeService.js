import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const getContentHome = createAsyncThunk(
  "homeSlice/getContentHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/home`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se cargo el contenido del home", typeSuccess)
        return {
          message: "Se cargo el contenido del home",
          home: datas.data
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

export const updateContentHome = createAsyncThunk(
  "homeSlice/updateContentHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/home`,
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
          homeUpdate: datas.data
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

export const addMediaHome = createAsyncThunk(
  "homeSlice/addMediaHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/home/carousel/media`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: data.data,
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se agrego la imagen a la galeria", typeSuccess)
        return {
          message: "Se agrego la imagen a la galeria",
          pictureCarrousel: datas.data
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

export const deleteMediaHome = createAsyncThunk(
  "homeSlice/deleteMediaHome", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/home/carousel/${data.index}`,
        {
          mode: "cors",
          credentials: "include",
          method: "DELETE",
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
          idItemCarrouse: data.idItem
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