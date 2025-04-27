import { createSlice } from '@reduxjs/toolkit';

const frameSlice = createSlice({
  name: 'frame',
  initialState: {
    frames: {},
  },
  reducers: {
    addFrame: (state, action) => {
      const { fileId, position } = action.payload;

      // Dosya ID'sine göre yeni pozisyonu kaydediyoruz
      if (!state.frames[fileId]) {
        state.frames[fileId] = [];
      }

      // Çift frame eklememek için kontrol ekleyebiliriz
      const existingFrame = state.frames[fileId].find(f => f.x === position.x && f.y === position.y);
      if (!existingFrame) {
        state.frames[fileId].push({ ...position });
      }
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