import React, { FC, useEffect } from "react";

interface VideoForHeroSectionProps {
  isPlaying: boolean;
  className?: string;
  videoId?: string;
  onPlayToggle: () => void;
}

const VideoForHeroSection: FC<VideoForHeroSectionProps> = ({
  isPlaying,
  className = "relative w-full h-full",
  videoId = "QmYJUUx0rTM", // YouTube video ID
  onPlayToggle,
}) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}`;

  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isPlaying]);

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <button
              className="absolute text-xl text-white top-20 sm:top-12 right-4 xl:top-20 xl:right-64"
              onClick={onPlayToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-[950px] h-[500px] rounded-3xl"
              src={videoUrl}
              title="Demo: How GetCollabo enables thousands of creators in Nigeria simplify their workflows"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-neutral-700 rounded-3xl ${
            isPlaying ? "opacity-0 z-[-1]" : ""
          }`}
          title="Play"
        >
          <button
            className="text-4xl text-white cursor-pointer"
            onClick={onPlayToggle}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoForHeroSection;