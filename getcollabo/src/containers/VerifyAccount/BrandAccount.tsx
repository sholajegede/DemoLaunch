// @ts-nocheck
import React, { FC, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import newRequest from "utils/newRequest";
import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";
import BrandLogin from "containers/PageLogin/BrandLogin";

export interface BrandAccountProps {
  className?: string;
}

const BrandAccount: FC<BrandAccountProps> = ({ className = "" }) => {
  const { brand } = useContext(AuthContext);

  const history = useHistory();

  const resendOTP = async () => {
    try {
      const resend = await newRequest.post(
        `/auth-brand/resendOTP/${brand._id}`
      );
      history.push("/verifyBrand");
      console.log(resend.status);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        history.push("/brand-verified");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {brand ? (
        <div
          className={`nc-BrandAccount ${className}`}
          data-nc-id="BrandAccount"
        >
          <Helmet>
            <title>Account Re-verification</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-28 md:mt-32 lg:mt-40 xl:mt-40 sm:mt-32">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Verify your Email</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-600 dark:text-gray-400">
                          <p>
                            Hi{" "}
                            <span className="capitalize">
                              {brand.businessName}
                            </span>
                            , you need to verify your email address:
                            <span className="text-primary-6000">
                              {" "}
                              "{brand.email}"
                            </span>{" "}
                            to continue using GetCollabo
                          </p>
                        </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-24 h-24 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                          />
                        </svg>
                      </div>

                      <ButtonPrimary onClick={resendOTP}>
                        Click to verify
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BrandLogin />
      )}
    </>
  );
};

export default BrandAccount;