import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link } from "react-router-dom";

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(!Cookies.get("cookieConsent"));

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setShowBanner(false);
  };

  const handleRejectCookies = () => {
    Cookies.remove("cookieConsent");
    setShowBanner(false);
  };

  return showBanner ? (
    <section className="fixed bottom-0 right-0 max-w-md p-4 mx-auto bg-white border border-gray-200 shadow-xl dark:bg-gray-800 sm:right-4 sm:bottom-4 md:right-4 md:bottom-4 lg:right-4 lg:bottom-4 xl:right-4 xl:bottom-4 dark:border-gray-700 rounded-2xl">
      <h2 className="inline-flex text-xl font-semibold text-gray-800 dark:text-white">
        <img
          src="https://uploads-ssl.webflow.com/647f7f778e35c8d9fc03512c/6480b63bab34bb823d455a69_Frame%20(1).svg"
          loading="lazy"
          alt=""
          className="w-6 h-6"
        ></img>{" "}
        <span className="ml-2">Cookie Notice</span>
      </h2>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        We use cookies to ensure that we give you the best experience on our
        website.{" "}
        <Link to="/cookies" className="text-primary-6000 hover:underline">
          Read our cookie policy.
        </Link>
      </p>

      <div className="flex items-center mt-8 space-x-2 shrink-0">
        <ButtonPrimary sizeClass="px-6 py-2" onClick={handleAcceptCookies}>
          Accept
        </ButtonPrimary>
        <ButtonSecondary sizeClass="px-6 py-2" onClick={handleRejectCookies}>
          Reject
        </ButtonSecondary>
      </div>
    </section>
  ) : null;
};

export default CookieBanner;