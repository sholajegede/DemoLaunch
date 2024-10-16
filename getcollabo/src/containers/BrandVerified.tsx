import React, { FC, useContext, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { GoVerified } from "react-icons/go";
import { AuthContext } from "context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Page404 from "./Page404/Page404";

export interface BrandVerifiedProps {
  className?: string;
}

const BrandVerified: FC<BrandVerifiedProps> = ({ className = "" }) => {
  const { brand } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const previousLocation = localStorage.getItem("previousLocation");

    if (previousLocation) {
      localStorage.removeItem("previousLocation"); 
      history.push(previousLocation);
    } else {
      history.push("/brand");
    }
  }, [brand, history]);

  if (!brand) {
    return <Page404 />;
  }

  return (
    <div className={`nc-BrandVerified ${className}`} data-nc-id="BrandVerified">
      <Helmet>
        <title>Brand Verified</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
          <div className="mt-28 md:mt-32 lg:mt-40 xl:mt-40 sm:mt-32">
            <div className="">
              <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="text-3xl font-semibold">
                      <p>Account Verified!</p>
                    </div>
                    <div className="items-center justify-center">
                      <GoVerified className="mt-8 mb-8 w-[60px] h-[60px] fill-green-500" />
                    </div>
                    <Link className="mt-8" to="/complete-registration">
                      <ButtonPrimary>Complete Account Info</ButtonPrimary>
                    </Link>
                  </div>

                  {/* ==== */}
                  <span className="block text-center xl:text-center md:text-center text-neutral-700 dark:text-neutral-300">
                    Skip? {` `}
                    <Link className="text-green-600" to="/brand">
                      Go to dashboard
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandVerified;