import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { loginUserFetch, postData } from '../services/usersService';
import { logoutSesion, resendEmailFetch, verifySesion } from '../services/auth/authService';

export const authSlice = createSlice({
  name: 'verification',
  initialState: {
    value: "No found",
    loading: false,
    error: "",
    message: "",
    sessionActive: false,
    email: "",
    id: "",
    username: "",
    role: ""
  },
  reducers: {
    actived: (state) => {
      state.value = "Verification"
    },
    desactived: (state) => {
      state.value = "No found"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.loading = false;
      state.value = "Verification";
      state.message = action.payload.message
      state.email = action.payload.email
    });
    builder.addCase(postData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(loginUserFetch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUserFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload
      state.sessionActive = true
    });
    builder.addCase(loginUserFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(verifySesion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifySesion.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.id = action.payload.id
      state.username = action.payload.username
      state.role = action.payload.role
      state.sessionActive = true
    });
    builder.addCase(verifySesion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(logoutSesion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutSesion.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload
      state.sessionActive = false
    });
    builder.addCase(logoutSesion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(resendEmailFetch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resendEmailFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload
      state.sessionActive = false
    });
    builder.addCase(resendEmailFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
})

// Action creators are generated for each case reducer function
export const { actived, desactived } = authSlice.actions;

export default authSlice.reducer