import { Link } from 'react-router-dom';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TVMazeShow } from '../data/api';

interface HeroBannerProps {
  show: TVMazeShow;
}

const HeroBanner = ({ show }: HeroBannerProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // Fallback high-res image
  const imageUrl = show.image?.original || show.image?.medium || 'https://via.placeholder.com/1920x1080?text=No+Image';

  // We use a generic cinematic background video for the wow-factor
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-super-slow-motion-of-a-dj-using-controllers-222-large.mp4';
  
  useEffect(() => {
    // Reveal video after 2 seconds to simulate "trailer autoplay" effect like Netflix
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [show.id]);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-netflix-dark">
        <AnimatePresence>
          {!showVideo && (
            <motion.img
              key="poster"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              src={imageUrl}
              alt={show.name}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showVideo && (
            <motion.video
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src={videoUrl} type="video/mp4" />
            </motion.video>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-12 lg:px-20 max-w-3xl pb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl"
        >
          {show.name}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 items-center mb-6 text-sm font-semibold"
        >
          <span className="text-green-400 text-base">{(show.rating?.average || 0) * 10}% Match</span>
          <span className="text-gray-300">{show.premiered?.split('-')[0]}</span>
          <span className="border border-gray-600 px-2 py-0.5 rounded text-gray-300">
            {show.language}
          </span>
          <span className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs">HD</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gray-200 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-4 drop-shadow-md max-w-2xl" 
          dangerouslySetInnerHTML={{ __html: show.summary || 'No summary available.' }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 items-center"
        >
          <Link to={`/watch/${show.id}`}>
            <button className="flex items-center justify-center gap-2 bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded md:rounded-md font-bold text-lg md:text-xl hover:bg-gray-300 transition-all hover:scale-105 active:scale-95 shadow-xl">
              <Play className="w-6 h-6 fill-current" />
              Play
            </button>
          </Link>
          <Link to={`/show/${show.id}`}>
            <button className="flex items-center justify-center gap-2 bg-gray-500/70 backdrop-blur-sm text-white px-6 md:px-10 py-3 md:py-4 rounded md:rounded-md font-bold text-lg md:text-xl hover:bg-gray-500 transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-gray-400">
              <Info className="w-6 h-6" />
              More Info
            </button>
          </Link>

          {/* Mute/Unmute Toggle */}
          <AnimatePresence>
            {showVideo && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setIsMuted(!isMuted)}
                className="ml-auto flex items-center justify-center p-3 rounded-full border border-gray-400 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
