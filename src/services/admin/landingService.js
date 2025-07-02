import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const getContentLanding = createAsyncThunk(
  "landingSlice/getContentLanding", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing`,
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
        enqueueSnackbar("Se cargo el contenido landing", typeSuccess)
        return {
          message: "Se cargo el contenido landing",
          landing: datas.data
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

export const updateContentLanding = createAsyncThunk(
  "landingSlice/updateContentLanding", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing`,
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
          landingUpdate: datas.data
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

export const addMediaCarrousel = createAsyncThunk(
  "landingSlice/addMediaCarrousel", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing/carousel/media`,
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
        enqueueSnackbar("Se agrego la imagen al carrousel", typeSuccess)
        return {
          message: "Se agrego la imagen al carrousel",
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

export const deleteMediaCarrousel = createAsyncThunk(
  "landingSlice/deleteMediaCarrousel", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing/carousel/${data.index}`,
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

export const addMediaSubSection = createAsyncThunk(
  "landingSlice/addMediaSubSection", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing/subsections/${data.sectionIndex}/${data.subsectionIndex}/image`,
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
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          image: datas.data,
          sectionIndex: data.sectionIndex,
          subsectionIndex: data.subsectionIndex
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

export const deleteMediaSubSection = createAsyncThunk(
  "landingSlice/deleteMediaSubSection", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing/subsections/${data.sectionIndex}/${data.subsectionIndex}/image`,
        {
          mode: "cors",
          credentials: "include",
          method: "DELETE",
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          sectionIndex: data.sectionIndex,
          subsectionIndex: data.subsectionIndex
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