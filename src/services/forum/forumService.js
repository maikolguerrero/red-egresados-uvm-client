import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const addForum = createAsyncThunk(
  "authSlice/addForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Se creo el foro", typeSuccess)
        return {
          message: "Se creo el foro",
          forum: datas.data
        }
      } else {
        if (datas.message === "Error de validación") {
          throw `${datas.metadata.errors[0].message}`
        }
        throw `${datas.message}`;
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
      const response = await fetch(
        `${URL_API}/api/forum/report`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Reporte enviado", typeSuccess)
        return {
          message: "Reporte enviado",
        }
      } else {
        if (datas.message === "Error de validación") {
          throw `${datas.metadata.errors[0].message}`
        }
        throw `${datas.message}`;
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
      const response = await fetch(
        `${URL_API}/api/forum/threads/${data.threadId}/media/images`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: data.data
        }
      );

      let datas = await response.json();
      if (datas.success) {
        enqueueSnackbar("Se agrego la foto al foro", typeSuccess)
        return {
          message: "Se agrego la foto al foro"
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

export const searchForum = createAsyncThunk(
  "authSlice/searchForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads?page=${data.page}&limit=${data.limit}${
            data.category === null || data.category === undefined ? "" : "&category=" + data.category
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
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
        enqueueSnackbar("Se cargaron los foros", typeSuccess)
        return {
          message: "Se cargaron los foros",
          forums: datas.data,
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

export const likeThreads = createAsyncThunk(
  "authSlice/likeThreads", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/like/${data.type}/${data.id}`,
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
      if (datas.success) {
        if (data.type === "thread") {
          let message = "Has quitado tu like del foro";
          if (datas.data.isLike) {
            message = "Has dado like al foro";
          }

          enqueueSnackbar(message, typeSuccess);
          return {
            type: data.type,
            message: message,
            isLiked: datas.data.isLiked,
            likeCount: datas.data.likeCount,
            id: data.id,
          };
        }

        if (data.types === "replies") {
          enqueueSnackbar("Like a la respuesta", typeSuccess);
          return {
            type: data.types,
            message: "Like a la respuesta",
            isLiked: datas.data.isLiked,
            likeCount: datas.data.likeCount,
            id: data.id,
          };
        }
        
        if (data.type === "comment") {
          enqueueSnackbar("Like al comentario", typeSuccess);
          return {
            type: data.type,
            message: "Like al comentario",
            isLiked: datas.data.isLiked,
            likeCount: datas.data.likeCount,
            id: data.id,
          };
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

export const getThreadsComments = createAsyncThunk(
  "authSlice/getThreadsComments", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads/${data.id}`,
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
        enqueueSnackbar("Cargo el foro", typeSuccess)
        return {
          message: "Cargo el foro",
          forumSelected: datas.data,
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

export const addComment = createAsyncThunk(
  "authSlice/addComment", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads/${data.id}/comments`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: data.data
        }
      );

      let datas = await response.json();
      if (datas.success) {
        if (data.type === "thread") {
          enqueueSnackbar("Comentaste", typeSuccess);
          return {
            idThread: datas.data.thread,
            message: "Comentaste",
            comment: datas.data,
            type: data.type
          };
        } else {
          enqueueSnackbar("Respondiste el comentario", typeSuccess);
          return {
            idComment: datas.data.parentComment,
            message: "Comentaste",
            comment: datas.data,
            type: data.type
          };
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

export const deleteForum = createAsyncThunk(
  "authSlice/deleteForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads/${data.threadId}`,
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
          idThread: data.threadId,
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

export const editForum = createAsyncThunk(
  "authSlice/editForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/forum/threads/${data.threadId}`,
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
      if (datas.success) {
        enqueueSnackbar("Se edito el foro", typeSuccess);
        return {
          idThread: data.threadId,
          message: "Se edito el foro",
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