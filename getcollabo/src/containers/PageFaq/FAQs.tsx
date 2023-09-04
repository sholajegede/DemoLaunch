// @ts-nocheck
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import FAQAccordion from "containers/FaqAccordion/FAQAccordion";
import FAQBrandAccordion from "containers/FaqAccordion/FAQBrandAccordion";

export interface FAQsProps {
  className?: string;
}

const FAQs: FC<FAQsProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("creators");

  const [tabActive, setTabActive] = React.useState("Creators");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderCreatorFaq = () => {
    return <FAQAccordion />;
  };

  const renderBrandFaq = () => {
    return <FAQBrandAccordion />;
  };

  return (
    <div
      className={`nc-FAQs container pb-24 lg:pb-32 ${className}`}
      data-nc-id="FAQs"
    >
      <Helmet>
        <title>Frequently Asked Questions</title>

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

      <Nav
        className="p-1 mt-10 bg-white rounded-full shadow-lg dark:bg-neutral-800"
        containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Creators",
            user: "creators",
          },
          {
            name: "Brands",
            user: "brands",
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
          </NavItem2>
        ))}
      </Nav>

      <div className="flex justify-center mt-8 mb-4">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Still have questions? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/contact"
          >
            Contact us
          </Link>
        </span>
      </div>

      <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

      <div className="flex items-center justify-center">
        {selectedUser === "creators" ? renderCreatorFaq() : renderBrandFaq()}
      </div>
    </div>
  );
};

export default FAQs;