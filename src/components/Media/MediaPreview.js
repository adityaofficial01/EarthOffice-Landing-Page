import React from 'react';
import PropTypes from 'prop-types';
import CustomVideo from './CustomVideo';
import CustomAudio from './CustomAudio';
import { MIME_TYPE } from 'Constant/variable';
import CustomImage from 'components/CustomImage';

const MediaPreview = ({ mediaType = null, mediaSrc = null, imageClassname = '', preview=false , autoPlay=false, videoHeight=''}) => {
  if (!mediaType || !mediaSrc) return null; // Early return if props are missing

  return (
    <div className="">
      {mediaType?.includes(MIME_TYPE.VIDEO) && (
        <CustomVideo src={mediaSrc} autoPlay={autoPlay} height={videoHeight} maxHeight="55vh" />
      )}
      {mediaType?.includes(MIME_TYPE.IMAGE) && (
        <div className="flex justify-center items-center min-h-40">
            <CustomImage src={mediaSrc} className={imageClassname} preview={preview} />
          {/* <CustomAvatar size={180} shape='square' className='bg-transparent'>
          </CustomAvatar> */}
        </div>
      )}
      {mediaType?.includes(MIME_TYPE.AUDIO) && (
        <CustomAudio src={mediaSrc} autoplay />
      )}
    </div>
  );
};

// PropTypes for type-checking
MediaPreview.propTypes = {
  mediaType: PropTypes.string.isRequired, // Restrict to valid types
  mediaSrc: PropTypes.string.isRequired, // Must be a string and required
  imageClassname: PropTypes.string, // Must be a string
};

export default MediaPreview;