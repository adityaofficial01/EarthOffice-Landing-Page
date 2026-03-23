// src/screens/NotFound.js
import { Link } from 'react-router-dom';
import { RouterKeys } from 'routes/RouterKey';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-title36 font-bold text-red-600 animate-bounceSlow border-r-4 pe-3">404</h1>
          <h2 className="text-title36 font-semibold text-grey-600">Oops! Page not found</h2>
        </div>
        <p className="text-title26 text-green-600 mb-6 mt-3"> Sorry, the page you&apos;re looking for doesn&apos;t exist. </p>
        <Link
          to={RouterKeys.HOME.HOME} className="inline-block bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow transition-all duration-300 ease-in-out" >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;