import { createSlice } from '@reduxjs/toolkit'
import { addGraduatesPregrado, addGraduatesPostgrado } from '../../services/admin/graduatesService';

export const manageGraduatesSlice = createSlice({
  name: "manageGraduates",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    egresadosPregrado: null,
    egresadosPostgrado: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addGraduatesPregrado.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGraduatesPregrado.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.egresadosPregrado = action.payload.data;
    });
    builder.addCase(addGraduatesPregrado.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addGraduatesPostgrado.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGraduatesPostgrado.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.egresadosPostgrado = action.payload.data;
    });
    builder.addCase(addGraduatesPostgrado.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default manageGraduatesSlice.reducer;