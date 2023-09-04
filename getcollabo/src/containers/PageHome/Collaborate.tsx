import React from "react";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";

function Collaborate() {
  return (
    <div className="relative overflow-hidden nc-Collaborate">
      <Helmet>
        <title>GetCollabo | Collaborate with Creators Globally</title>
        
        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta property="og:description" content="Discover, chat and book creators. Manage and track campaigns. Collaborate seamlessly - all in one platform." />
        <meta property="og:image" content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png" />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta name="twitter:description" content="Discover, chat and book creators. Manage and track campaigns. Collaborate seamlessly - all in one platform." />
        <meta name="twitter:image" content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png" />
      </Helmet>
      
      <div className="container relative mt-6 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero2 />

        {/* SECTION 2 */}
        <SectionHowItWork className="lg:mt-20 xl:mt-20" />
      </div>

      <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
        {/* SECTION START */}
        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>
        
        <div className="relative py-20 lg:py-20">
          <SectionBecomeAnAuthor />
        </div>

        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionSubscribe2 />
        </div>
        {/* SECTION END */}
      </div>
    </div>
  );
}

export default Collaborate;
