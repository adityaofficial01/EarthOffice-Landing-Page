// src/hooks/useDynamicMediaQuery.js
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

const useDynamicMediaQuery = (screenSize, isMinWidth = true) => {
    const query = isMinWidth
        ? `(min-width: ${screenSize}px)`
        : `(max-width: ${screenSize}px)`;

    return useMediaQuery({ query });
};

// PropTypes for validation
useDynamicMediaQuery.propTypes = {
    screenSize: PropTypes.number.isRequired,
    isMinWidth: PropTypes.bool,
};

export default useDynamicMediaQuery;
