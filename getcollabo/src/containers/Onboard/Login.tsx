// @ts-nocheck
import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";

export interface LoginProps {
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
    href: "/login-creator",
  },
];

const brand: UserItem[] = [
  {
    name: "Brand Account",
    linkName: "Brand",
    href: "/login-brand",
  },
];

const Login: FC<LoginProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("creator");

  const [tabActive, setTabActive] = React.useState("Creator");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderCreatorLogin = (creator: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-4 rounded-3xl border-2 flex flex-col overflow-hidden ${
          creator.name
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <div className="mb-8">
          <h2 className="block mb-2 text-lg font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {creator.name}
          </h2>
        </div>

        <div className="flex flex-col mt-auto">
          <ButtonPrimary href={creator.href}>
            <span className="font-medium">Login</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderBrandLogin = (brand: UserItem, index: number) => {
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

        <div className="flex flex-col mt-auto">
          <ButtonPrimary href={brand.href}>
            <span className="font-medium">Login</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Login container pb-24 lg:pb-32 ${className}`}
      data-nc-id="Login"
    >
      <Helmet>
        <title>Login</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="Login to start managing your brand collaborations like a pro-Creator."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_177_zisazc.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="Login to start managing your brand collaborations like a pro-Creator"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_177_zisazc.png"
        />
      </Helmet>
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
      </header>

      <Nav
        className="p-1 bg-white rounded-full shadow-lg dark:bg-neutral-800"
        containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
      >
        {[
          {
            name: "Creator",
            user: "creator",
          },
          {
            name: "Brand",
            user: "brand",
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

      <div className="flex items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 mt-12 xl:max-w-xl">
          {selectedUser === "creator"
            ? creator.map((item, index) => renderCreatorLogin(item, index))
            : brand.map((item, index) => renderBrandLogin(item, index))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          First time? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/signup"
          >
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;