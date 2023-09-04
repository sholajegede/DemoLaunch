// @ts-nocheck
import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import newRequest from "utils/newRequest";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  heading = "Browse by industry",
  subHeading = "Creators by industries",
  className = "",
  itemClassName = "",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 4.5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 3.5,
        },
        1024: {
          gap: 20,
          perView: 3.5,
        },
        768: {
          gap: 20,
          perView: 2.5,
        },
        500: {
          gap: 20,
          perView: 1.5,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  const [industries, setIndustries] = useState([]);

  //
  useEffect(() => {
    const fetchIndustries = async () => {
      const response = await newRequest.get("/influencer/countByIndustry");
      setIndustries(response.data);
    };
    fetchIndustries();
  }, [newRequest]);
  //

  const images = [
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
    "https://res.cloudinary.com/newlink/image/upload/v1673480234/upload/ieeu76pmutce6fd619ys.png",
  ];

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {images &&
              industries
                .filter((industry) => industry.count > 0) // Filter out industries with count = 0
                .map((industry, i) => (
                  <li key={i} className={`glide__slide ${itemClassName}`}>
                    <div
                      className={`flex aspect-w-16 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0`}
                    >
                      <NcImage
                        src={images[i % images.length]} // Use modulo operator to loop through the images
                        className="object-cover w-full h-full rounded-2xl"
                      />
                      <span className="absolute inset-0 transition-opacity bg-black opacity-0 group-hover:opacity-100 bg-opacity-10"></span>
                    </div>
                    <Link to={"/search"} className="absolute inset-0"></Link>
                    <div className="flex items-center mt-4">
                      <div className="ml-3">
                        <h2
                          className={`capitalize text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
                        >
                          {industry.industry}
                        </h2>
                        <span
                          className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
                        >
                          {industry.count}{" "}
                          {industry.count === 1 ? "Creator" : "Creators"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCategories;