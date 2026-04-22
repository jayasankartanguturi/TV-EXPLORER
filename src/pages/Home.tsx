import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import Carousel from '../components/Carousel';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';
import { fetchShows, TVMazeShow } from '../data/api';

const Home = () => {
  const [shows, setShows] = useState<TVMazeShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchShows();
        // TVMaze returns a lot of shows, let's take top ones and categorize
        setShows(data.slice(0, 150));
      } catch (error) {
        console.error('Failed to fetch shows:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return <div className="mt-20"><Loader /></div>;
  }

  if (shows.length === 0) return null;

  const featuredShow = shows.find(s => s.rating?.average && s.rating.average > 8.5) || shows[0];
  
  // Categorize
  const trending = [...shows].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)).slice(0, 20);
  const actionShows = shows.filter(show => show.genres.includes('Action'));
  const dramaShows = shows.filter(show => show.genres.includes('Drama'));
  const comedyShows = shows.filter(show => show.genres.includes('Comedy'));
  const sciFiShows = shows.filter(show => show.genres.includes('Science-Fiction'));

  return (
    <AnimatedPage className="pb-10 -mt-16">
      <HeroBanner show={featuredShow} />
      
      <div className="-mt-32 relative z-20 space-y-4">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Carousel title="Trending Now" shows={trending} />
        </motion.div>
        
        {actionShows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <Carousel title="Action & Adventure" shows={actionShows} />
          </motion.div>
        )}
        
        {dramaShows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <Carousel title="Critically Acclaimed Dramas" shows={dramaShows} />
          </motion.div>
        )}
        
        {comedyShows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <Carousel title="Comedies" shows={comedyShows} />
          </motion.div>
        )}
        
        {sciFiShows.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <Carousel title="Sci-Fi & Fantasy" shows={sciFiShows} />
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Home;
