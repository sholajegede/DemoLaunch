// @ts-nocheck
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export interface PageSurveyProps {
  className?: string;
}

export interface SectionVideosProps {
  className?: string;
}

const PageSurvey: FC<PageSurveyProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageSurvey container pb-24 lg:pb-32 ${className}`}
      data-nc-id="PageSurvey"
    >
      <Helmet>
        <title>User Survey</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711329/Screenshot_183_nouweo.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711329/Screenshot_183_nouweo.png"
        />
      </Helmet>
      <div className="max-w-2xl mx-auto my-16 text-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdPuzA8faElMcwZgBX9kaZcg8fZe7Ayd4xBU5cB-R6MAzDAGA/viewform?embedded=true"
          width="640"
          height="1250"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Are you a Creator? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/signup"
          >
            Signup/Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageSurvey;