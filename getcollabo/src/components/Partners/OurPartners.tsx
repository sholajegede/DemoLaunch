import React, { FC } from "react";
import microsoft from "../../images/ms_startups.png";
import stripe from "../../images/Stripe-Inc.png";
import flutterLight from "../../images/flutterwaveLight.png";
import flutterDark from "../../images/flutterwaveDark.png";
import payLight from "../../images/paystackLight.png";
import payDark from "../../images/paystackDark.png";

export interface OurPartnersProps {
  className?: string;
}

const OurPartners: FC<OurPartnersProps> = ({ className = "" }) => {
  return (
    <div className={`nc-OurPartners  ${className}`} data-nc-id="OurPartners">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
          <header className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="flex items-center justify-center text-4xl font-semibold sm:text-4xl xl:text-5xl lg:text-5xl text-neutral-900 dark:text-neutral-100">
              Our Trusted Partners
            </h2>
          </header>
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 dark:text-gray-400">
            <span className="flex items-center justify-center">
              <img src={stripe} />
            </span>
            <span className="flex items-center justify-center dark:hidden">
              <img src={payDark} />
            </span>
            <span className="items-center justify-center hidden dark:flex">
              <img src={payLight} />
            </span>
            <span className="flex items-center justify-center">
              <img src={flutterDark} />
            </span>
            <span className="flex items-center justify-center">
              <svg
                className="h-8 hover:text-gray-900 dark:hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 408 44"
              >
                <path
                  fill="#00A5E4"
                  d="M393.17.4V32c0 .6-.26 1.1-.76 1.5-.52.3-1.12.5-1.83.5-.57 0-1.13-.1-1.68-.3-.53-.2-.97-.6-1.3-1-1.18-1.7-3.05-6-5.6-12.8-2.3-6.3-4.73-10.8-7.28-13.6-3.84-4.2-8.97-6.3-15.4-6.3-4.81 0-8.78.7-11.88 2-3.57 1.7-5.37 4-5.37 7.1v33.7h14.41V11.2c0-.6.17-1 .51-1.4.33-.3.97-.5 1.89-.7 1.37-.1 3.13 1.7 5.26 5.5 1.51 2.6 3.32 6.5 5.47 11.6 2.29 5.4 3.58 8.4 3.87 8.9 1.4 2.8 3.82 4.9 7.23 6.4 3.03 1.3 6.48 1.9 10.36 1.9 4.43 0 8.25-.8 11.44-2.4 3.38-1.8 5.07-4 5.07-6.7V.4h-14.41zm-70.88 29.5c-2.07 2.6-4.82 3.9-8.23 3.9h-16.42c-3.44 0-6.19-1.3-8.23-3.9-1.85-2.3-2.78-5.2-2.78-8.5 0-3.2.92-5.9 2.73-8.1 2.02-2.4 4.77-3.6 8.28-3.6h16.42c3.54 0 6.31 1.2 8.33 3.6 1.82 2.2 2.73 4.9 2.73 8.1 0 3.3-.94 6.2-2.83 8.5zM316.44.8h-21.2c-7.5 0-13.48 2.2-17.96 6.7-2.15 2.2-3.71 4.6-4.71 7.2.04-.4.06-.8.06-1.2 0-3.4-1.46-6.4-4.41-8.7-3.22-2.7-7.59-4-13.12-4h-82.84v8.9h14.62v33.2h14.21V9.7h51.64c1.62 0 2.91.4 3.83 1.2.82.7 1.25 1.6 1.25 2.6s-.43 1.8-1.25 2.5c-.92.8-2.21 1.1-3.83 1.1h-17.64c-5.77 0-10.15 1.2-13.13 3.6-2.59 2.1-3.88 4.8-3.88 8.2v13.9h14.21V32.3l40.86 11.4v-9.9l-27.01-7.6h8.96c5.56 0 9.95-1.3 13.17-3.9 1.51-1.3 2.62-2.6 3.34-4.2-.23 1.3-.35 2.7-.35 4.1 0 5.6 1.97 10.4 5.93 14.2 4.41 4.3 10.43 6.5 18.05 6.5h21.2c7.66 0 13.69-2.2 18.09-6.5 3.94-3.8 5.9-8.6 5.9-14.2 0-5.8-2.02-10.7-6.03-14.7C329.93 3 323.94.8 316.44.8zm-191.66 3c-3.12 1.7-5.43 4.2-6.89 7.6-1.21 2.8-1.82 6.1-1.82 10.1v21.4h14.41V26.2h40.4v-9.1h-40.4c.09-.6.21-1.2.34-1.9.41-1.5 1.14-2.7 2.2-3.6 1.47-1.3 3.47-1.9 5.99-1.9h31.87V.8h-31.87c-5.9 0-10.64 1-14.23 3zM95.44 29.9c-2.07 2.6-4.82 3.9-8.23 3.9H72.22V9.7h14.99c3.54 0 6.32 1.2 8.33 3.6 1.79 2.2 2.68 4.9 2.68 8.1 0 3.4-.93 6.2-2.78 8.5zM89.61.8h-31.8v42.1h31.8c7.65 0 13.68-2.2 18.1-6.5 3.92-3.8 5.88-8.6 5.88-14.2 0-5.8-2-10.7-6.03-14.7C103.09 3 97.11.8 89.61.8zm-39.44 4c-3.22-2.7-7.6-4-13.12-4H.04v8.9h34.62c1.64 0 2.92.4 3.84 1.2.84.7 1.25 1.6 1.25 2.6s-.41 1.8-1.25 2.5c-.92.8-2.2 1.1-3.84 1.1H17.04c-5.78 0-10.15 1.2-13.13 3.6C1.32 22.8.04 25.6.04 28.9.02 31.1 0 33.2 0 35.2V40c0 1.2.02 2.2.04 2.9h14.19v-9c-.09-.1-.14-.3-.16-.5-.03-.1-.04-.4-.04-.9 0-1.6.51-2.9 1.54-3.9 1.53-1.6 4.06-2.4 7.61-2.4h13.85c5.57 0 9.97-1.3 13.19-3.9 2.9-2.4 4.36-5.3 4.36-8.8 0-3.4-1.47-6.4-4.41-8.7z"
                />
              </svg>
            </span>
            <span className="flex items-center justify-center">
              <img src={microsoft} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPartners;