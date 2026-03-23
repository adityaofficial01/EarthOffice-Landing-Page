import React from 'react';
import { Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import { ReactIcons } from '../utils/ReactIcons';

const CustomButton = ({
    onClick,
    icon,
    className = '',
    style,
    type = 'text', // primary | dashed | link | text | default
    children,
    ghost = true, // true | false
    loading,
    size = "middle", // large | middle | small
    shape = 'default', // default | circle | round
    iconPosition = "start", // start | end
    htmlType,
    block = false, // true | false
    disabled = false, // true | false
    ...restProps
}) => (
    <Button
        {...restProps}
        onClick={onClick}
        className={className}
        style={style}
        type={type}
        icon={icon}
        iconPosition={iconPosition}
        size={size}
        disabled={disabled}
        ghost={ghost}
        block={block}
        htmlType={htmlType}
        shape={shape}
        loading={loading ? <Spin indicator={<ReactIcons.CloseIcon style={{}} />} /> : null}
    >
        {children}
    </Button>
);

CustomButton.propTypes = {

    onClick: PropTypes.func,

    icon: PropTypes.element,

    style: PropTypes.object,

    ghost: PropTypes.bool,
    block: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,

    type: PropTypes.string,
    size: PropTypes.string,
    shape: PropTypes.string,
    htmlType: PropTypes.string,
    className: PropTypes.string,
    iconPosition: PropTypes.string,

    children: PropTypes.node.isRequired,
};

export default CustomButton;
