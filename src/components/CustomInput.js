import { Input } from 'antd';
import PropTypes from 'prop-types';

const CustomInput = ({
    changeOnWheel,
    onBlur=() => {},
    onChange=() => {},
    value,
    className = '',
    style,
    suffix,
    allowClear = false,
    readOnly = false,
    prefix,
    variant = '',
    maxLength = 200,
    min,
    max,
    placeholder = 'Enter here...',
    ...restProps
}) => {
    return (
        <Input
            {...restProps}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className={`commonInput ${className}`}
            style={style}
            min={min}
            max={max}
            maxLength={maxLength}
            readOnly={readOnly}
            allowClear={allowClear}
            variant={variant}
            suffix={suffix}
            prefix={prefix}
            placeholder={placeholder}
            size='large'
        />
    );
};

CustomInput.propTypes = {
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
    min: PropTypes.number,
    max: PropTypes.number,
    ref: PropTypes.element,
    readOnly: PropTypes.bool,
    allowClear: PropTypes.bool,
};

export default CustomInput;
