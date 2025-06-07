import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { Bounce, toast } from "react-toastify";
import { typeError, typeSuccess } from "../../models/alertModels";

export const addForum = createAsyncThunk(
  "authSlice/addForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + "/api/forum/threads",
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
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

export const addPictureForum = createAsyncThunk(
  "authSlice/addPictureForum", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        "http://localhost:3000" + `/api/forum/threads/${data.threadId}/media/images`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
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
        "http://localhost:3000" +
          `/api/forum/threads?page=${data.page}&limit=${data.limit}`,
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
        "http://localhost:3000" + `/api/forum/like/${data.type}/${data.id}`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
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
        "http://localhost:3000" +
          `/api/forum/threads/${data.id}`,
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
        "http://localhost:3000" +
          `/api/forum/threads/${data.id}/comments`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST", // or 'PUT'
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