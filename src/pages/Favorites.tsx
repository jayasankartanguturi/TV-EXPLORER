import { useState, useEffect } from 'react';
import ShowCard from '../components/ShowCard';
import AnimatedPage from '../components/AnimatedPage';
import { TVMazeShow } from '../data/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState<TVMazeShow[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  return (
    <AnimatedPage className="pt-24 px-6 md:px-12 pb-10 min-h-screen max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <h2 className="text-2xl mb-2">No favorites yet!</h2>
          <p>Explore shows and click the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favorites.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </AnimatedPage>
  );
};

export default Favorites;
