import { createSlice } from '@reduxjs/toolkit'
import { addMediaCarrousel, addMediaSubSection, deleteMediaCarrousel, deleteMediaSubSection, getContentFooter, getContentLanding, updateContentLanding } from '../../services/admin/landingService';

export const landingSlice = createSlice({
  name: "landing",
  initialState: {
    loadingPage: false,
    loading: false,
    error: "",
    message: "",
    landingContent: {
      welcomeSections: [],
      faqs: [],
      footerText: "",
      carouselItems: [],
      featuredSections: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentLanding.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getContentLanding.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.landingContent = action.payload.landing;
    });
    builder.addCase(getContentLanding.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(getContentFooter.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getContentFooter.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.landingContent.footerText = action.payload.footer;
    });
    builder.addCase(getContentFooter.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(updateContentLanding.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateContentLanding.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.landingContent = action.payload.landingUpdate;
    });
    builder.addCase(updateContentLanding.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addMediaCarrousel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addMediaCarrousel.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.landingContent.carouselItems = [...state.landingContent.carouselItems, action.payload.pictureCarrousel]
    });
    builder.addCase(addMediaCarrousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteMediaCarrousel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMediaCarrousel.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newCarrousel = state.landingContent.carouselItems.filter(
        (item) => item.id !== action.payload.idItemCarrouse
      );
      state.landingContent.carouselItems = newCarrousel;
    });
    builder.addCase(deleteMediaCarrousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addMediaSubSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addMediaSubSection.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.landingContent.featuredSections[action.payload.sectionIndex].subsections[action.payload.subsectionIndex].image = action.payload.image
    });
    builder.addCase(addMediaSubSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteMediaSubSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMediaSubSection.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.landingContent.featuredSections[action.payload.sectionIndex].subsections[action.payload.subsectionIndex].image = null
    });
    builder.addCase(deleteMediaSubSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default landingSlice.reducer