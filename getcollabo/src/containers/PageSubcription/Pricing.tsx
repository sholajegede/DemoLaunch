import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import MonthlySubscriptions from "./MonthlySubcriptions";
import YearlySubscriptions from "./YearlySubcriptions";
import BadgePricing from "shared/Badge/BadgePricing";
import Customers from "components/Partners/Customers";

export interface PricingProps {
  className?: string;
}

const Pricing: FC<PricingProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("monthly");

  const [tabActive, setTabActive] = React.useState("Billing Monthly");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderMonthlyPricing = () => {
    return <MonthlySubscriptions />;
  };

  const renderYearlyPricing = () => {
    return <YearlySubscriptions />;
  };

  return (
    <div
      className={`nc-Pricing pb-24 lg:pb-32 ${className}`}
      data-nc-id="Pricing"
    >
      <Helmet>
        <title>Affordable Pricing</title>

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
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_181_ydf3i2.png"
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
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_181_ydf3i2.png"
        />
      </Helmet>
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Affordable Pricing
        </h2>
        <span className="block mt-4 text-base italic text-neutral-700 dark:text-neutral-200">
          ...to fit the needs of every creator
        </span>
      </header>

      <Nav
        className="p-1 bg-white rounded-full shadow-lg dark:bg-neutral-800"
        containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Billing Monthly",
            user: "monthly",
          },
          {
            name: "Billing Yearly",
            user: "yearly",
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
            <div className="flex items-center justify-center sm:space-x-2.5 text-sm ">
              <span>{item.name}</span>
            </div>
            {item.name === "Billing Yearly" ? (
              <BadgePricing
                className="absolute bottom-[32px] px-2 py-1 text-center left-[50px] sm:left-[110px] lg:left-[110px] xl:left-[110px]"
                color="green"
                name="🎉 1 Month FREE 🎉"
              />
            ) : null}
          </NavItem2>
        ))}
      </Nav>

      <div className="flex justify-center mt-6">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/login"
          >
            Login
          </Link>
        </span>
      </div>

      <div className="flex items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 mt-10">
          {selectedUser === "monthly"
            ? renderMonthlyPricing()
            : renderYearlyPricing()}
        </div>
      </div>

      <div className="mt-10">
        <Customers />
      </div>
    </div>
  );
};

export default Pricing;