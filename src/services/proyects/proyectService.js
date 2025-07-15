import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../apiService";
import notify from "../../utils/notifications";

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
        notify.success("Proyecto creado", false)
        return {
          message: "Proyecto creado",
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
      notify.error(error, false)
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
          }`,
        {
          method: "GET",
        }
      );

      if (response.success) {
        notify.success("Proyectos cargados", true)
        return {
          message: "Proyectos cargados",
          proyects: response.data,
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
        notify.success("Proyecto cargado", true)
        return {
          message: "Proyecto cargado",
          proyectSelected: response.data,
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
        notify.success("Proyecto editado", false)
        return {
          projectId: data.projectId,
          message: "Proyecto editado",
          data: response.data,
          type: data.type
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
        notify.success(response.message, false);
        return {
          projectId: data.projectId,
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
        notify.success("Solicitud enviada", false)
        return {
          message: "Solicitud enviada",
          projectId: data.projectId
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
        notify.success("Te uniste al proyecto", false)
        return {
          message: "Te uniste al proyecto",
          projectId: data.projectId
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
        notify.success("Cargaron las solicitudes", true)
        return {
          message: "Cargaron las solicitudes",
          request: response.data
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
        notify.success("Respuesta enviada", false)
        return {
          message: "Respuesta enviada",
          project: response.data.project,
          status: response.data.status,
          requestId: data.requestId
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
        notify.success(response.message, false)
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
      notify.error(error, false)
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
        notify.success(response.message, false)
        return {
          message: response.message,
          projectId: data.projectId,
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
        notify.success(response.message, false)
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
      notify.error(error, false)
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
        notify.success("Cambió el rol del colaborador", false)
        return {
          message: "Cambió el rol del colaborador",
          data: response.data,
          username: data.data.username,
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