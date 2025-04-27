import { createSlice } from '@reduxjs/toolkit';

const frameSlice = createSlice({
  name: 'frame',
  initialState: {
    frames: {},
  },
  reducers: {
    addFrame: (state, action) => {
      const { fileId, position } = action.payload;
      if (!state.frames[fileId]) {
        state.frames[fileId] = [];
      }
      state.frames[fileId].push({ ...position });
    },
    clearFrames: (state, action) => {
      delete state.frames[action.payload];
    },
    resetAllFrames: (state) => {
      state.frames = {};
    },
  },
});

export const { addFrame, clearFrames, resetAllFrames } = frameSlice.actions;
export default frameSlice.reducer;