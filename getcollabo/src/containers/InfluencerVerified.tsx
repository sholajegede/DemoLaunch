// @ts-nocheck
import React, { FC, useContext, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { GoVerified } from "react-icons/go";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { Link } from "react-router-dom";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";

export interface InfluencerVerifiedProps {
  className?: string;
}

const InfluencerVerified: FC<InfluencerVerifiedProps> = ({ className = "" }) => {

  const { influencer } = useContext(InfluencerAuthContext);

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  //
  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);
  //

  return (
    <div>
      {influencerProfile.verified === true ? (
        <div className={`nc-InfluencerVerified ${className}`} data-nc-id="InfluencerVerified">
          <Helmet>
            <title>Creator Verified</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-10">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Email Verified!</p>
                        </div>
                        <div className="items-center justify-center">
                          <GoVerified className="mt-8 mb-8 w-[60px] h-[60px] fill-green-500"/>
                        </div>
                        <Link className="mt-8" to={"/welcome"}>
                          <ButtonPrimary>
                            Go to Workspace
                          </ButtonPrimary> 
                        </Link>
                      </div>        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InfluencerVerified;