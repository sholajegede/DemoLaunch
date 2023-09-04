// @ts-nocheck
import React, { FC, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";

export interface FailedProps {
  className?: string;
}

const Failed: FC<FailedProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  return (
    <>
      {influencer.stripeCustomerId ? (
        <div className={`nc-Failed ${className}`} data-nc-id="Failed">
          <Helmet>
            <title>Payment Failed</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-10">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>😔 Subscription Failed</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-600 dark:text-gray-400">
                          <p>
                            Hi{" "}
                            <span className="capitalize">
                              {influencer.username}
                            </span>
                            👋, your attempt at getting a subscription failed.
                          </p>
                        </div>
                        <svg
                          className="w-24 h-24 text-red-500 dark:text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>

                      <ButtonPrimary href={"/pricing"}>
                        Please try it again
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </>
  );
};

export default Failed;