import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import { Link } from "react-router-dom";

export interface SectionBecomeAnAuthorProps {
  className?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-36" />
        <h2 className="font-semibold text-4xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Built for how Creators Collaborate
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          Start simplifying your workflows today.
        </span>
        <Link
          to="/pricing"
          className="flex mt-6 space-x-2 sm:space-x-5 sm:mt-12"
        >
          <ButtonPrimary>
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
      </div>
      <div className="flex-grow">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0">
            <div>
              <NcImage
                containerClassName="flex h-full w-full rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1683967247/upload/join-getcollabo.a0bfd2bcc38a806f1ec4_sa6smq.jpg"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="signup-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;