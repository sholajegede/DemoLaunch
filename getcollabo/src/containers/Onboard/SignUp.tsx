// @ts-nocheck
import React, { FC, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";

export interface SignUpProps {
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
    features: [
      "Increased visibility",
      "Personalized booking profile",
      "Seamless communication with brands",
      "Multiple payment options",
      "Customizable bookings",
      "Booking contract management",
      "Easy to use dashboard",
      "Dedicated support",
    ],
  },
];

const brand: UserItem[] = [
  {
    name: "Brand Account",
    linkName: "Brand",
    href: "/create-brand",
    features: [
      "Book top creators",
      "Collaborate seamlessly",
      "Get high-quality deliverables",
      "Fast and secure booking",
      "Multiple ways to make payments",
      "Manage multiple collaborations",
      "Track content delivery and analytics",
      "Get dedicated support",
    ],
  },
];

const SignUp: FC<SignUpProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("brand");

  const [tabActive, setTabActive] = React.useState("Brand");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const history = useHistory();

  const renderCreatorSignUp = (creator: UserItem, index: number) => {
    return (
      history.push("/pricing")
    );
  };

  const renderBrandSignUp = (brand: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-4 rounded-3xl border-2 flex flex-col overflow-hidden ${
          brand.name
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <div className="mb-8">
          <h2 className="block mb-2 text-lg font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {brand.name}
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {brand.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>

        <div className="flex flex-col mt-auto">
          <ButtonPrimary href={brand.href}>
            <span className="font-medium">Signup for Free</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-SignUp container pb-24 lg:pb-32 ${className}`}
      data-nc-id="SignUp"
    >
      <Helmet>
        <title>Signup</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="Signup and enjoy all the benefits of managing your brand collaborations like a pro-Creator."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_178_anh0dx.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="Signup and enjoy all the benefits of managing your brand collaborations like a pro-Creator."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_178_anh0dx.png"
        />
      </Helmet>
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
      </header>
      <Nav
        className="p-1 bg-white rounded-full shadow-lg dark:bg-neutral-800"
        containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Brand",
            user: "brand",
          },
          {
            name: "Creator",
            user: "creator",
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
          {selectedUser === "brand"
            ? brand.map((item, index) => renderBrandSignUp(item, index))
            : creator.map((item, index) => renderCreatorSignUp(item, index))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
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
    </div>
  );
};

export default SignUp;