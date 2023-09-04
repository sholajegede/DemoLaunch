// @ts-nocheck
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import HowToBrand from "./HowToBrand";
import HowToCreator from "./HowToCreator";

export interface HowToProps {
  className?: string;
}

export interface UserItem {
  name: string;
  features: string[];
  href: string;
}

const creator: UserItem[] = [
  {
    name: "Creator Profile",
    linkName: "Creator",
    href: "/create-profile",
  },
];

const brand: UserItem[] = [
  {
    name: "Brand Account",
    linkName: "Brand",
    href: "/create-brand",
  },
];

const HowTo: FC<HowToProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("creator");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderCreator = (creator: UserItem, index: number) => {
    return (
      <div
        key={index}
      >
        <HowToCreator />

        <div className="flex flex-col mt-20">
          <ButtonPrimary href={creator.href}>
            <span className="font-medium">Get started</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderBrand = (brand: UserItem, index: number) => {
    return (
      <div
        key={index}
      >
       <HowToBrand />

        <div className="flex flex-col mt-20">
          <ButtonPrimary href={brand.href}>
            <span className="font-medium">Get started</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-HowTo container pb-24 lg:pb-32 ${className}`}
      data-nc-id="HowTo"
    >
      <Helmet>
        <title>How GetCollabo Works</title>
        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta property="og:description" content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content." />
        <meta property="og:image" content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png" />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta name="twitter:description" content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content." />
        <meta name="twitter:image" content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png" />
      </Helmet>
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          How GetCollabo Works
        </h2>
      </header>
      <div className="flex items-center justify-center space-x-4">
        {selectedUser === "creator" ? (
          <ButtonPrimary onClick={() => handleUserSelection("creator")}>
            <span className="font-medium">For Creators</span>
          </ButtonPrimary>
        ) : (
          <ButtonSecondary onClick={() => handleUserSelection("creator")}>
            <span className="font-medium">For Creators</span>
          </ButtonSecondary>
        )}
        {selectedUser === "brand" ? (
          <ButtonPrimary onClick={() => handleUserSelection("brand")}>
            <span className="font-medium">For Brands</span>
          </ButtonPrimary>
        ) : (
          <ButtonSecondary onClick={() => handleUserSelection("brand")}>
            <span className="font-medium">For Brands</span>
          </ButtonSecondary>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full gap-8 mt-10 xl:max-w-3xl">
          {selectedUser === "creator"
            ? creator.map((item, index) => renderCreator(item, index))
            : brand.map((item, index) => renderBrand(item, index))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Do you have questions? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/faqs"
          >
            Check out our FAQs
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HowTo;