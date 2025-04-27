import { createSlice } from '@reduxjs/toolkit';

const playSlice = createSlice({
  name: 'play',
  initialState: {
    isPlaying: false,
    currentFrameIndex: 0, // Eklendi
  },
  reducers: {
    startPlaying: (state) => {
      state.isPlaying = true;
      state.currentFrameIndex = 0;
    },
    stopPlaying: (state) => {
      state.isPlaying = false;
      state.currentFrameIndex = 0;
    },
    setCurrentFrameIndex: (state, action) => {
      state.currentFrameIndex = action.payload;
    },
  },
});

export const { startPlaying, stopPlaying, setCurrentFrameIndex } = playSlice.actions;
export default playSlice.reducer;