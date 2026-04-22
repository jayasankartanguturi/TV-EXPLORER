import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShowCard from './ShowCard';
import { TVMazeShow } from '../data/api';

interface CarouselProps {
  title: string;
  shows: TVMazeShow[];
}

const Carousel = ({ title, shows }: CarouselProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!shows || shows.length === 0) return null;

  return (
    <div className="py-6 relative group">
      <h2 className="text-2xl font-bold text-white mb-4 px-6 md:px-12">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/60 w-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex hover:bg-black/80"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-6 md:px-12 py-4"
        >
          {shows.map((show) => (
            <div key={show.id} className="flex-none w-40 md:w-52">
              <ShowCard show={show} />
            </div>
          ))}
        </div>

        <button 
           onClick={() => handleScroll('right')}
           className="absolute right-0 top-0 bottom-0 z-40 bg-black/60 w-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex hover:bg-black/80"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
