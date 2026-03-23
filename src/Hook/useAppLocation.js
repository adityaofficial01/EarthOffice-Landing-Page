import { useLocation } from 'react-router-dom';

/**
 * Custom hook to get the current location object.
 * @returns {object} The current location object.
 */
const useAppLocation = () => {
  const location = useLocation();
  return location;
};

export default useAppLocation;
