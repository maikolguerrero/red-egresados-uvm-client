import { createSlice } from '@reduxjs/toolkit'
import { getProfile, getUsers, updatePictureProfile, updateProfile } from '../../services/users/usersService';

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pagination: {
      total: 0,
      page: 1,
      pages: 0,
      limit: 12,
    },
    loading: false,
    error: "",
    message: "",
    profile: null,
  },
  reducers: {
    onChangePage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.profile = action.payload.profile;
      state.email = action.payload.email;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.pagination = action.payload.pagination;
      state.users = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updatePictureProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePictureProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.profile.user.profilePicture = action.payload.picture;
    });
    builder.addCase(updatePictureProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.profile.profile = action.payload.profile
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { onChangePage } = usersSlice.actions;

export default usersSlice.reducer