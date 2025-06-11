import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { Bounce, toast } from "react-toastify";
import { typeError, typeSuccess } from "../../models/alertModels";

export const addEvent = createAsyncThunk(
  "eventsSlice/addEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/events",
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se ha creado el evento sin foto", typeSuccess)
        return {
          message: "Se ha creado el evento sin foto",
          data: datas.data
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

export const addPictureEvent = createAsyncThunk(
  "eventsSlice/addPictureEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + `/api/events/${data.eventId}/media/images`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
          body: data.data
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se agrego la imagen al evento", typeSuccess)
        return {
          message: "Se agrego la imagen al evento",
          media: datas.data.image
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

export const searchEvent = createAsyncThunk(
  "eventsSlice/searchEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" +
          `/api/events?page=${data.page}&limit=${data.limit}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se cargaron los eventos", typeSuccess)
        return {
          message: "Se cargaron los eventos",
          events: datas.data,
          pagination: datas.pagination
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

export const getEvent = createAsyncThunk(
  "eventsSlice/getEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" +
          `/api/events/${data.id}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Se cargo el evento", typeSuccess)
        return {
          message: "Se cargo el evento",
          eventSelected: datas.data,
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