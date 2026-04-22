import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Shows from '../pages/Shows';
import Search from '../pages/Search';
import ShowDetails from '../pages/ShowDetails';
import Favorites from '../pages/Favorites';
import Watch from '../pages/Watch';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/search" element={<Search />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
