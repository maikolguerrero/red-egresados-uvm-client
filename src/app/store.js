import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import usersReducer from '../features/users/usersSlice'
import forumsReducer from '../features/forums/forumsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    forums: forumsReducer,
  },
})