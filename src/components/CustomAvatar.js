import React from 'react';
import { Avatar } from 'antd';

const CustomAvatar = ({
    src = undefined,
    children,
    fallbackContent = '', // Fallback text (e.g., initials or any text)
    size = 40,
    shape = 'circle',
    className = 'border-0 cursor-pointer',
    style = {},
    objectFit = 'cover',
    draggable = false,
    onClick,
    ...restProps
}) => {
    // Merge objectFit into the style object
    const avatarStyle = {
        ...style,
        objectFit,
    };

    return (
        <Avatar
            {...restProps}
            size={size}
            src={src || undefined} // Use `src` if available, else fallback
            shape={shape}
            draggable={draggable}
            className={className}
            style={avatarStyle}
            onClick={() => { onClick?.(); }}
        >
            {src ? null : children || fallbackContent} {/* Show children or fallback content when `src` is not provided */}
        </Avatar>
    );
};

export default CustomAvatar;
