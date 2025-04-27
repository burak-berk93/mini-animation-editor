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
      }, 1000); // Frame başı 1 saniye bekleme
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
      dispatch(startPlaying());
      animateTimeline(0);
    }
  };

  const handleStop = () => {
    dispatch(stopPlaying());
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={isPlaying ? handleStop : handlePlay}
          className={`px-4 py-2 rounded-lg text-white ${isPlaying ? 'bg-red-500' : 'bg-blue-500'}`}
          disabled={files.length === 0 || Object.keys(frames).length === 0}
        >
          {isPlaying ? 'Durdur' : 'Oynat'}
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 relative min-h-[200px] overflow-hidden">
        <h3 className="text-lg font-semibold mb-2">Timeline</h3>
        <p className="text-gray-500 text-sm mb-4">Frame'leri ekleyin, sonra oynatın.</p>

        {Object.keys(frames).length === 0 && files.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">Henüz hiçbir görsel için frame eklenmedi.</p>
        )}
        {files.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Lütfen animasyon oluşturmak için dosya yükleyin.</p>
        )}

        <div className="relative flex items-center gap-4 overflow-x-scroll">
          {files.map((file, index) => {
            const fileFrames = frames[file.id] || [];
            return (
              <div key={file.id} className="relative flex items-center gap-4">
                {fileFrames.map((frame, frameIndex) => (
                  <div
                    key={frameIndex}
                    className="bg-blue-500 text-white w-24 h-24 rounded-md flex items-center justify-center shadow-lg"
                    style={{
                      transform: `translateX(${(frameIndex + index * 10) * 100}px)`,
                      opacity: 1,
                    }}
                  >
                    {file.fileName} - Frame {frameIndex + 1}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};