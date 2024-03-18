'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  // devTools: process.env.NODE_ENV === 'development',
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

const initializeApp = async () => {
  await store.dispatch(authApiSlice.endpoints.userInfo.initiate({}, { forceRefetch: true }))
}
initializeApp();


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
