import { configureStore } from '@reduxjs/toolkit';
import paxgReducer from './slices/paxgSlice';

export const store = configureStore({
  reducer: {
    paxg: paxgReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
