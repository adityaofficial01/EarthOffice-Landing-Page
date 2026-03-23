import React from "react";
import { Image } from "antd";
import PropTypes from "prop-types";
import IconButton from "../IconButton";
import { fileUrl } from "utils/Constant";
import MediaPreview from "./MediaPreview";
import { MIME_TYPE } from "Constant/variable";
import { ReactIcons } from "utils/ReactIcons";
import { StaticImages } from "utils/StaticImages";
import useDynamicMediaQuery from "Hook/useDynamicMediaQuery";

const MediaPlayer = ({
  width = 200,
  height = "auto",
  imageSrc = "",
  videoSrc = "",
  mediaType = MIME_TYPE.IMAGE,
  visible = false,
  setVisible,
  hiddenChildNode = false
}) => {
  const isTab = useDynamicMediaQuery(767, false);

  // Determine media source
  const mediaSrc =
    mediaType === MIME_TYPE.VIDEO ? `${fileUrl}${videoSrc}` : `${fileUrl}${imageSrc}`;
  
  // Fallback for unsupported media types
  const fallbackSrc = mediaType === MIME_TYPE.AUDIO ? StaticImages.AUDIO : mediaSrc;

  // Preview Icon
  const previewIcon =
    mediaType === MIME_TYPE.VIDEO || mediaType === MIME_TYPE.AUDIO
      ? <ReactIcons.PlayIcon className="text-green-600" />
      : <ReactIcons.EyeIcon className="text-green-600" />;

  return (
    <Image
      className={hiddenChildNode ? "hidden" : ""}
      width={isTab ? "auto" : width}
      height={height}
      preview={{
        visible,
        onVisibleChange: (isVisible) => setVisible && setVisible(isVisible),
        closeIcon: setVisible && (
          <IconButton
            Icon={<ReactIcons.CloseIcon className="h-12 w-12 text-red-600" />}
            onClick={() => setVisible(false)}
          />
        ),
        destroyOnClose: true,
        imageRender: () => <MediaPreview mediaType={mediaType} mediaSrc={mediaSrc} />,
        toolbarRender: () => null,
        icon: previewIcon,
      }}
      src={fallbackSrc}
    />
  );
};

// PropTypes validation
MediaPlayer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageSrc: PropTypes.string,
  videoSrc: PropTypes.string,
  mediaType: PropTypes.oneOf([MIME_TYPE.IMAGE, MIME_TYPE.VIDEO, MIME_TYPE.AUDIO]),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  hiddenChildNode: PropTypes.bool,
};

export default MediaPlayer;
