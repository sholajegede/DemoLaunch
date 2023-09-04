import React, { FC, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { Tab } from "@headlessui/react";

export interface PageEditProfileProps {
  className?: string;
}

const PageEditProfile: FC<PageEditProfileProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  return (
    <div
      className={`nc-PageEditProfile ${className}`}
      data-nc-id="PageEditProfile"
    >
      <Helmet>
        <title>Update Account</title>
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* HEADING */}
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Account Update
                    </div>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </Tab.Group>
          <div className="max-w-2xl">
            <span className="block mt-8 mb-2 text-sm text-neutral-500 dark:text-neutral-400">
              Choose from the following to update any part of your account.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-3">
              <div className="max-w-sm">
                <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    General Info
                  </h5>

                  <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                    Update your email, profile image, username, or bio.
                  </p>
                  <Link to={"/general-info"}>
                    <ButtonPrimary sizeClass="px-5 py-2" type="button">
                      Update
                    </ButtonPrimary>
                  </Link>
                </div>
              </div>

              <div className="max-w-sm">
                <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                    />
                  </svg>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Subscription
                  </h5>

                  <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                    Update details of your subscription plan
                  </p>
                  <Link to={"/subscription"}>
                    <ButtonPrimary sizeClass="px-5 py-2" type="button">
                      Update
                    </ButtonPrimary>
                  </Link>
                </div>
              </div>

              <div className="max-w-sm">
                <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Password
                  </h5>

                  <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                    Update your password and secure your account
                  </p>
                  <Link to={"/password-update"}>
                    <ButtonPrimary sizeClass="px-5 py-2" type="button">
                      Update
                    </ButtonPrimary>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageEditProfile;