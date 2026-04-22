import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const NotFound = () => {
  return (
    <AnimatedPage className="min-h-screen flex flex-col items-center justify-center -mt-16 text-white text-center px-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-8">Lost your way?</h2>
      <p className="text-gray-400 max-w-lg mb-8 text-lg">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <Link to="/">
        <button className="bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-gray-200 transition-colors">
          TV Explorer Home
        </button>
      </Link>
    </AnimatedPage>
  );
};

export default NotFound;
