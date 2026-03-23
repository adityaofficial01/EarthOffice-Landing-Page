/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';

const CustomAudio = ({ src=undefined, controls=true, autoplay=false, loop=false, trackSrc=undefined, trackLabel='English captions', trackLang='en' }) => {
  return (
    <div className="min-w-80 flex flex-col items-center">
      <audio
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        src={src}
        controlsList='nodownload'
        className="w-full outline-none"
        onError={(e) => {
          console.error('Error loading audio source:', e.target.src);
          alert('Failed to load the audio file. Please check the source.');
        }}
      >
        {/* Track for captions */}
        {trackSrc && (
          <track
            kind="captions"
            src={trackSrc}
            srcLang={trackLang}
            label={trackLabel}
            default
          />
        )}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

// Prop validation
CustomAudio.propTypes = {
  src: PropTypes.string.isRequired, // Ensure src is a valid string
  controls: PropTypes.bool, // To display or hide controls
  autoplay: PropTypes.bool, // Whether to autoplay audio
  loop: PropTypes.bool, // Whether to loop the audio
  trackSrc: PropTypes.string, // URL for the captions file
  trackLabel: PropTypes.string, // Label for the track
  trackLang: PropTypes.string, // Language of the captions
};

export default CustomAudio;