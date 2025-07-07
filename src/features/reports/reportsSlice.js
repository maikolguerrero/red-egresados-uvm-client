import { createSlice } from '@reduxjs/toolkit'
import { addComment, addForum, addPictureForum, addReport, deleteForum, editForum, getThreadsComments, likeThreads, searchForum } from '../../services/forum/forumService';
import { resolveReport, searchReport } from '../../services/reports/reportsService';

export const reportsSlice = createSlice({
  name: "forums",
  initialState: {
    reports: [],
    reportSelect: {},
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    loading: false,
    loadingPage: false,
    error: "",
    message: "",
  },
  extraReducers: (builder) => {
    builder.addCase(searchReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchReport.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.reports = action.payload.reports;
      state.pagination = action.payload.pagination
    });
    builder.addCase(searchReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(resolveReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resolveReport.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newReports = []
      for (let i = 0; i < state.reports.length; i++) {
        if (action.payload.report.id === state.reports[i].id) {
          newReports.push(action.payload.report)
        } else {
          newReports.push(state.reports[i])
        }
      }
      state.reports = newReports
    });
    builder.addCase(resolveReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default reportsSlice.reducer