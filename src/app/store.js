import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { apiSlice } from './apiSlice'
import { dashboardApi } from '../pages/dashboard/dashboardApi'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
