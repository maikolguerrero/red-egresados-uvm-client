import { createSlice } from '@reduxjs/toolkit'
import { addEvent, addPictureEvent, getEvent, searchEvent } from '../../services/events/eventsService';

export const eventsSlice = createSlice({
  name: "forums",
  initialState: {
    events: [],
    eventSelect: {},
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    eventAdd: {
      data: null,
      passed: 0,
    },
    loading: false,
    error: "",
    message: "",
  },
  reducers: {
    finishEventAdd: (state) => {
      let newEvent = state.eventAdd.data;
      state.events = [...state.events, newEvent]
      state.eventAdd = {
        data: null,
        passed: 0,
      };
    },
    selectedForum: (state, action) => {
      state.eventSelect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.eventAdd.data = action.payload.data;
      state.eventAdd.passed = 1;
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addPictureEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPictureEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newEvent = state.eventAdd.data;
      newEvent.media = [action.payload.media];
      state.events = [...state.events, newEvent];
      state.eventAdd = {
        data: null,
        passed: 0,
      };
    });
    builder.addCase(addPictureEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.events = action.payload.events;
      state.pagination = action.payload.pagination
    });
    builder.addCase(searchEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.eventSelect = action.payload.eventSelected;
    });
    builder.addCase(getEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { finishEventAdd } = eventsSlice.actions;

export default eventsSlice.reducer