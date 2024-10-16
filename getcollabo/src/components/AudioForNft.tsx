import { useAppSelector } from "app/hooks";
import { selectCurrentMediaRunning } from "app/mediaRunning/mediaRunning";
import React, { FC, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import isSafariBrowser from "utils/isSafariBrowser";

interface AudioForNftProps {
  src?: string;
  className?: string;
  videoId: string;
}

const AudioForNft: FC<AudioForNftProps> = ({
  videoId,
  className = "absolute opacity-0 ",
  src = "./music.mp3",
}) => {
  const currentMediaRunning = useAppSelector(selectCurrentMediaRunning);

  let [isShowing, setIsShowing] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 200);

  const IS_PLAY =
    currentMediaRunning.videoId === videoId &&
    currentMediaRunning.state === "playing";

  useEffect(() => {
    if (currentMediaRunning.state === "paused") {
      setIsShowing(false);
      resetIsShowing();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMediaRunning]);

  useEffect(() => {
    const audioEl = document.getElementById(videoId) as HTMLAudioElement;
    if (!audioEl) return;

    if (IS_PLAY) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }, [IS_PLAY, videoId]);

  if (!isSafariBrowser() && !IS_PLAY) {
    return null;
  }

  // FOR SAFARI BROWSER
  if (!isShowing) {
    return null;
  }

  return (
    <div
      className={className}
      title="Play"
      dangerouslySetInnerHTML={{
        __html: `<audio id=${videoId} loop  >
                <source src=${src} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>`,
      }}
    ></div>
  );
};

export default AudioForNft;
