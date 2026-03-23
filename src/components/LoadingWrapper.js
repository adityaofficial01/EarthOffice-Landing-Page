import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { BarLoader } from 'utils/Loaders';

const LoadingWrapper = ({ loading, children, className }) => {
  return (
    <Spin spinning={loading} indicator={<BarLoader redColor={true} />} className={`flex items-center justify-center ${className}`}>
      {children}
    </Spin>
  );
};

// Define prop types for the component
LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired, // `loading` should be a boolean and is required
  children: PropTypes.node.isRequired  // `children` can be any valid React node and is required
};

export default LoadingWrapper;
