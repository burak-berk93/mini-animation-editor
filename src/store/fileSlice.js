import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: [],
  },
  reducers: {
    addFiles: (state, action) => {
      action.payload.forEach(newFile => {
        if (!state.files.some(file => file.id === newFile.id)) {
          state.files.push({ ...newFile, position: { x: 100, y: 100 } }); 
        }
      });
    },
    setFilesOrder: (state, action) => {
      state.files = action.payload;
    },
    updateFilePosition: (state, action) => {
      const { id, position } = action.payload;
      const file = state.files.find(f => f.id === id);
      if (file) {
        file.position = position;
      }
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
  },
});

export const { addFiles, setFilesOrder, updateFilePosition, deleteFile } = fileSlice.actions;
export default fileSlice.reducer;