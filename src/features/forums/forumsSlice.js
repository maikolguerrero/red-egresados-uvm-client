import { createSlice } from '@reduxjs/toolkit'
import { addComment, addForum, addPictureForum, deleteForum, editForum, getThreadsComments, likeThreads, searchForum } from '../../services/forum/forumService';

export const forumsSlice = createSlice({
  name: "forums",
  initialState: {
    forums: [],
    forumSelect: {},
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    forumAdd: {
      data: null,
      passed: 0,
    },
    loading: false,
    error: "",
    message: "",
  },
  reducers: {
    finish: (state) => {
      state.forumAdd = {
        data: null,
        passed: 0,
      };
    },
    selectedForum: (state, action) => {
      state.forumSelect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addForum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.forumAdd.data = action.payload.forum;
      state.forumAdd.passed = 1;
    });
    builder.addCase(addForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addPictureForum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPictureForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addPictureForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchForum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.forums = action.payload.forums;
      state.pagination = action.payload.pagination
    });
    builder.addCase(searchForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(likeThreads.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(likeThreads.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      if (action.payload.type === "thread") {
        let newForums = [];
        for (let i = 0; i < state.forums.length; i++) {
          if (state.forums[i].id === action.payload.id) {
            if (action.payload.id === state.forumSelect.id) {
              state.forumSelect.isLiked = action.payload.isLiked;
              state.forumSelect.likeCount = action.payload.likeCount;
            }
            state.forums[i].isLiked = action.payload.isLiked;
            state.forums[i].likeCount = action.payload.likeCount;
          }
          newForums.push(state.forums[i]);
        }
        state.forums = newForums;
      } 
      if (action.payload.type === "comment") {
        let newComments = [];
        for (let i = 0; i < state.forumSelect.comments.length; i++) {
          if (state.forumSelect.comments[i].id === action.payload.id) {
            state.forumSelect.comments[i].isLiked = action.payload.isLiked;
            state.forumSelect.comments[i].likeCount = action.payload.likeCount;
          }
          newComments.push(state.forumSelect.comments[i]);
        }
        state.forumSelect.comments = newComments
      }

      if (action.payload.type === "replies") {
        let newComments = [];
        for (let i = 0; i < state.forumSelect.comments.length; i++) {
          for (let e = 0; e < state.forumSelect.comments[i].replies.length; e++) {
            if (state.forumSelect.comments[i].replies[e].id === action.payload.id) {
              state.forumSelect.comments[i].replies[e].isLiked = action.payload.isLiked;
              state.forumSelect.comments[i].replies[e].likeCount = action.payload.likeCount;
            }
          }
          newComments.push(state.forumSelect.comments[i]);
        }
        state.forumSelect.comments = newComments;
      }
    });
    builder.addCase(likeThreads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getThreadsComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getThreadsComments.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.forumSelect = action.payload.forumSelected
    });
    builder.addCase(getThreadsComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      if (action.payload.type === "thread") {
        state.forumSelect.comments = [...state.forumSelect.comments, action.payload.comment]
      } else {
        let position = 0
        for (let i = 0; i < state.forumSelect.comments.length; i++) {
          if (state.forumSelect.comments[i].id === action.payload.idComment) {
            position = i
          }
        }
        state.forumSelect.comments[position].replies = [...state.forumSelect.comments[position].replies, action.payload.comment]
      }
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteForum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      let newForums = state.forums.filter((item) => item.id !== action.payload.idThread)
      state.forums = newForums;
      if (state.forumSelect.id === action.payload.idThread) {
        state.forumSelect = {}
      }
    });
    builder.addCase(deleteForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(editForum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editForum.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      if (action.payload.type === "edit") {
        let newForums = [];
        for (let i = 0; i < state.forums.length; i++) {
          if (state.forums[i].id === action.payload.idThread) {
            let forumEdit = state.forums[i];
            forumEdit.title = action.payload.data.title;
            forumEdit.content = action.payload.data.content;
            forumEdit.category = action.payload.data.category;
            forumEdit.tags = action.payload.data.tags;
            newForums.push(forumEdit);
          } else {
            newForums.push(state.forums[i]);
          }
        }
        state.forums = newForums;
      } else {
        let forumEdit = state.forumSelect;
        forumEdit.title = action.payload.data.title;
        forumEdit.content = action.payload.data.content;
        forumEdit.category = action.payload.data.category;
        forumEdit.tags = action.payload.data.tags;
        state.forumSelect = forumEdit;
      }
    });
    builder.addCase(editForum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { finish } = forumsSlice.actions;

export default forumsSlice.reducer