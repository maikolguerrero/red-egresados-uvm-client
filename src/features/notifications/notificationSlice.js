import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    unreadCount: 0,
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
    }
});

export const { addNotification, setUnreadCount, markAsRead, setNotifications, decrementUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;