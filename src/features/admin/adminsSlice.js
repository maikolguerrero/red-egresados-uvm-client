import { createSlice } from '@reduxjs/toolkit'
import { addAdmin, deleteAdmin, getAdmins } from '../../services/admin/adminsService';

export const adminsSlice = createSlice({
  name: "home",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    admins: [],
    pagination: { total: 0, page: 1, pages: 0, limit: 12 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdmins.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.admins = action.payload.admins;
      state.pagination = action.payload.pagination
    });
    builder.addCase(getAdmins.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(addAdmin.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.admins = [action.payload.admin, ...state.admins];
    });
    builder.addCase(addAdmin.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteAdmin.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      let newAdmins = state.admins.filter((item) => item.username !== action.payload.username)
      state.admins = newAdmins;
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });
  },
});

export default adminsSlice.reducer