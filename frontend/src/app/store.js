import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dogReducer from '../features/dogs/dogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogReducer,
  },
});
