import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { apiFetch } from "../apiService";

export const addProyect = createAsyncThunk(
  "proyectsSlice/addProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.success) {
        enqueueSnackbar("Se creo el proyecto", typeSuccess)
        return {
          message: "Se creo el proyecto",
          proyect: response.data
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

export const searchProyect = createAsyncThunk(
  "proyectsSlice/searchProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects?page=${data.page}&limit=${data.limit}${
            data.status === null || data.status === undefined ? "" : "&status=" + data.status
          }${
            data.search === null || data.search === undefined ? "" : "&search=" + data.search
          }${
            data.username === null || data.username === undefined ? "" : "&username=" + data.username
          }${
            !data.sort || data.sort === undefined ? "" : "&sort=" + data.sort
          }${
            !data.isPersonal || data.isPersonal === undefined ? "" : "&isPersonal=" + data.isPersonal
          }`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargaron los proyectos", typeSuccess)
        return {
          message: "Se cargaron los proyectos",
          proyects: response.data,
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

export const getProyect = createAsyncThunk(
  "proyectsSlice/getProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.id}`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cargo el proyecto", typeSuccess)
        return {
          message: "Se cargo el proyecto",
          proyectSelected: response.data,
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

export const editProyect = createAsyncThunk(
  "proyectsSlice/editProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data.data),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.success) {
        enqueueSnackbar("Se edito el proyecto", typeSuccess);
        return {
          projectId: data.projectId,
          message: "Se edito el proyecto",
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

export const deleteProject = createAsyncThunk(
  "proyectsSlice/deleteProject", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}`,
        {
          method: "DELETE",
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess);
        return {
          projectId: data.projectId,
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

export const requestProyect = createAsyncThunk(
  "proyectsSlice/requestProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/request`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar("Se envio la solicitud", typeSuccess)
        return {
          message: "Se envio la solicitud",
          projectId: data.projectId
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

export const joinProyect = createAsyncThunk(
  "proyectsSlice/joinProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/join`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar("Te uniste al proyecto", typeSuccess)
        return {
          message: "Te uniste al proyecto",
          projectId: data.projectId,
          collaborators: response.data
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

export const getRequestProyect = createAsyncThunk(
  "proyectsSlice/getRequestProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/requests`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        enqueueSnackbar("Cargaron las solicitudes", typeSuccess)
        return {
          message: "Cargaron las solicitudes",
          request: response.data
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

export const responseRequest = createAsyncThunk(
  "proyectsSlice/responseRequest", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/requests/${data.requestId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data.data),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.success) {
        enqueueSnackbar("Completado la solicitud", typeSuccess)
        return {
          message: "Completado la solicitud",
          project: response.data.project,
          status: response.data.status,
          requestId: data.requestId
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

export const expelCollaborator = createAsyncThunk(
  "proyectsSlice/expelCollaborator", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/collaborators/${data.username}`,
        {
          method: "DELETE"
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          projectId: data.projectId,
          username: data.username,
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

export const cancelRequest = createAsyncThunk(
  "proyectsSlice/cancelRequest", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/request`,
        {
          method: "DELETE",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          projectId: data.projectId,
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

export const leaveProyect = createAsyncThunk(
  "proyectsSlice/leaveProyect", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/leave`,
        {
          method: "POST",
          body: data.data
        }
      );

      if (response.success) {
        enqueueSnackbar(response.message, typeSuccess)
        return {
          message: response.message,
          projectId: data.projectId,
          username: data.username
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

export const editRoleCollaborator = createAsyncThunk(
  "proyectsSlice/editRoleCollaborator", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await apiFetch(
        `/api/projects/${data.projectId}/collaborators/role`,
        {
          method: "PATCH",
          body: JSON.stringify(data.data),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.success) {
        enqueueSnackbar("Se cambio el rol del colaborador", typeSuccess)
        return {
          message: "Se cambio el rol del colaborador",
          data: response.data,
          username: data.data.username,
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