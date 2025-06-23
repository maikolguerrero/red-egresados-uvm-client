import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import usersReducer from '../features/users/usersSlice'
import forumsReducer from '../features/forums/forumsSlice'
import eventsReducer from '../features/events/eventsSlice'
import proyectsReducer from '../features/proyects/proyectsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    forums: forumsReducer,
    events: eventsReducer,
    proyects: proyectsReducer
  },
})