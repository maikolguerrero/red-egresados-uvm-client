import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const addEvent = createAsyncThunk(
  "eventsSlice/addEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/events`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
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
        `${URL_API}/api/events/${data.eventId}/media/images`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
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
        `${URL_API}/api/events?page=${data.page}&limit=${data.limit}${
            data.type === null || data.type === undefined ? "" : "&type=" + data.type
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
          }${
            data.upcoming === null || data.upcoming === undefined ? "" : "&upcoming=" + data.upcoming
          }`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
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
        `${URL_API}/api/events/${data.id}`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
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

export const deleteEvent = createAsyncThunk(
  "eventsSlice/deleteEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/events/${data.eventId}`,
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
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess);
        return {
          eventId: data.eventId,
          message: datas.message,
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

export const editEvent = createAsyncThunk(
  "eventsSlice/editEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/events/${data.eventId}`,
        {
          mode: "cors",
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se edito el evento", typeSuccess);
        return {
          eventId: data.eventId,
          message: "Se edito el evento",
          data: datas.data,
          type: data.type
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

export const addAgenda = createAsyncThunk(
  "eventsSlice/addAgenda", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/events/${data.eventId}/save`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      console.log(datas);
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess);
        return {
          message: datas.message,
          userId: data.userId,
          eventId: data.eventId
        };
      } else {
        throw `${datas.message}`;
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
      const response = await fetch(
        `${URL_API}/api/events/${data.eventId}/unsave`,
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
      console.log(datas);
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess);
        return {
          message: datas.message,
          userId: data.userId,
          eventId: data.eventId
        };
      } else {
        throw `${datas.message}`;
      }
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);