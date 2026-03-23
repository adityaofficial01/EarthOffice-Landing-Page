import { Input } from 'antd';
import PropTypes from 'prop-types';
// import CustomToast from 'utils/CustomToast';

const CustomTextArea = ({
  changeOnWheel,
  onBlur = () => {}, // Default value
  onChange = () => {}, // Default value
  value = '', // Default value
  className = '', // Default value
  style = {}, // Default value
  suffix = null, // Default value
  allowClear = false, // Default value
  readOnly = false, // Default value
  autoSize = false, // Default value
  showCount = false, // Default value
  prefix = null, // Default value
  variant = 'filled', // Default value
  maxLength = 5000000, // Default value 50 Lakh
  rows = 4, // Default value
  placeholder = 'Enter here...', // Default value
  ...restProps
}) => {
  return (
    <Input.TextArea
      {...restProps}
      autoSize={autoSize}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`commonInput border bg-white border-red-100 ${className}`}
      style={style}
      rows={rows}
      maxLength={maxLength}
      readOnly={readOnly}
      allowClear={allowClear}
      variant={variant}
      suffix={suffix}
      showCount={showCount}
      prefix={prefix}
      placeholder={placeholder}
      size="large"
      // onPaste={(e) => {e.preventDefault(); CustomToast("e","Paste is not allowed")}} // Disabled Paste
      // onCopy={(e) => {e.preventDefault(); CustomToast("e","Copy is not allowed")}} // Disabled Copy
    />
  );
};

// Prop Types
CustomTextArea.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  suffix: PropTypes.element,
  prefix: PropTypes.element,
  variant: PropTypes.string,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  readOnly: PropTypes.bool,
  allowClear: PropTypes.bool,
  autoSize: PropTypes.bool,
  showCount: PropTypes.bool,
};

export default CustomTextArea;
