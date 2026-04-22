import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { TVMazeShow } from '../data/api';

interface ShowCardProps {
  show: TVMazeShow;
}

const ShowCard = ({ show }: ShowCardProps) => {
  const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  const rating = show.rating?.average || 'N/A';
  const isTopRated = show.rating?.average && show.rating.average >= 8.5;

  const cardVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 15px rgba(229, 9, 20, 0.3)" 
    }
  };

  const overlayVariants = {
    rest: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      className="relative rounded-md overflow-hidden bg-netflix-dark shadow-md cursor-pointer border border-transparent hover:border-gray-700 transition-colors"
    >
      <Link to={`/show/${show.id}`}>
        <div className="relative aspect-[2/3] w-full">
          <img
            src={imageUrl}
            alt={show.name}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
          />
          {isTopRated && (
            <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded">
              ⭐ Top Rated
            </div>
          )}
          {/* Overlay details on hover */}
          <motion.div 
            variants={overlayVariants}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
          >
            <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{show.name}</h3>
            <div className="flex items-center gap-1 text-green-400 mb-3 text-sm">
              <span className="font-semibold">{rating !== 'N/A' ? `${Number(rating) * 10}% Match` : 'New'}</span>
            </div>
            
            <Link to={`/watch/${show.id}`} onClick={(e) => e.stopPropagation()}>
              <button className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-300 transition-colors w-full shadow-lg hover:scale-105 active:scale-95 duration-200">
                <Play className="w-4 h-4 fill-current" />
                Watch Now
              </button>
            </Link>
          </motion.div>
        </div>
        {/* Info below card (visible without hover) */}
        <div className="p-3">
          <h4 className="text-white font-semibold truncate">{show.name}</h4>
          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span>{show.premiered?.split('-')[0] || 'Unknown'}</span>
            <span className="border border-gray-600 px-1 rounded">{show.language}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShowCard;
