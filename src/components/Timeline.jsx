import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startPlaying, stopPlaying, setCurrentFrameIndex } from '../store/playSlice';

export const Timeline = () => {
  const files = useSelector((state) => state.file.files);
  const frames = useSelector((state) => state.frame.frames);
  const isPlaying = useSelector((state) => state.play.isPlaying);
  const dispatch = useDispatch();

  const animateTimeline = (frameIndex) => {
    const totalFrames = getTotalFrames();
    if (frameIndex < totalFrames) {
      dispatch(setCurrentFrameIndex(frameIndex));
      setTimeout(() => {
        animateTimeline(frameIndex + 1);
      }, 800); 
    } else {
      dispatch(stopPlaying());
    }
  };

  const getTotalFrames = () => {
    let total = 0;
    Object.values(frames).forEach(fileFrames => {
      total += fileFrames.length;
    });
    return total;
  };

  const handlePlay = () => {
    if (!isPlaying) {
      const frameSequence = [];

      Object.entries(frames).forEach(([fileId, frameList]) => {
        frameList.forEach((frame) => {
          frameSequence.push({ fileId, frame });
        });
      });

      dispatch(startPlaying(frameSequence));
      animateTimeline(0);
    }
  };

  const handleStop = () => {
    dispatch(stopPlaying());
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={isPlaying ? handleStop : handlePlay}
          className={`px-5 py-2 rounded-full text-lg font-semibold ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} transition-colors duration-200`}
          disabled={files.length === 0 || Object.keys(frames).length === 0}
        >
          {isPlaying ? 'Durdur' : 'Oynat'}
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 relative min-h-[250px] overflow-hidden shadow-lg">
        <h3 className="text-lg font-bold mb-2">Timeline</h3>
        <p className="text-gray-300 text-sm mb-3">Frame'leri ekleyin, sonra oynatın.</p>

        {Object.keys(frames).length === 0 && files.length > 0 && (
          <p className="text-sm text-gray-400 mt-2">Henüz hiçbir görsel için frame eklenmedi.</p>
        )}
        {files.length === 0 && (
          <p className="text-sm text-gray-400 mt-2">Lütfen animasyon oluşturmak için dosya yükleyin.</p>
        )}

        <div className="relative flex flex-col gap-6 py-3">
          {files.map((file) => {
            const fileFrames = frames[file.id] || [];

            return (
              <div key={file.id}>
                {/* Dosya adı */}
                <h4 className="text-lg font-semibold text-gray-200">{file.fileName}</h4>

                <div className="flex flex-wrap gap-3 py-2">
                  {fileFrames.map((frame, frameIndex) => (
                    <div
                      key={frameIndex}
                      className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-110"
                      style={{
                        marginRight: '12px', // Frame'ler arasında boşluk
                      }}
                    >
                      {/* Her frame'in küçük dairesi */}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
