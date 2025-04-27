import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';
import frameReducer from './frameSlice';
import playReducer from './playSlice';

export const store = configureStore({
  reducer: {
    file: fileReducer,
    frame: frameReducer,
    play: playReducer,
  },
});

export default store;
