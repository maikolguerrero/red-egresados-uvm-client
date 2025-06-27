import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import forumsReducer from '../features/forums/forumsSlice';
import eventsReducer from '../features/events/eventsSlice';
import proyectsReducer from '../features/proyects/proyectsSlice'
import socketReducer from '../features/socket/socketSlice';
import chatReducer from '../features/chat/chatSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    forums: forumsReducer,
    events: eventsReducer,
    proyects: proyectsReducer,
    chat: chatReducer,
    socket: socketReducer,
    sidebar: sidebarReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Opcional: desactivar la verificación de serialización para acciones complejas
  })
});