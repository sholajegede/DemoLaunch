import React from "react";
import { Link } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const EditBrandButton = ({ brandProfile }) => {
  if (
    !brandProfile.businessName ||
    !brandProfile.logo ||
    !brandProfile.desc ||
    !brandProfile.industry
  ) {
    return null;
  }

  return (
    <Link to={`/update/${brandProfile._id}`}>
      <ButtonSecondary sizeClass="px-4 py-1.5 sm:px-5">
        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="hidden xl:block sm:block md:block lg:block">Edit Profile</span>
        <span className="xl:hidden block sm:hidden md:hidden lg:hidden">Edit</span>
      </ButtonSecondary>
    </Link>
  );
};

export default EditBrandButton;