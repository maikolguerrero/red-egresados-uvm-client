import { createSlice } from '@reduxjs/toolkit'
import { addAgenda, addEvent, addPictureEvent, deleteAgenda, deleteEvent, deletePictureEvent, editEvent, getEvent, searchEvent } from '../../services/events/eventsService';
import logger from '../../utils/logger';

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
    loadingPage: false,
    error: "",
    message: "",
  },
  reducers: {
    finishEventAdd: (state) => {
      let newEvent = state.eventAdd.data;
      state.events = [...state.events, newEvent];
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
      state.events = [...state.events, action.payload.data];
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
      if (action.payload.internal) {
        state.eventSelect.media = [action.payload.media]
      } else {
        if (state.eventAdd.passed === 1) {
          let newEvent = state.eventAdd.data;
          newEvent.media = [action.payload.media];
          state.events = [...state.events, newEvent];
          state.eventAdd = {
            data: null,
            passed: 0,
          };
        } else {
          let newEvents = [];
          for (let i = 0; i < state.events.length; i++) {
            if (state.events[i].id === action.payload.eventId) {
              let editEvent = state.events[i];
              editEvent.media = [action.payload.media];
              newEvents.push(editEvent);
            } else {
              newEvents.push(state.events[i]);
            }
          }
          state.events = newEvents;
        }
      }

    });
    builder.addCase(addPictureEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchEvent.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(searchEvent.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.events = action.payload.events;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(searchEvent.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(getEvent.pending, (state) => {
      state.loadingPage = true;
      state.error = null;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.loadingPage = false;
      state.message = action.payload.message;
      state.eventSelect = action.payload.eventSelected;
    });
    builder.addCase(getEvent.rejected, (state, action) => {
      state.loadingPage = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newEvents = state.events.filter(
        (item) => item.id !== action.payload.eventId
      );
      state.events = newEvents;
      if (state.eventSelect.id === action.payload.eventId) {
        state.eventSelect = {};
      }
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(editEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      if (action.payload.type === "edit") {
        let newEvents = [];
        for (let i = 0; i < state.events.length; i++) {
          if (state.events[i].id === action.payload.eventId) {
            newEvents.push(action.payload.data);
          } else {
            newEvents.push(state.events[i]);
          }
        }
        state.events = newEvents;
      } else {
        state.eventSelect = action.payload.data;
      }
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addAgenda.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addAgenda.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newsEvents = []
      for (let i = 0; i < state.events.length; i++) {
        if (state.events[i].id === action.payload.eventId) {
          let editEvent = state.events[i];
          editEvent.savedByUsers = [...editEvent.savedByUsers, action.payload.userId];
          newsEvents.push(editEvent);
        } else {
          newsEvents.push(state.events[i]);
        }
      }
      state.events = newsEvents;
    });
    builder.addCase(addAgenda.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteAgenda.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAgenda.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newsEvents = []
      for (let i = 0; i < state.events.length; i++) {
        if (state.events[i].id === action.payload.eventId) {
          let editEvent = state.events[i]
          editEvent.savedByUsers = editEvent.savedByUsers.filter((item) => item !== action.payload.userId);
          newsEvents.push(editEvent)
        } else {
          newsEvents.push(state.events[i]);
        }
      }
      state.events = newsEvents;
    });
    builder.addCase(deleteAgenda.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deletePictureEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePictureEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      logger.log(action.payload.internal);
      if (action.payload.internal) {
        state.eventSelect.media = []
      } else {
        let newEvents = [];
        for (let i = 0; i < state.events.length; i++) {
          if (state.events[i].id === action.payload.eventId) {
            let editEvent = state.events[i];
            editEvent.media = [];
            newEvents.push(editEvent);
          } else {
            newEvents.push(state.events[i]);
          }
        }
        state.events = newEvents;
      }
    });
    builder.addCase(deletePictureEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { finishEventAdd } = eventsSlice.actions;

export default eventsSlice.reducer