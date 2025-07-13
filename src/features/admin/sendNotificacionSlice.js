import { createSlice } from '@reduxjs/toolkit'
import { sendNotification } from '../../services/admin/sendNotificationService';

export const sendNotificationSlice = createSlice({
  name: "sendNotification",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    notification: null,
  },
  reducers: {
    updateNotification: (state, action) => {
      state.loadingPage = false;
      state.loading = false;
      state.error = "";
      state.message = "";
      state.notification = action.payload.notification;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendNotification.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(sendNotification.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.notification = action.payload.notification;
    });
    builder.addCase(sendNotification.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });
  },
});

export default sendNotificationSlice.reducer