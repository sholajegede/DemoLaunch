// @ts-nocheck
import React, { FC, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import { TbCurrencyNaira } from "react-icons/tb";

export interface BookingPackagesProps {
  className?: string;
}

export interface UserItem {
  name: string;
  features: string[];
  href: string;
}

const starter: UserItem[] = [
  {
    name: "Starter Package",
    pricing: "200,000",
    per: "/month",
    features: [
      "2 Creators/Influencers",
      "Social Media Platforms: [Instagram, Twitter]",
      "1 Tweet thread (Brand storytelling)",
      "1 Instagram post featuring your brand's product/service",
      "1 Instagram reel endorsing and promoting your brand",
      "150,000+ views/impressions (Number of times your brand would be seen)",
      "Campaign management and tracking",
      "Basic analytics report",
      "Pause or cancel at any time",
    ],
    desc: `You just started promoting your brand. You want to showcase your unique products/services, values, and story.`,
  },
];

const upgrade: UserItem[] = [
  {
    isPopular: true,
    name: "Upgrade Package",
    pricing: "350,000",
    per: "/month",
    features: [
      "4 Creators/Influencers",
      "Social Media Platforms: [Instagram, Twitter, TikTok]",
      "2 Tweet threads (Brand storytelling)",
      "1 Instagram post featuring your brand's product/service",
      "1 Instagram reel endorsing and promoting your brand",
      "1 TikTok post endorsing and promoting your brand",
      "400,000+ views/impressions (Number of times your brand would be seen)",
      "Campaign management and tracking",
      "Advanced analytics report",
      "Pause or cancel at any time",
    ],
    desc: `You have realized the potential and want to drive more sales.`,
  },
];

const pro: UserItem[] = [
  {
    name: "Pro Package",
    pricing: "700,000",
    per: "/month",
    features: [
      "5 Creators/Influencers",
      "Social Media Platforms: [Instagram, Twitter, TikTok, YouTube]",
      "2 Tweet threads (Brand storytelling)",
      "2 Instagram posts featuring your brand's product/service",
      "2 Instagram reels endorsing and promoting your brand",
      "1 TikTok post endorsing and promoting your brand",
      "1 dedicated YouTube video featuring your brand's product/service",
      "1 million+ views/impressions (Number of times your brand would be seen)",
      "Campaign management and tracking",
      "Comprehensive analytics report",
      "Pause or cancel at any time",
    ],
    desc: `You want to give your Brand maximum reach, impressions, and conversions!`,
  },
];

const custom: UserItem[] = [
  {
    name: "Custom Package",
    pricing: "Contact Sales",
    per: "/month",
    features: [
      "Campaign management and tracking",
      "Comprehensive analytics report",
      "Custom and personalized support",
      "Tailored offerings and deliverables",
      "...and much more!",
    ],
    desc: `Tailored pricing and experience for your Brand. Get in touch let us help!`,
  },
];

const BookingPackages: FC<BookingPackagesProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("starter");

  const [tabActive, setTabActive] = React.useState("Starter");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const handleLink = () => {
    window.open("https://calendly.com/getcollabo/introduction", "_blank");
  };

  const renderStarterPlan = (starter: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={
          "h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden border-neutral-100 dark:border-neutral-700"
        }
      >
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {starter.name}
          </h3>
          <p className="mt-3 mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            {starter.desc}
          </p>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <h2 className="flex items-center mt-4 text-4xl leading-none">
            <span className="inline-flex text-neutral-500">
              <TbCurrencyNaira />
              {starter.pricing}
            </span>
            <span className="ml-1 text-base font-normal text-neutral-500">
              {starter.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {starter.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          <ButtonPrimary onClick={handleLink}>
            Schedule an Intro Call
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderUpgradePlan = (upgrade: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          upgrade.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {upgrade.isPopular && (
          <span className="absolute z-10 px-3 py-1 text-xs tracking-widest text-white rounded-full bg-primary-500 right-3 top-3">
            MOST BOOKED
          </span>
        )}
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {upgrade.name}
          </h3>
          <p className="mt-3 mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            {upgrade.desc}
          </p>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <h2 className="flex items-center mt-4 text-4xl leading-none">
            <span className="inline-flex text-neutral-500">
              <TbCurrencyNaira />
              {upgrade.pricing}
            </span>
            <span className="ml-1 text-base font-normal text-neutral-500">
              {upgrade.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {upgrade.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          <ButtonPrimary onClick={handleLink}>
            Schedule an Intro Call
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderProPlan = (pro: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={
          "h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden border-neutral-100 dark:border-neutral-700"
        }
      >
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {pro.name}
          </h3>
          <p className="mt-3 mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            {pro.desc}
          </p>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <h2 className="flex items-center mt-4 text-4xl leading-none">
            <span className="inline-flex text-neutral-500">
              <TbCurrencyNaira />
              {pro.pricing}
            </span>
            <span className="ml-1 text-base font-normal text-neutral-500">
              {pro.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {pro.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          <ButtonPrimary onClick={handleLink}>
            Schedule an Intro Call
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderCustomPlan = (custom: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={
          "h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden border-neutral-100 dark:border-neutral-700"
        }
      >
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {custom.name}
          </h3>
          <p className="mt-3 mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            {custom.desc}
          </p>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <h2 className="flex items-center mt-4 text-4xl leading-none">
            <span className="inline-flex text-neutral-500">
              {custom.pricing}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {custom.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          <ButtonPrimary onClick={handleLink}>
            Build your Ideal Plan
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-BookingPackages container pb-24 lg:pb-32 ${className}`}
      data-nc-id="BookingPackages"
    >
      <Helmet>
        <title>Booking Packages</title>

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
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Booking Packages
        </h2>
        <span className="block mt-4 text-sm text-neutral-700 dark:text-neutral-200">
          Collaboration experiences that help you drive sales. Let's talk today, we
          start tomorrow.
        </span>
      </header>
      <Nav
        className="p-1 bg-white rounded-full shadow-lg dark:bg-neutral-800"
        containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Starter",
            user: "starter",
          },
          {
            name: "Upgrade",
            user: "upgrade",
          },
          {
            name: "Pro",
            user: "pro",
          },
          {
            name: "Custom",
            user: "custom",
          },
        ].map((item, index) => (
          <NavItem2
            key={index}
            isActive={tabActive === item.name}
            onClick={() => {
              setTabActive(item.name);
              handleUserSelection(item.user);
            }}
          >
            <div className="flex items-center justify-center sm:space-x-2.5 text-sm">
              <span>{item.name}</span>
            </div>
          </NavItem2>
        ))}
      </Nav>

      <div className="flex items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 mt-12 xl:max-w-xl">
          {selectedUser === "starter"
            ? starter.map((item, index) => renderStarterPlan(item, index))
            : selectedUser === "upgrade"
            ? upgrade.map((item, index) => renderUpgradePlan(item, index))
            : selectedUser === "pro"
            ? pro.map((item, index) => renderProPlan(item, index))
            : custom.map((item, index) => renderCustomPlan(item, index))}
        </div>
      </div>

      <div className="relative py-20 mt-20 lg:py-24 xl:mt-32 lg:mt-32">
        <BackgroundSection />
        <SectionClientSay />
      </div>
    </div>
  );
};

export default BookingPackages;