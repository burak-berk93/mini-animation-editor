import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addFrame } from '../store/frameSlice';

export const FileDetails = () => {
  const files = useSelector((state) => state.file.files);
  const frames = useSelector((state) => state.frame.frames);
  const isPlaying = useSelector((state) => state.play.isPlaying);
  const currentFrameIndex = useSelector((state) => state.play.currentFrameIndex);
  const dispatch = useDispatch();

  let frameLookup = [];
  Object.entries(frames).forEach(([fileId, frameList]) => {
    frameList.forEach((frame) => {
      frameLookup.push({ fileId, frame });
    });
  });

  const handleDragEnd = (event, info, file) => {
    const parentRect = event.target.parentElement.getBoundingClientRect();
    const relativeX = info.point.x - parentRect.left;
    const relativeY = info.point.y - parentRect.top;

    dispatch(
      addFrame({
        fileId: file.id,
        position: { x: relativeX, y: relativeY },
      })
    );
    // dispatch( // Bu satırı yorum out ettim, temel pozisyonun her sürüklemede değişmesini engellemek için
    //   updateFilePosition({
    //     id: file.id,
    //     position: { x: relativeX, y: relativeY },
    //   })
    // );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg mt-6 relative h-[600px] border border-gray-600 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {files.map((file, index) => {
        const matchingFrames = frameLookup
          .map((item, idx) => ({ ...item, globalIndex: idx }))
          .filter((item) => item.fileId === file.id);

        const activeFrame = matchingFrames.find(f => f.globalIndex === currentFrameIndex - 1);

        const startX = file.position?.x ?? (100 + index * 30);
        const startY = file.position?.y ?? (100 + index * 30);

        const animatedX = isPlaying && currentFrameIndex > 0 && activeFrame?.frame?.x !== undefined
          ? activeFrame.frame.x
          : startX;

        const animatedY = isPlaying && currentFrameIndex > 0 && activeFrame?.frame?.y !== undefined
          ? activeFrame.frame.y
          : startY;

        return (
          <motion.div
            key={file.id}
            className="absolute cursor-move"
            drag={!isPlaying}
            dragConstraints={{ top: 0, left: 0, right: 800, bottom: 500 }}
            initial={{ opacity: 0, scale: 0.8, x: startX, y: startY }} // Başlangıç pozisyonunu initial'e ekledim
            animate={{
              x: animatedX,
              y: animatedY,
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            whileDrag={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
            style={{ zIndex: index + 10 }}
            onDragEnd={(e, info) => handleDragEnd(e, info, file)}
          >
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="w-48 h-48 object-cover rounded-lg shadow-lg border-2 border-white/10"
            />
          </motion.div>
        );
      })}
    </div>
  );
};