import { createSlice } from '@reduxjs/toolkit'
import { addMediaHome, deleteMediaHome, getContentHome, updateContentHome } from '../../services/admin/homeService';

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    homeContent: {
      welcomeSections: [],
      carouselItems: [],
      featuredSections: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentHome.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getContentHome.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.homeContent = action.payload.home;
    });
    builder.addCase(getContentHome.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(updateContentHome.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateContentHome.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.homeContent = action.payload.homeUpdate;
    });
    builder.addCase(updateContentHome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addMediaHome.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addMediaHome.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.homeContent.carouselItems = [
        ...state.homeContent.carouselItems,
        action.payload.pictureCarrousel,
      ];
    });
    builder.addCase(addMediaHome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteMediaHome.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMediaHome.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newCarrousel = state.homeContent.carouselItems.filter(
        (item) => item.id !== action.payload.idItemCarrouse
      );
      state.homeContent.carouselItems = newCarrousel;
    });
    builder.addCase(deleteMediaHome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer