import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Heart, Share2, Star, Check } from 'lucide-react';
import { fetchShowDetails, TVMazeShow } from '../data/api';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';
import parse from 'html-react-parser';

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<TVMazeShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (!id) return;
        const data = await fetchShowDetails(id);
        setShow(data);

        // Check if favorite
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favs.some((fav: TVMazeShow) => fav.id === data.id));
      } catch (error) {
        console.error("Failed to load show details", error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (!show) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavs;
    if (isFavorite) {
      newFavs = favs.filter((fav: TVMazeShow) => fav.id !== show.id);
    } else {
      newFavs = [...favs, show];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="mt-40"><Loader /></div>;
  if (!show) return <div className="mt-40 text-center text-white text-2xl">Show not found</div>;

  const imageUrl = show.image?.original || show.image?.medium || 'https://via.placeholder.com/1920x1080?text=No+Image';

  return (
    <AnimatedPage className="min-h-screen pb-20 -mt-16">
      {/* Hero Backdrop */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0">
          <img src={imageUrl} alt={show.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-20 pb-12 z-10 flex flex-col md:flex-row gap-8 items-end">
          <img 
            src={show.image?.medium || imageUrl} 
            alt={show.name} 
            className="w-48 md:w-64 rounded-md shadow-2xl border border-gray-700 hidden md:block"
          />
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">{show.name}</h1>
            <div className="flex flex-wrap gap-4 items-center mb-6 text-sm font-semibold">
              <span className="text-green-400 flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {show.rating?.average || 'N/A'}/10
              </span>
              <span className="text-gray-300">{show.premiered?.split('-')[0]} - {show.ended?.split('-')[0] || 'Present'}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-gray-300">{show.language}</span>
              <span className="text-gray-300">{show.runtime || show.averageRuntime} min</span>
              <span className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs">{show.status}</span>
            </div>
            
            <div className="flex gap-4">
              <Link to={`/watch/${show.id}`}>
                <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>
              </Link>
              <button 
                onClick={toggleFavorite}
                className="flex items-center justify-center gap-2 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors border border-gray-600"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-netflix-red text-netflix-red' : ''}`} />
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareToast(true);
                  setTimeout(() => setShowShareToast(false), 2000);
                }}
                className="flex items-center justify-center gap-2 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 transition-colors border border-gray-600 relative"
              >
                {showShareToast ? <Check className="w-6 h-6 text-green-400" /> : <Share2 className="w-6 h-6" />}
              </button>
              {showShareToast && (
                <span className="absolute -bottom-10 right-0 bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                  Link copied to clipboard!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <div className="text-gray-300 text-lg leading-relaxed space-y-4">
            {show.summary ? parse(show.summary) : <p>No summary available.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
          <div className="bg-netflix-dark p-6 rounded-md border border-gray-800">
            <div className="mb-4">
              <span className="text-gray-500 block text-sm">Genres</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {show.genres.map(genre => (
                  <Link 
                    key={genre} 
                    to={`/shows?genre=${genre}`}
                    className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs hover:bg-netflix-red hover:text-white transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-gray-500 block text-sm">Network</span>
              <span className="text-gray-200">{show.network?.name || 'N/A'} {show.network?.country && `(${show.network.country.name})`}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-500 block text-sm">Schedule</span>
              <span className="text-gray-200">
                {show.schedule?.days.join(', ')} at {show.schedule?.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ShowDetails;
