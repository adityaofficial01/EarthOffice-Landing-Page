import { Image } from 'antd';
import PropTypes from 'prop-types';

const CustomImage = ({
  src,
  alt = '',
  height,
  width='w-auto',
  onClick,
  className = '',
  style,
  preview = false,
  draggable = false,
}) => {
  return (
    <Image
      src={src}
      alt={alt} // Default alt text
      height={height} // Ensure valid height and width
      width={width}
      preview={preview}
      draggable={draggable}
      onClick={onClick}
      className={`${className}`}
      style={style}
    />
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired, // Make sure src is a valid string
  alt: PropTypes.string,
  onClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  preview: PropTypes.oneOfType([true, false]),
  draggable: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default CustomImage;