// @ts-nocheck
import React, { FC, useEffect, useId, useRef } from "react";
import HeadingDeliverable from "components/Heading/HeadingDeliverable";
import Glide from "@glidejs/glide";
import CardNFTVideo from "./CardNFTVideo";
import { InfluencerData } from "routers/types";

export interface SectionSliderCardNftVideoProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  deliverableProp: InfluencerData;
}

const SectionSliderCardNftVideo: FC<SectionSliderCardNftVideoProps> = ({
  className = "",
  itemClassName = "",
  deliverableProp,
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 1.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 1.8,
        },
        1024: {
          gap: 20,
          perView: 1.8,
        },
        768: {
          gap: 20,
          perView: 1.8,
        },
        500: {
          gap: 20,
          perView: 1.0,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCardNftVideo ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <HeadingDeliverable
          desc={`These are some deliverables ${deliverableProp.username} has made for other brands`}
          hasNextPrev
        ></HeadingDeliverable>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {deliverableProp.videoSample &&
              deliverableProp.videoSample.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <CardNFTVideo url={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCardNftVideo;