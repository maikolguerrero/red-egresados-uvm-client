import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const addEvent = createAsyncThunk(
  "eventsSlice/addEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.success) {
        enqueueSnackbar("Se ha creado el evento sin foto", typeSuccess)
        return {
          message: "Se ha creado el evento sin foto",
          data: response.data
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

export const addPictureEvent = createAsyncThunk(
  "eventsSlice/addPictureEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}/media/images`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar("Se agrego la imagen al evento", typeSuccess)
        return {
          message: "Se agrego la imagen al evento",
          media: response.data.image
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

export const searchEvent = createAsyncThunk(
  "eventsSlice/searchEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events?page=${data.page}&limit=${data.limit}${
            data.type === null || data.type === undefined ? "" : "&type=" + data.type
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
          }${
            data.upcoming === null || data.upcoming === undefined ? "" : "&upcoming=" + data.upcoming
          }`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargaron los eventos", typeSuccess)
        return {
          message: "Se cargaron los eventos",
          events: response.data,
          pagination: response.pagination
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

export const getEvent = createAsyncThunk(
  "eventsSlice/getEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.id}`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargo el evento", typeSuccess)
        return {
          message: "Se cargo el evento",
          eventSelected: response.data,
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

export const deleteEvent = createAsyncThunk(
  "eventsSlice/deleteEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          eventId: data.eventId,
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

export const editEvent = createAsyncThunk(
  "eventsSlice/editEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );
      // console.log(JSON.stringify(response))

      if (response.success) {
        enqueueSnackbar("Se edito el evento", typeSuccess);
        return {
          eventId: data.eventId,
          message: "Se edito el evento",
          data: response.data,
          type: data.type
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

export const addAgenda = createAsyncThunk(
  "eventsSlice/addAgenda", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}/save`,
        {
          method: "POST",
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          message: response.message,
          userId: data.userId,
          eventId: data.eventId
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const deleteAgenda = createAsyncThunk(
  "eventsSlice/deleteAgenda", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}/unsave`,
        {
          method: "DELETE",
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          message: response.message,
          userId: data.userId,
          eventId: data.eventId
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);