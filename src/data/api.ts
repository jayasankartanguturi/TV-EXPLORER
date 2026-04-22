import axios from 'axios';

const TVMAZE_BASE = import.meta.env.VITE_TVMAZE_API_BASE_URL || 'https://api.tvmaze.com';
const TMDB_BASE = import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY || 'dummy_key';

// -- Types --

export interface TVMazeShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  } | null;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
  updated: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

// -- TVMaze API --

export const fetchShows = async (): Promise<TVMazeShow[]> => {
  const response = await axios.get(`${TVMAZE_BASE}/shows`);
  return response.data;
};

export const searchShows = async (query: string): Promise<{score: number, show: TVMazeShow}[]> => {
  const response = await axios.get(`${TVMAZE_BASE}/search/shows?q=${encodeURIComponent(query)}`);
  return response.data;
};

export const fetchShowDetails = async (id: string): Promise<TVMazeShow> => {
  const response = await axios.get(`${TVMAZE_BASE}/shows/${id}`);
  return response.data;
};

// -- TMDB API (Movies) -- 
// Fallback gracefully since we might not have a real TMDB API key in this demo scenario

export const fetchPopularMovies = async (languageCode?: string): Promise<TMDBMovie[]> => {
  try {
    const langQuery = languageCode ? `&with_original_language=${languageCode}` : '';
    const response = await axios.get(`${TMDB_BASE}/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc${langQuery}`);
    return response.data.results;
  } catch (error) {
    console.warn("TMDB fetch failed, maybe missing API key. Returning mock data.", error);
    return [];
  }
};
