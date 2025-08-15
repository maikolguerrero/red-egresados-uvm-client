import { createSlice } from '@reduxjs/toolkit';
import { getNotifications, markNotificationAsRead, getUnreadNotificationCount, deleteNotification } from '../../services/notifications/notificationService';

const initialState = {
    notifications: [],
    unreadCount: 0,
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    loading: false,
    error: null
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.read) {
                state.unreadCount += 1;
            }
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount -= 1;
            }
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload.notifications;
            state.unreadCount = action.payload.unreadCount;
        },
        decrementUnreadCount: (state) => {
            if (state.unreadCount > 0) {
                state.unreadCount -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(markNotificationAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications.find(n => n.data.id === action.payload.data.data.id).read = true;
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = state.notifications.filter(n => n?.data?.id !== action.payload?.data?.data?.id);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUnreadNotificationCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUnreadNotificationCount.fulfilled, (state, action) => {
                state.loading = false;
                state.unreadCount = action.payload;
            })
            .addCase(getUnreadNotificationCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    addNotification,
    setUnreadCount,
    markAsRead,
    setNotifications,
    decrementUnreadCount
} = notificationSlice.actions;

export default notificationSlice.reducer;