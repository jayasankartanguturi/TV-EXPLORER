import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ShowCard from '../components/ShowCard';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';
import { fetchShows, TVMazeShow } from '../data/api';

const Shows = () => {
  const [shows, setShows] = useState<TVMazeShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreFilter = queryParams.get('genre');

  useEffect(() => {
    const loadData = async () => {
      try {
        // TVMaze doesn't have native pagination for the raw /shows endpoint that scales well
        // So we will fetch a large chunk and do client side pagination
        const data = await fetchShows();
        setShows(data);
      } catch (error) {
        console.error('Failed to fetch shows:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Reset page when genre filter changes
  useEffect(() => {
    setPage(1);
  }, [genreFilter]);

  const filteredShows = useMemo(() => {
    if (!genreFilter) return shows;
    return shows.filter((show) => show.genres.includes(genreFilter));
  }, [shows, genreFilter]);

  // Simple infinite scroll based on IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && filteredShows.length > page * itemsPerPage) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, filteredShows.length, page]);

  if (loading && shows.length === 0) {
    return <div className="mt-20"><Loader /></div>;
  }

  const displayedShows = filteredShows.slice(0, page * itemsPerPage);

  return (
    <AnimatedPage className="pt-20 px-6 md:px-12 pb-10 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        {genreFilter ? `${genreFilter} Shows` : 'All Shows'}
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {displayedShows.map((show, index) => {
          if (displayedShows.length === index + 1) {
            return (
              <div ref={lastElementRef} key={`${show.id}-${index}`}>
                <ShowCard show={show} />
              </div>
            );
          } else {
            return <div key={`${show.id}-${index}`}><ShowCard show={show} /></div>;
          }
        })}
      </div>
      
      {loading && <div className="mt-8"><Loader /></div>}
    </AnimatedPage>
  );
};

export default Shows;
