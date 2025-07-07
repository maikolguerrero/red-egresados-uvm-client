import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const addForum = createAsyncThunk(
  "authSlice/addForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      if (response.success) {
        enqueueSnackbar("Se creo el foro", typeSuccess)
        return {
          message: "Se creo el foro",
          forum: response.data
        }
      } else {
        if (response.message === "Error de validación") {
          throw `${response.metadata.errors[0].message}`
        }
        throw `${response.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const addReport = createAsyncThunk(
  "forumsSlice/addReport", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      if (response.success) {
        enqueueSnackbar("Reporte enviado", typeSuccess)
        return {
          message: "Reporte enviado",
        }
      } else {
        if (response.message === "Error de validación") {
          throw `${response.metadata.errors[0].message}`
        }
        throw `${response.message}`;
      }
      
    } catch (error) {
      // Gestionar errores
      enqueueSnackbar(error, typeError)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const addPictureForum = createAsyncThunk(
  "authSlice/addPictureForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads/${data.threadId}/media/images`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar("Se agrego la foto al foro", typeSuccess)
        return {
          message: "Se agrego la foto al foro"
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

export const searchForum = createAsyncThunk(
  "authSlice/searchForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads?page=${data.page}&limit=${data.limit}${
            data.category === null || data.category === undefined ? "" : "&category=" + data.category
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
          }${
            !data.sort || data.sort === undefined ? "" : "&sort=" + data.sort
          }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargaron los foros", typeSuccess)
        return {
          message: "Se cargaron los foros",
          forums: response.data,
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

export const likeThreads = createAsyncThunk(
  "authSlice/likeThreads", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/like/${data.type}/${data.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        if (data.type === "thread") {
          let message = "Has quitado tu like del foro";
          if (response.data.isLike) {
            message = "Has dado like al foro";
          }

          enqueueSnackbar(message, typeSuccess);
          return {
            type: data.type,
            message: message,
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
            id: data.id,
          };
        }

        if (data.types === "replies") {
          enqueueSnackbar("Like a la respuesta", typeSuccess);
          return {
            type: data.types,
            message: "Like a la respuesta",
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
            id: data.id,
          };
        }
        
        if (data.type === "comment") {
          enqueueSnackbar("Like al comentario", typeSuccess);
          return {
            type: data.type,
            message: "Like al comentario",
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
            id: data.id,
          };
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

export const getThreadsComments = createAsyncThunk(
  "authSlice/getThreadsComments", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads/${data.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        enqueueSnackbar("Cargo el foro", typeSuccess)
        return {
          message: "Cargo el foro",
          forumSelected: response.data,
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

export const addComment = createAsyncThunk(
  "authSlice/addComment", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads/${data.id}/comments`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        if (data.type === "thread") {
          enqueueSnackbar("Comentaste", typeSuccess);
          return {
            idThread: response.data.thread,
            message: "Comentaste",
            comment: response.data,
            type: data.type
          };
        } else {
          enqueueSnackbar("Respondiste el comentario", typeSuccess);
          return {
            idComment: response.data.parentComment,
            message: "Comentaste",
            comment: response.data,
            type: data.type
          };
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

export const deleteForum = createAsyncThunk(
  "authSlice/deleteForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads/${data.threadId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          idThread: data.threadId,
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

export const editForum = createAsyncThunk(
  "authSlice/editForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads/${data.threadId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );

      if (response.success) {
        enqueueSnackbar("Se edito el foro", typeSuccess);
        return {
          idThread: data.threadId,
          message: "Se edito el foro",
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