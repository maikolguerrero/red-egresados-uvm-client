import { createSlice } from '@reduxjs/toolkit'
import { getContentStats } from '../../services/admin/statsService';

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    statsContent: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentStats.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getContentStats.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.statsContent = action.payload.stats;
    });
    builder.addCase(getContentStats.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });
  },
});

export default statsSlice.reducer;