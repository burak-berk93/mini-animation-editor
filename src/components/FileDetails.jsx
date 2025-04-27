import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { addFrame } from '../store/frameSlice';

export const FileDetails = () => {
  const files = useSelector((state) => state.file.files);
  const frames = useSelector((state) => state.frame.frames);
  const isPlaying = useSelector((state) => state.play.isPlaying);
  const currentFrameIndex = useSelector((state) => state.play.currentFrameIndex);
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });

  useEffect(() => {
    if (containerRef.current) {
      const resize = () => {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  let frameLookup = [];
  Object.entries(frames).forEach(([fileId, frameList]) => {
    frameList.forEach((frame) => {
      frameLookup.push({ fileId, frame });
    });
  });

  const handleDragEnd = (event, info, file) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = info.point.x - rect.left;
    const relativeY = info.point.y - rect.top;

    const position = {
      x: relativeX / rect.width,
      y: relativeY / rect.height,
    };

  

   
    dispatch(
      addFrame({
        fileId: file.id,
        position,
      })
    );
  };

  const handleDragStart = (e, file) => {
    console.log(`Drag started for file ${file.id}`);
  };

  return (
    <div
      ref={containerRef}
      className="p-6 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg mt-6 relative h-[600px] border border-gray-600 overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {files.map((file) => {
        const matchingFrames = frameLookup
          .map((item, idx) => ({ ...item, globalIndex: idx }))
          .filter((item) => item.fileId === file.id);

        const activeFrame = matchingFrames.find(f => f.globalIndex === currentFrameIndex);

        const hasFrames = matchingFrames.length > 0;
        const defaultXPercent = file.position?.x > 1 ? 0.2 : (file.position?.x ?? 0.2);
        const defaultYPercent = file.position?.y > 1 ? 0.2 : (file.position?.y ?? 0.2);

        const startX = hasFrames
          ? matchingFrames[0].frame.x * containerSize.width
          : defaultXPercent * containerSize.width;
        const startY = hasFrames
          ? matchingFrames[0].frame.y * containerSize.height
          : defaultYPercent * containerSize.height;

        const animatedX = isPlaying && activeFrame?.frame?.x !== undefined
          ? activeFrame.frame.x * containerSize.width
          : startX;

        const animatedY = isPlaying && activeFrame?.frame?.y !== undefined
          ? activeFrame.frame.y * containerSize.height
          : startY;

      
        console.log(`File ${file.id} animation: X=${animatedX}, Y=${animatedY}`);

        return (
          <motion.div
            key={file.id}
            className="absolute cursor-move"
            drag={!isPlaying}  
            dragConstraints={containerRef}  
            initial={{ opacity: 0, scale: 0.8, x: startX, y: startY }}  
            animate={{
              x: animatedX,   // X pozisyonu
              y: animatedY,   // Y pozisyonu
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: "easeInOut" },  
            }}
            whileDrag={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}  
            style={{ zIndex: 100 }}  
            onDragEnd={(e, info) => handleDragEnd(e, info, file)}  
            onDragStart={(e) => handleDragStart(e, file)}  
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
