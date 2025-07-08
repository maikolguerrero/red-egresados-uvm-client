import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";

export const getContentLanding = createAsyncThunk(
  "landingSlice/getContentLanding", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/landing`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargo el contenido landing", typeSuccess)
        return {
          message: "Se cargo el contenido landing",
          landing: response.data
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

export const getContentFooter = createAsyncThunk(
  "landingSlice/getContentFooter", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/content/landing/footer`,
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
      if (datas.success) {
        enqueueSnackbar("Se cargo el contenido del footer", typeSuccess)
        return {
          message: "Se cargo el contenido del footer",
          footer: datas.data
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
      const response = await apiFetch(
        `/api/content/landing`,
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
          landingUpdate: response.data
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

export const addMediaCarrousel = createAsyncThunk(
  "landingSlice/addMediaCarrousel", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/landing/carousel/media`,
        {
          method: "POST",
          body: data.data,
        }
      );

      if (response.success) {
        enqueueSnackbar("Se agrego la imagen al carrousel", typeSuccess)
        return {
          message: "Se agrego la imagen al carrousel",
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

export const deleteMediaCarrousel = createAsyncThunk(
  "landingSlice/deleteMediaCarrousel", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/landing/carousel/${data.index}`,
        {
          method: "DELETE",
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

export const addMediaSubSection = createAsyncThunk(
  "landingSlice/addMediaSubSection", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/landing/subsections/${data.sectionIndex}/${data.subsectionIndex}/image`,
        {
          method: "POST",
          body: data.data,
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          image: response.data,
          sectionIndex: data.sectionIndex,
          subsectionIndex: data.subsectionIndex
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

export const deleteMediaSubSection = createAsyncThunk(
  "landingSlice/deleteMediaSubSection", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/content/landing/subsections/${data.sectionIndex}/${data.subsectionIndex}/image`,
        {
          method: "DELETE",
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          sectionIndex: data.sectionIndex,
          subsectionIndex: data.subsectionIndex
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