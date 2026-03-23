import React from 'react';
import PropTypes from 'prop-types';

const CustomVideo = ({ src, autoPlay, muted, width, height, maxHeight, controls, className }) => {
    console.log('Received props:', { autoPlay, muted, controls });

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <video
                autoPlay={!!autoPlay}
                muted={muted}
                width={width}
                height={height}
                style={{ maxHeight }}
                controls={controls}
                controlsList="nodownload noremoteplayback" // Disable download option
                src={src}
                disablePictureInPicture
            >
                {/* Accessibility: Add a sample track */}
                <track
                    default
                    kind="captions"
                    srcLang="en"
                    src="" // Replace with the actual path if available
                    label="English"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

// Define PropTypes for validation
CustomVideo.propTypes = {
    src: PropTypes.string.isRequired, // URL for video source
    autoPlay: PropTypes.bool, // Whether to autoplay the video
    muted: PropTypes.bool, // Whether the video is muted
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Width of the video
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Height of the video
    maxHeight: PropTypes.string, // Maximum height for responsiveness
    controls: PropTypes.bool, // Whether to show controls
};

// Set default values for optional props
CustomVideo.defaultProps = {
    autoPlay: false, // Default: Do not autoplay
    muted: false, // Default: Audio is enabled
    width: '75%', // Default width
    height: 'auto', // Default height
    maxHeight: '90%', // Maximum height
    controls: true, // Show controls by default
};

export default CustomVideo;
