import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, setFilesOrder, deleteFile } from '../store/fileSlice';
import { clearFrames } from '../store/frameSlice';
import { Reorder } from 'framer-motion';

export const FileMenu = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    dispatch(addFiles(selectedFiles));
  };

  const handleReorder = (newOrder) => {
    dispatch(setFilesOrder(newOrder.map(item => item)));
  };

  const handleDeleteFile = (id) => {
    dispatch(deleteFile(id));
    dispatch(clearFrames(id)); 
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md">
    
      <div className="mb-6">
        <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
          <span className="text-gray-600 font-semibold">Dosya Yükle</span>
          <input type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </div>

    
      <Reorder.Group axis="y" values={files} onReorder={handleReorder} className="space-y-3">
        {files.map((file) => (
          <Reorder.Item
            key={file.id}
            value={file}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
            
              <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full text-xl">
                📄
              </div>
            
              <div className="text-gray-700 font-medium truncate max-w-[200px]">{file.fileName}</div>
            </div>

           
            <button
              onClick={() => handleDeleteFile(file.id)}
              className="text-red-500 hover:text-red-700 transition text-xl"
            >
              &times;
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};