import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { Bounce, toast } from "react-toastify";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";

export const addProyect = createAsyncThunk(
  "proyectsSlice/addProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects`,
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
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se creo el proyecto", typeSuccess)
        return {
          message: "Se creo el proyecto",
          proyect: datas.data
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

export const searchProyect = createAsyncThunk(
  "proyectsSlice/searchProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects?page=${data.page}&limit=${data.limit}${
            data.status === null || data.status === undefined ? "" : "&status=" + data.status
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
          }${
            data.username === null || data.username === undefined ? "" : "&username=" + data.username
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
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se cargaron los proyectos", typeSuccess)
        return {
          message: "Se cargaron los proyectos",
          proyects: datas.data,
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

export const getProyect = createAsyncThunk(
  "proyectsSlice/getProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.id}`,
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
        enqueueSnackbar("Se cargo el proyecto", typeSuccess)
        return {
          message: "Se cargo el proyecto",
          proyectSelected: datas.data,
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

export const editProyect = createAsyncThunk(
  "proyectsSlice/editProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}`,
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
        enqueueSnackbar("Se edito el proyecto", typeSuccess);
        return {
          projectId: data.projectId,
          message: "Se edito el proyecto",
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

export const deleteProject = createAsyncThunk(
  "proyectsSlice/deleteProject", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}`,
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
        enqueueSnackbar(datas.message, typeSuccess);
        return {
          projectId: data.projectId,
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

export const requestProyect = createAsyncThunk(
  "proyectsSlice/requestProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/request`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Se envio la solicitu", typeSuccess)
        return {
          message: "Se envio la solicitu",
          projectId: data.projectId
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

export const getRequestProyect = createAsyncThunk(
  "proyectsSlice/getRequestProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/requests`,
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
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar("Cargaron las solicitudes", typeSuccess)
        return {
          message: "Cargaron las solicitudes",
          request: datas.data
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

export const responseRequest = createAsyncThunk(
  "proyectsSlice/responseRequest", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/requests/${data.requestId}`,
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
        enqueueSnackbar("Completado la solicitud", typeSuccess)
        return {
          message: "Completado la solicitud",
          project: datas.data.project,
          status: datas.data.status,
          requestId: data.requestId
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

export const expelCollaborator = createAsyncThunk(
  "proyectsSlice/expelCollaborator", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/collaborators/${data.username}`,
        {
          mode: "cors",
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          projectId: data.projectId,
          username: data.username,
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

export const cancelRequest = createAsyncThunk(
  "proyectsSlice/cancelRequest", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/request`,
        {
          mode: "cors",
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          projectId: data.projectId,
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

export const leaveProyect = createAsyncThunk(
  "proyectsSlice/leaveProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/leave`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      let datas = await response.json();
      console.log(datas)
      if (datas.success) {
        enqueueSnackbar(datas.message, typeSuccess)
        return {
          message: datas.message,
          projectId: data.projectId,
          username: data.username
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

export const editRoleCollaborator = createAsyncThunk(
  "proyectsSlice/editRoleCollaborator", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/projects/${data.projectId}/collaborators/role`,
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
        enqueueSnackbar("Se cambio el rol del colaborador", typeSuccess)
        return {
          message: "Se cambio el rol del colaborador",
          data: datas.data,
          username: data.data.username,
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