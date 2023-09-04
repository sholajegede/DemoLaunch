import React from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHero2 from "components/SectionHero/SectionHero2";
import FeaturesProfile from "components/SectionFeatures/FeaturesProfile";
import FeaturesDiscovery from "components/SectionFeatures/FeaturesDiscovery";
import FeaturesQuestions from "components/SectionFeatures/FeaturesQuestions";
import FeaturesPayments from "components/SectionFeatures/FeaturesPayments";
import FeaturesContracts from "components/SectionFeatures/FeaturesContracts";
import FeaturesChats from "components/SectionFeatures/FeaturesChats";
import FeaturesDashboard from "components/SectionFeatures/FeaturesDashboard";
import OurPartners from "components/Partners/OurPartners";
import Customers from "components/Partners/Customers";
import FAQAccordionShort from "containers/FaqAccordion/FAQAccordionShort";
import FeaturesInvoices from "components/SectionFeatures/FeaturesInvoices";

function PageHome() {
  return (
    <div className="relative overflow-hidden nc-PageHome">
      <Helmet>
        <title>
          GetCollabo | Brand Collaboration Management Tool For Creators
     </title>

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
          content="https://res.cloudinary.com/newlink/image/upload/v1687711185/Screenshot_176_b3f3ry.png"
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
          content="https://res.cloudinary.com/newlink/image/upload/v1687711185/Screenshot_176_b3f3ry.png"
        />
      </Helmet>

      <div className="container relative mt-6 lg:mt-20">
        {/* SECTION HERO */}
        <SectionHero2 />

        {/* SECTION 2 */}
        <Customers />
      </div>

      <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
        {/* SECTION START */}
        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <FeaturesInvoices />
        </div>

        <div className="relative">
          <FeaturesProfile />
        </div>

        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <FeaturesQuestions />
        </div>

        <div className="relative">
          <FeaturesContracts />
        </div>

        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <FeaturesPayments />
        </div>

        <div className="relative">
          <FeaturesChats />
        </div>

        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <FeaturesDashboard />
        </div>

        <div className="relative">
          <FeaturesDiscovery />
        </div>

        <div className="relative py-20 lg:py-20">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionBecomeAnAuthor />
        </div>

        <FAQAccordionShort />

        <OurPartners />

        <SectionSubscribe2 />
        
        {/* SECTION END */}
      </div>
    </div>
  );
}

export default PageHome;