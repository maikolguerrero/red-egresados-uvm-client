import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import notify from "../../utils/notifications";

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
        notify.success("Hilo creado", false)
        return {
          message: "Hilo creado",
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
      notify.error(error, false)
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
        notify.success("Reporte enviado", false)
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
      notify.error(error, false)
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
        notify.success("Agregada la imagen al hilo", false)
        return {
          message: "Agregada la imagen al hilo"
        }
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

export const searchForum = createAsyncThunk(
  "authSlice/searchForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/threads?page=${data.page}&limit=${data.limit}${data.category === null || data.category === undefined ? "" : "&category=" + data.category
        }${data.search === null || data.search === undefined ? "" : "&search=" + data.search
        }${!data.sort || data.sort === undefined ? "" : "&sort=" + data.sort
        }${!data.username || data.username === undefined ? "" : "&username=" + data.username
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        notify.success("Se cargaron los hilos", true)
        return {
          message: "Se cargaron los hilos",
          forums: response.data,
          pagination: response.pagination
        }
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
          let message = "Has quitado tu like del hilo";
          if (response.data.isLiked) {
            message = "Has dado like al hilo";
          }

          notify.success(message, true)
          return {
            type: data.type,
            message: message,
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
            id: data.id,
          };
        }

        if (data.types === "replies") {
          notify.success("Like a la respuesta", true)
          return {
            type: data.types,
            message: "Like a la respuesta",
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
            id: data.id,
          };
        }

        if (data.type === "comment") {
          notify.success("Like al comentario", true)
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
      notify.error(error, true)
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
        notify.success("Cargado el hilo del foro", true)
        return {
          message: "Cargado el hilo del foro",
          forumSelected: response.data,
        }
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
          notify.success("Comentario agregado", false)
          return {
            idThread: response.data.thread,
            message: "Comentario agregado ",
            comment: response.data,
            type: data.type
          };
        } else {
          notify.success("Respondiste el comentario", false);
          return {
            idComment: response.data.parentComment,
            message: "Respondiste el comentario",
            comment: response.data,
            type: data.type
          };
        }
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
        notify.success(response.message, false);
        return {
          idThread: data.threadId,
          message: response.message,
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

export const deleteComment = createAsyncThunk(
  "authSlice/deleteComment", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/forum/comments/${data.commentId}`,
        {
          method: "DELETE"
        }
      );

      if (response.success) {
        notify.success(response.message, false);
        return {
          commentId: data.commentId,
          message: response.message,
          idComment: !data.idComment ? null : data.idComment
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
        notify.success("Hilo editado", false);
        return {
          idThread: data.threadId,
          message: "Hilo editado",
          data: response.data,
          type: data.type
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