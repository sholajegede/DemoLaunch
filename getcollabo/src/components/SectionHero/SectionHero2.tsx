import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import VideoForHeroSection from "./VideoForHeroSection";

export interface SectionHero2Props {
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex flex-col items-start flex-shrink-0 space-y-8 lg:w-1/2 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="mt-10 sm:mt-20 lg:mt-14 xl:mt-14 md:mt-20 font-semibold text-3xl sm:text-5xl md:text-5xl xl:text-6xl !leading-[114%]">
            Collaboration Workflows Made Easy
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Build a personalized rate card, create invoices, receive payments,
            manage contracts, chat with brands, and track multiple
            collaborations - all in one place.
            <br />{" "}
          </span>

          <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Link to="/pricing">
              <ButtonPrimary sizeClass="py-2.5 px-9" className="flex-1">
                <span className="mr-2">Create a Free Account</span>
                <span>
                  <svg
                    className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                </span>
              </ButtonPrimary>
            </Link>
            <Link to="/login-creator">
              <ButtonSecondary sizeClass="py-2.5 px-24" className="flex-1">
                <span className="mr-2">Login</span>
                <span>
                  <svg
                    className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                </span>
              </ButtonSecondary>
            </Link>
          </div>
        </div>
        <div className="flex-grow mb-44">
          <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
            <div className="relative flex-shrink-0 ">
              <VideoForHeroSection
                isPlaying={isVideoPlaying}
                onPlayToggle={toggleVideoPlay}
              />

              <div className="">
                <NcImage
                  containerClassName="flex block dark:hidden aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                  src="https://res.cloudinary.com/newlink/image/upload/v1691881809/Landing%20Page%20Images/hero_dark_qmqs61.png"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="light"
                />
                <NcImage
                  containerClassName="flex hidden dark:block aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                  src="https://res.cloudinary.com/newlink/image/upload/v1691881809/Landing%20Page%20Images/hero_light_pykfvl.png"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="dark"
                />
              </div>

              <ButtonSecondary
                onClick={toggleVideoPlay}
                className={`absolute animate-bounce bottom-14 left-2 ${
                  isVideoPlaying ? "hidden" : ""
                }`}
              >
                {isVideoPlaying ? "" : "Watch a demo"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 animate-pulse">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;