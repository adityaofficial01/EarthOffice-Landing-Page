import React from 'react';
import { Divider } from 'antd';
import PropTypes from 'prop-types';

const CustomDivider = ({ type = 'horizontal', className='' }) => {
  return (
    <Divider
      type={type}
      className={`h-[2px] bg-grey-100 ${className}`}
    />
  );
};

CustomDivider.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};

export default CustomDivider;