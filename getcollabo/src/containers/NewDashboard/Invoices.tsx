// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import { Link, NavLink, useHistory } from "react-router-dom";
import Logo from "shared/Logo/Logo";
import AvatarDropdownInfluencer from "components/Header/AvatarDropdownInfluencer";
import NotifyDropdownInfluencer from "components/Header/NotifyDropdownInfluencer";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import InfluencerInvoice from "containers/Dashboards/InfluencerInvoice";

export interface InvoicesProps {
  className?: string;
}

const Invoices: FC<InvoicesProps> = ({ className = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const { influencer, dispatch } = useContext(InfluencerAuthContext);

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  //
  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);
  //

  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await newRequest.post("/auth-influencer/logout");
      dispatch({ type: "LOGOUT" });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {influencerProfile.verified === false ? (
        history.push("/verify-email/creator")
      ) : (
        <div
          className={`nc-Invoices overflow-hidden relative ${className}`}
          data-nc-id="Invoices"
        >
          <Helmet>
            <title>Invoices</title>

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

          <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <Logo />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ml-3">
                    <div className="flex items-center space-x-1 xl:space-x-3">
                      <SwitchDarkMode />
                      <NotifyDropdownInfluencer />
                      <AvatarDropdownInfluencer />

                      <button
                        className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center sm:hidden md:hidden xl:hidden 2xl:hidden"
                        onClick={handleSidebarToggle}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } bg-gray-50 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/welcome"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Welcome
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>

                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/card"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Rate Card
                    </span>
                    {/**
                 * <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
                 * 
                 */}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/deliverables"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Deliverables
                    </span>
                  </Link>
                </li>

                {/**
                 * <li>
                  <Link
                    to="/tasks"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Task Manager
                    </span>
                  </Link>
                </li>
                 * 
                 */}

                <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700"></div>

                <li>
                  <Link
                    to="/proposals"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Proposals
                    </span>
                  </Link>
                </li>
                <li>
                  <NavLink
                    to="/invoices"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                    activeClassName="bg-primary-6000 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Invoices
                    </span>
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/contracts"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Contracts
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chat"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.4955 13.25H13.5045"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9955 13.25H10.0045"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.4955 13.25H6.5045"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Messages
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/payments"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Payments
                    </span>
                  </Link>
                </li>

                <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700"></div>

                <li>
                  <Link
                    to="/settings"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Settings
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="flex items-center p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-primary-6000 dark:hover:text-primary-6000"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.89999 4.92993L8.43999 8.45993"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.89999 19.07L8.43999 15.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.05 19.07L15.51 15.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.05 4.92993L15.51 8.45993"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Support
                    </span>
                  </Link>
                </li>
                <li>
                  <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red-500"
                    >
                      <path
                        d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12H3.62"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      onClick={handleLogOut}
                      className="flex-1 ml-3 text-red-500 whitespace-nowrap"
                    >
                      Logout
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64">
            <InfluencerInvoice />
          </div>
        </div>
      )}
    </>
  );
};

export default Invoices;