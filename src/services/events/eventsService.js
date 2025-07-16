import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

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
        notify.success("Creado el evento sin imagen", false);

        return {
          message: "Creado el evento sin imagen",
          data: response.data
        };
      } else {
        throw `${response.metadata.errors[0].message}`;

      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
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
        notify.success("Agregada la imagen al evento", false);
        return {
          message: "Agregada la imagen al evento",
          media: response.data.image,
          internal: data.internal,
          eventId: data.eventId
        }
      } else {
        throw `${response.message}`;
      }

    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
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
        `/api/events?page=${data.page}&limit=${data.limit}${data.type === null || data.type === undefined ? "" : "&type=" + data.type
        }${data.search === null || data.search === undefined ? "" : "&search=" + data.search
        }${data.upcoming === null || data.upcoming === undefined ? "" : "&upcoming=" + data.upcoming
        }`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        notify.success("Se cargaron los eventos", true);
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
      notify.error(error, true);
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
        notify.success("Cargado el evento", true);
        return {
          message: "Cargado el evento",
          eventSelected: response.data,
        }
      } else {
        throw `${response.message}`;
      }

    } catch (error) {
      // Gestionar errores
      notify.error(error, true);
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
        notify.success(response.message, false);
        return {
          eventId: data.eventId,
          message: response.message,
        };
      } else {
        throw `${response.message}`;
      }

    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
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

      if (response.success) {
        notify.success("Evento editado", false);
        return {
          eventId: data.eventId,
          message: "Evento editado",
          data: response.data,
          type: data.type
        };
      } else {
        throw `${response.metadata.errors[0].message}`;
      }

    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
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
        notify.success(response.message, false);
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
      notify.error(error, false);
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
        notify.success(response.message, false);
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
      notify.error(error, false);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const deletePictureEvent = createAsyncThunk(
  "eventsSlice/deletePictureEvent", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/events/${data.eventId}/media/images/${data.imageId}`,
        {
          method: "DELETE",
        }
      );

      logger.log(response)
      if (response.success) {
        notify.success(response.message, false);
        return {
          message: response.message,
          eventId: data.eventId,
          internal: data.internal,
        };
      } else {
        throw `${response.message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false);
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);