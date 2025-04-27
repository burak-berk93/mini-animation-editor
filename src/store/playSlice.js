import { createSlice } from '@reduxjs/toolkit';

const playSlice = createSlice({
  name: 'play',
  initialState: {
    isPlaying: false,
    currentFrameIndex: 0,
    frameSequence: [], 
  },
  reducers: {
    startPlaying: (state, action) => {
      state.isPlaying = true;
      state.currentFrameIndex = 0;
      state.frameSequence = action.payload || [];
    },
    stopPlaying: (state) => {
      state.isPlaying = false;
      state.currentFrameIndex = 0;
      state.frameSequence = [];
    },
    setCurrentFrameIndex: (state, action) => {
      state.currentFrameIndex = action.payload;
    },
  },
});

export const { startPlaying, stopPlaying, setCurrentFrameIndex } = playSlice.actions;
export default playSlice.reducer;