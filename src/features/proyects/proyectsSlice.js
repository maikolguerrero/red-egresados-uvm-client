import { createSlice } from "@reduxjs/toolkit";
import {
  addProyect,
  cancelRequest,
  deleteProject,
  editProyect,
  editRoleCollaborator,
  expelCollaborator,
  getProyect,
  getRequestProyect,
  leaveProyect,
  requestProyect,
  responseRequest,
  searchProyect,
} from "../../services/proyects/proyectService";

export const proyectsSlice = createSlice({
  name: "proyects",
  initialState: {
    proyects: [],
    proyectSelect: {},
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    loading: false,
    loadingPage: false,
    error: "",
    message: "",
  },
  reducers: {
    selectedForum: (state, action) => {
      state.forumSelect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProyect.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProyect.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      action.payload.proyect.collaborators[0].user = action.payload.proyect.owner
      state.proyects = [...state.proyects, action.payload.proyect];
    });
    builder.addCase(addProyect.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchProyect.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(searchProyect.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.proyects = action.payload.proyects;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(searchProyect.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(getProyect.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getProyect.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.proyectSelect = action.payload.proyectSelected;
      state.loadingPage = false;
    });
    builder.addCase(getProyect.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(editProyect.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editProyect.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      if (action.payload.type === "edit") {
        let newProjects = [];
        for (let i = 0; i < state.proyects.length; i++) {
          if (state.proyects[i].id === action.payload.projectId) {
            action.payload.data.owner = state.proyects[i].owner;
            action.payload.data.collaborators = state.proyects[i].collaborators;
            newProjects.push(action.payload.data);
          } else {
            newProjects.push(state.proyects[i]);
          }
        }
        state.proyects = newProjects;
      } else {
        action.payload.data.owner = state.proyectSelect.owner;
        action.payload.data.collaborators = state.proyectSelect.collaborators;
        state.proyectSelect = action.payload.data;
      }
    });
    builder.addCase(editProyect.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newProject = state.proyects.filter(
        (item) => item.id !== action.payload.projectId
      );
      state.proyects = newProject;
      if (state.proyectSelect.id === action.payload.projectId) {
        state.proyectSelect = {};
      }
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(requestProyect.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(requestProyect.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newProjects = [];
      for (let i = 0; i < state.proyects.length; i++) {
        if (state.proyects[i].id === action.payload.projectId) {
          let editProyect = state.proyects[i];
          editProyect.hasPendingRequest = true;
          newProjects.push(editProyect);
        } else {
          newProjects.push(state.proyects[i]);
        }
      }
      state.proyects = newProjects;

      if (action.payload.projectId === state.proyectSelect.id) {
        let editSelect = state.proyectSelect;
        editSelect.hasPendingRequest = true;
        state.proyectSelect = editSelect;
      }
    });
    builder.addCase(requestProyect.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getRequestProyect.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRequestProyect.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.proyectSelect.request = action.payload.request;
    });
    builder.addCase(getRequestProyect.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(responseRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(responseRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.proyectSelect.collaborators = action.payload.project.collaborators;
      let newRequest = [];
      for (let i = 0; i < state.proyectSelect.request.length; i++) {
        if (state.proyectSelect.request[i].id === action.payload.requestId) {
          let requestEdit = state.proyectSelect.request[i];
          requestEdit.status = action.payload.status;
          newRequest.push(requestEdit);
        } else {
          newRequest.push(state.proyectSelect.request[i]);
        }
      }
    });
    builder.addCase(responseRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(expelCollaborator.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(expelCollaborator.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newCollaborators = state.proyectSelect.collaborators.filter(
        (item) => item.user.username !== action.payload.username
      );
      state.proyectSelect.collaborators = newCollaborators;
    });
    builder.addCase(expelCollaborator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(cancelRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newProjects = [];
      for (let i = 0; i < state.proyects.length; i++) {
        if (state.proyects[i].id === action.payload.projectId) {
          let editProyect = state.proyects[i];
          editProyect.hasPendingRequest = false;
          newProjects.push(editProyect);
        } else {
          newProjects.push(state.proyects[i]);
        }
      }
      state.proyects = newProjects;

      if (action.payload.projectId === state.proyectSelect.id) {
        let editSelect = state.proyectSelect;
        editSelect.hasPendingRequest = false;
        state.proyectSelect = editSelect;
      }
    });
    builder.addCase(cancelRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(leaveProyect.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(leaveProyect.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.proyectSelect.isCollaborator = false;
      state.proyectSelect.collaborators = state.proyectSelect.collaborators.filter(
        (item) => item.user.username !== action.payload.username
      );
    });
    builder.addCase(leaveProyect.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(editRoleCollaborator.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editRoleCollaborator.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newCollaborators = [];
      for (let i = 0; i < state.proyectSelect.collaborators.length; i++) {
        if (
          state.proyectSelect.collaborators[i].user.username ===
          action.payload.username
        ) {
          newCollaborators.push(action.payload.data)
        } else {
          newCollaborators.push(state.proyectSelect.collaborators[i])
        }
      }
      state.proyectSelect.collaborators = newCollaborators
    });
    builder.addCase(editRoleCollaborator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = proyectsSlice.actions;

export default proyectsSlice.reducer;
