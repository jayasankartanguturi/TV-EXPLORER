import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchShows, TVMazeShow } from '../data/api';
import ShowCard from '../components/ShowCard';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';
import { useDebounce } from '../hooks/useDebounce';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{score: number, show: TVMazeShow}[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchShows(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  return (
    <AnimatedPage className="pt-24 px-6 md:px-12 pb-10 min-h-screen">
      <div className="max-w-3xl mx-auto relative mb-12">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Search for movies, TV shows, actors..."
          className="w-full bg-netflix-dark text-white text-lg rounded-md py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-netflix-red"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {debouncedQuery && results.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <h2 className="text-2xl mb-2">No results found for "{debouncedQuery}"</h2>
              <p>Try searching for a different title or genre.</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="max-w-screen-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-300 mb-6">Search Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {results.map(({ show }) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </AnimatedPage>
  );
};

export default Search;
