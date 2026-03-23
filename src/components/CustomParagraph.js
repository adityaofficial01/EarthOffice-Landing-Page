import React, { useState } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { ReactIcons } from 'utils/ReactIcons';

const CustomParagraph = ({
    content = '',
    children,
    rows = 25,
    copyable = false,
    expandable = 'collapsible',
    className = 'titleSmall',
    style = {},
    readMoreText = 'Show More',
    readLessText = 'Show Less',
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Typography.Paragraph
            ellipsis={{
                rows,
                expandable,
                expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
                symbol: expanded ? readLessText : readMoreText,
            }}
            copyable={copyable ? {
                icon:<ReactIcons.CopyIcon />
            }: undefined}
            className={`mb-0 ${className}`}
            style={style}
        >
            {children||content}
        </Typography.Paragraph>
    );
};

CustomParagraph.propTypes = {
    content: PropTypes.any,
    children: PropTypes.any,
    rows: PropTypes.number,
    copyable: PropTypes.bool,
    expandable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string,
    style: PropTypes.object,
    readMoreText: PropTypes.string,
    readLessText: PropTypes.string,
};

export default CustomParagraph;
