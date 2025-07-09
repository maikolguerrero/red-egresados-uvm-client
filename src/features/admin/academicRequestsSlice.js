import { createSlice } from '@reduxjs/toolkit'
import { getContentAcademicRequests, updateContentAcademicRequests } from '../../services/admin/academicRequestsService';

export const academicRequestsSlice = createSlice({
  name: "academicRequests",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    academicRequests: null,
  },
  reducers: {
    updateAcademicRequests: (state, action) => {
      state.loadingPage = false;
      state.loading = false;
      state.error = "";
      state.message = "";
      state.academicRequests = action.payload.academicRequests;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContentAcademicRequests.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getContentAcademicRequests.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.academicRequests = action.payload.academicRequests;
    });
    builder.addCase(getContentAcademicRequests.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });


    builder.addCase(updateContentAcademicRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateContentAcademicRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.academicRequests = action.payload.academicRequestsUpdate;
    });
    builder.addCase(updateContentAcademicRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default academicRequestsSlice.reducer