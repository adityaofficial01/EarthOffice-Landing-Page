import React from 'react';
import PropTypes from 'prop-types';

const TitleHeader = ({ title, className='', children=null, fontSize='titleMedium', fontWeight='font-semibold', showAnimation=true }) => {
  return (
    <h2 className={`${fontSize} ${fontWeight} ${className} ${showAnimation && 'animate-slideInLeft'}`}>
      {title || children}
    </h2>
  );
};

// Define prop types for validation
TitleHeader.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  children: PropTypes.node,
};

export default TitleHeader;