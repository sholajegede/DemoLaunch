// @ts-nocheck
import { CheckIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { TbCurrencyNaira } from "react-icons/tb";
import { Helmet } from "react-helmet";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageSubcriptionProps {
  className?: string;
}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricingList: PricingItem[] = [
  {
    isPopular: false,
    name: "Starter Plan",
    pricing: "0",
    per: "/month",
    features: [
      "Rate card (with a personalized booking link)",
      "Unlimited booking management",
      "Unlimited deliverables",
      "Unlimited invoices",
      "Connect 6 social media accounts",
      "Booking by email",
      "Unlimited content delivery (up to 200MB/video)",
    ],
    desc: `New Cat 🐈. Upcoming Creator. Time to showcase your unique value to brands and get paid for it.`,
  },
  {
    isPopular: true,
    name: "Upgrade Plan",
    pricing: "2,800",
    per: "/month",
    features: [
      "Everything in Starter Plan",
      "Unlimited brand proposals (In-app booking)",
      "In-app messaging",
      "Unlimited booking contracts + Legal templates",
      //"Task manager",
      "Receive payments by Bank Transfer",
    ],
    desc: `You have realized the potential and want more conversions😉.`,
  },
  {
    isPopular: false,
    name: "Pro Plan",
    pricing: "5,000",
    per: "/month",
    features: [
      "Everything in Upgrade Plan",
      "Omni-channel messaging",
      "Content tracking & performance analytics",
      "Global payment options (including Cryptocurrency)",
      "Co-collaboration with other creators",
      "Global visibility to International Brands",
    ],
    desc: `Boss🙌, we want to give you maximum reach, impressions, and conversions🫡!`,
  },
];

const PageSubcription: FC<PageSubcriptionProps> = ({ className = "" }) => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
          {pricing.desc}
        </p>
        <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
        {pricing.isPopular && (
          <span className="absolute z-10 px-3 py-1 text-xs tracking-widest text-white rounded-full bg-primary-500 right-3 top-3">
            POPULAR
          </span>
        )}

        <div className="mt-4 mb-8">
          <h3 className="block mb-2 text-base font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {pricing.name}
          </h3>
          <h2 className="flex items-center text-5xl leading-none">
            <span className="inline-flex text-neutral-500">
              <TbCurrencyNaira />
              {pricing.pricing}
            </span>
            <span className="ml-1 text-base font-normal text-neutral-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span
                className={`text-sm ${
                  item.includes("Everything in")
                    ? "text-green-500 font-semibold"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.name === "Starter Plan" ? (
            <ButtonPrimary>Signup</ButtonPrimary>
          ) : (
            <ButtonPrimary>Start 14-days Free Trial</ButtonPrimary>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PageSubcription container pb-24 lg:pb-32 ${className}`}
      data-nc-id="PageSubcription"
    >
      <Helmet>
        <title>Subscription Plans</title>

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
          content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png"
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
          content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png"
        />
      </Helmet>
      <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
        <div className="grid gap-5 lg:grid-cols-3 xl:gap-8">
          {pricingList.map(renderPricingItem)}
        </div>
      </section>
      <div className="relative py-20 mt-20 lg:py-24 xl:mt-32 lg:mt-32">
        <BackgroundSection />
        <SectionClientSay />
      </div>
    </div>
  );
};

export default PageSubcription;