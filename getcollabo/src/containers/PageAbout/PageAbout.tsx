import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import { Helmet } from "react-helmet";
import rightImg from "images/getcollabowide.png";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHero from "./SectionHero";
import SectionStatistic from "containers/PageAbout/SectionStatistic";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About Us</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="We exist to create a sense of possibility that anyone, anywhere at anytime can become a creator and be successful. We provide creators with user-friendly tools to make their collaborative experiences seamless."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711180/Screenshot_179_iv4ers.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="We exist to create a sense of possibility that anyone, anywhere at anytime can become a creator and be successful. We provide creators with user-friendly tools to make their collaborative experiences seamless."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711180/Screenshot_179_iv4ers.png"
        />
      </Helmet>

      

      <div className="container py-16 space-y-16 lg:py-28 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us"
          btnText=""
          subHeading="At the intersection of simplicity and innovation is GetCollabo. An all-in-one platform that is simplifying and streamlining the processes involved in brand communication, contracts, invoices, booking, payments, collaboration management, and content delivery for content creators."
        />

        <div className="relative py-20 lg:py-24">
          <SectionFounder />
        </div>

        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionStatistic />
        </div>

        <div className="relative py-20 lg:py-24">
          <SectionSubscribe2 />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;