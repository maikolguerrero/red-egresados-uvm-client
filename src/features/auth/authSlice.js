import { createSlice } from '@reduxjs/toolkit'
import {
  forgotPassword,
  loginUserFetch,
  logoutSesion,
  newPassword,
  postData,
  resendEmailFetch,
  verifyEmail,
  verifySesion } from '../../services/auth/authService';
import { changeEmail, changeEmailRecovery, changeRecoveryEmail, changeRecoveryPassword } from '../../services/auth/changeEmailService';

export const authSlice = createSlice({
  name: 'verification',
  initialState: {
    value: "No found",
    loading: true,
    error: "",
    message: "",
    sessionActive: false,
    email: "",
    id: "",
    username: "",
    role: "",
    verifyEmail: false,
    changeEmail: false,
    newPassword: false
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
      state.message = action.payload.message
      state.id = action.payload.id
      state.username = action.payload.username
      state.role = action.payload.role
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
      state.id = ""
      state.username = ""
      state.role = ""
      state.sessionActive = false
    });
    builder.addCase(logoutSesion.rejected, (state, action) => {
      state.sessionActive = false;
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

    builder.addCase(verifyEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.verifyEmail = true
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(changeRecoveryEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changeRecoveryEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
    });
    builder.addCase(changeRecoveryEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(changeEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changeEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.changeEmail = true
    });
    builder.addCase(changeEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.newPassword = false
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(newPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(newPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
      state.newPassword = true
    });
    builder.addCase(newPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(changeRecoveryPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changeRecoveryPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
    });
    builder.addCase(changeRecoveryPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(changeEmailRecovery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changeEmailRecovery.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
    });
    builder.addCase(changeEmailRecovery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
})

// Action creators are generated for each case reducer function
export const { actived, desactived } = authSlice.actions;

export default authSlice.reducer