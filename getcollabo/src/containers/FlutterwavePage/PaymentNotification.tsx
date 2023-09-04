// @ts-nocheck
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";

export interface PaymentNotificationProps {
  className?: string;
}

const PaymentNotification: FC<PaymentNotificationProps> = ({ className = "" }) => {

  return (
        <div className={`nc-PaymentNotification pt-20 pb-72 ${className}`} data-nc-id="PaymentNotification">
          <Helmet>
            <title>Payment Notification</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-10">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Subscription Successful 🎉!</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-600 dark:text-gray-400">
                          <p>
                            Hi👋, your subscription to GetCollabo was processed successfully.
                          </p>
                        </div>
                        <svg
                          aria-hidden="true"
                          className="w-24 h-24 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>

                      <ButtonPrimary href={"/create-profile"}>
                        Create your Account
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default PaymentNotification;