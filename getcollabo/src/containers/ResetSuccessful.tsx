// @ts-nocheck
import React, { FC, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { GoVerified } from "react-icons/go";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { AuthContext } from "context/AuthContext";

export interface ResetSuccessfulProps {
  className?: string;
}

const ResetSuccessful: FC<ResetSuccessfulProps> = ({ className = "" }) => {

  const { influencer } = useContext(InfluencerAuthContext);

  const { brand } = useContext(AuthContext);

  return (
    <div
      className={`nc-ResetSuccessful ${className}`}
      data-nc-id="ResetSuccessful"
    >
      <Helmet>
        <title>Reset Successful</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
          <div className="mt-28 md:mt-32 lg:mt-40 xl:mt-40 sm:mt-32">
            <div className="">
              <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="text-3xl font-semibold">
                      <p>Reset Successful!</p>
                    </div>
                    <div className="items-center justify-center">
                      <GoVerified className="mt-8 w-[60px] h-[60px] fill-green-500"/>
                    </div>
                  </div>
                  {influencer ? (
                    <ButtonPrimary href="/dashboard">
                      Go to Dashboard
                    </ButtonPrimary>  
                  ) : brand ? (
                    <ButtonPrimary href="/brand">
                      Go to Dashboard
                    </ButtonPrimary>  
                  ) : (
                    <ButtonPrimary href="/login-brand">
                      Login
                    </ButtonPrimary>
                  )}             
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccessful;
