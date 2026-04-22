import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShowDetails, TVMazeShow } from '../data/api';
import { ArrowLeft, Play, Pause, Volume2, Maximize, Settings } from 'lucide-react';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<TVMazeShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await fetchShowDetails(id);
          setShow(data);
        }
      } catch (error) {
        console.error("Failed to load show details", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-black"><Loader /></div>;
  if (!show) return <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-2xl">Video not available</div>;

  const imageUrl = show.image?.original || show.image?.medium || 'https://via.placeholder.com/1920x1080?text=No+Video';

  return (
    <AnimatedPage className="fixed inset-0 z-[100] bg-black">
      <div className="relative w-full h-full group">
        {/* Fake Video Player area */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <img 
            src={imageUrl} 
            alt={show.name} 
            className="w-full h-full object-contain opacity-80"
          />
          {/* Mock centered play/pause indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-24 h-24 text-white/70" />
            </div>
          )}
        </div>

        {/* Top Controls */}
        <div 
          className={`absolute top-0 left-0 w-full p-6 flex items-center bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300 transition-colors flex items-center gap-4"
          >
            <ArrowLeft className="w-8 h-8" />
            <span className="text-xl font-bold">Back to Browse</span>
          </button>
        </div>

        {/* Bottom Controls */}
        <div 
          className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress bar mock */}
          <div className="w-full h-1.5 bg-gray-600 rounded-full mb-6 cursor-pointer relative group-hover:h-2 transition-all">
            <div className="absolute top-0 left-0 h-full bg-netflix-red w-1/3 rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-netflix-red rounded-full shadow scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>
              
              <div className="flex items-center gap-3">
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Volume2 className="w-7 h-7" />
                </button>
              </div>

              <div className="text-white text-lg font-medium ml-4">
                {show.name}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Settings className="w-7 h-7" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Maximize className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Watch;
