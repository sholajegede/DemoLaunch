import React, { FC } from "react";
import { useAppSelector } from "app/hooks";
import { selectCurrentMediaRunning } from "app/mediaRunning/mediaRunning";

interface VideoForNftProps {
  src?: string;
  className?: string;
  videoId?: string;
}

const VideoForNft: FC<VideoForNftProps> = ({
  videoId,
  className = "absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-neutral-700 rounded-3xl",
  src = videoId,
}) => {
  const currentMediaRunning = useAppSelector(selectCurrentMediaRunning);

  const IS_PLAY =
    currentMediaRunning.videoId === videoId &&
    currentMediaRunning.state === "playing";

  if (!IS_PLAY) {
    return null;
  }

  return (
    <div
      className={`${className} ${IS_PLAY ? "" : "opacity-0 z-[-1]"}`}
      title="Play"
    >
      <video
        className="object-cover w-full h-full"
        playsInline
        autoPlay
        loop
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoForNft;