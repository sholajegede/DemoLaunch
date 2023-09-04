// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Badge from "shared/Badge/Badge";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { MdPostAdd } from "react-icons/md";
import NcModal from "shared/NcModal/NcModal";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";

export interface WelcomePageProps {
  className?: string;
}

const WelcomePage: FC<WelcomePageProps> = ({ className = "" }) => {
  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const { influencer } = useContext(InfluencerAuthContext);
  const [showModal, setShowModal] = useState(false);

  const [showOneModal, setShowOneModal] = useState(false);
  const [showTwoModal, setShowTwoModal] = useState(false);
  const [showThreeModal, setShowThreeModal] = useState(false);
  const [showFourModal, setShowFourModal] = useState(false);

  //Fetch Invoices
  const [invoices, setInvoices] = useState([]);

  //Fetch Proposals
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await newRequest.get(`/invoice/get/${influencer._id}`);
      setInvoices(response.data);
    };
    fetchInvoices();
  }, [influencer]);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await newRequest.get(
        `/proposals/find/${influencer._id}`
      );
      setProposals(response.data);
    };
    fetchProposals();
  }, [influencer]);

  const [greenSvgsCount, setGreenSvgsCount] = useState(0);

  useEffect(() => {
    const count = document.querySelectorAll(".svg-active").length;
    setGreenSvgsCount(count);
  }, [
    influencerProfile,
    influencerProfile.videoSample,
    influencerProfile.bankAccountNumber,
    invoices,
    proposals,
  ]);

  const renderContent = () => {
    return (
      <div className="ml-1 mr-1">
        <div className="mb-4">
          <span>📱 Coming Soon: GetCollabo's Mobile App! 🚀</span>
        </div>
        <div className="mb-4">
          <span>
            You asked, we listened. The GetCollabo mobile app is in the works.
            Stay tuned for updates – we'll notify you when it's live.
          </span>
        </div>
        <div className="flex-grow">
          <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
            <div className="relative flex-shrink-0">
              <div>
                <NcImage
                  containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                  src="https://res.cloudinary.com/newlink/image/upload/v1692590810/samples/dark-image_t8o7bw.png"
                  className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="dark-image"
                />
                <NcImage
                  containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                  src="https://res.cloudinary.com/newlink/image/upload/v1692590810/samples/dark-image_t8o7bw.png"
                  className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="dark-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOneContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4">
          <Link to="/card">
            <ButtonPrimary className="flex-1" sizeClass="px-5 py-2">
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

              <span className="ml-2">Build rate card</span>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    );
  };

  const renderTwoContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4">
          <Link to="/payments">
            <ButtonPrimary className="flex-1" sizeClass="px-5 py-2">
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
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>

              <span className="ml-2">Add payment method</span>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    );
  };

  const renderThreeContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4">
          <Link to="/invoice">
            <ButtonPrimary className="flex-1" sizeClass="px-5 py-2">
              <MdPostAdd className="w-6 h-6" />

              <span className="ml-2">Create invoice</span>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    );
  };

  const renderFourContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4">
          <Link to="/proposals">
            <ButtonPrimary className="flex-1" sizeClass="px-5 py-2">
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

              <span className="ml-2">View proposals</span>
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-WelcomePage pr-1 pl-1 xl:pl-4 xl:pr-4 ${className}`}
          data-nc-id="WelcomePage"
        >
          <Helmet>
            <title>GetCollabo — Simplified workflows for creators</title>
          </Helmet>

          {/* HEADER */}
          <div className="w-full">
            <div className="w-full h-20 md:h-20 2xl:h-24"></div>
            <div className="-mt-2 lg:-mt-2">
              <div className="mb-4 text-2xl font-medium xl:text-3xl">
                Welcome 👋
              </div>
              <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                This is a page with some helpful tips and resources to start
                using GetCollabo.
              </p>

              <div className="inline-flex mb-6 text-2xl font-medium xl:text-3xl">
                <span>Start here</span>
                <span className="inline-flex items-center justify-center px-3 py-0.5 ml-2 text-sm font-medium text-green-800 bg-green-200 rounded-full">
                  {greenSvgsCount}/4
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {/* ----- 1 ----- */}
                <div
                  className={`relative flex font-medium text-gray-900 group items-left justify-left dark:text-white ${
                    influencerProfile?.videoSample &&
                    influencerProfile?.videoSample[0]
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <div className="w-[60px] sm:w-[90px] xl:w-[70px] md:w-[70px] p-2 rounded-lg shadow-md h-[54px] items-left justify-left bg-purple-50 dark:bg-gray-800">
                    <span className="text-4xl font-black text-neutral-500 dark:text-neutral-400">
                      1
                    </span>
                  </div>
                  {influencerProfile?.videoSample &&
                  influencerProfile?.videoSample[0] ? (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-green-200 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-green-800 stroke-current svg-active"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-gray-100 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-gray-700 stroke-current"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <div className="pl-3">
                    <div className="text-base font-medium">
                      Build & share rate card
                    </div>
                    <div className="font-light text-gray-500">
                      <span className="text-sm">
                        Paste your link, everywhere.
                      </span>
                    </div>
                  </div>
                  {!(
                    influencerProfile?.videoSample &&
                    influencerProfile?.videoSample[0]
                  ) && (
                    <button
                      onClick={() => setShowOneModal(true)}
                      className="absolute right-0 flex items-center justify-end w-3/4 h-full pr-8 transition opacity-0 bg-gradient-to-l from-white dark:from-gray-900 via-white dark:via-gray-900 group-hover:opacity-100"
                    >
                      <span className="text-base font-semibold text-primary-6000">
                        Learn how
                      </span>
                    </button>
                  )}
                </div>

                {/* ----- 2 ----- */}
                <div
                  className={`relative flex font-medium text-gray-900 group items-left justify-left dark:text-white ${
                    influencerProfile?.bankAccountNumber ? "opacity-50" : ""
                  }`}
                >
                  <div className="w-[60px] sm:w-[90px] xl:w-[70px] md:w-[70px] p-2 rounded-lg shadow-md h-[54px] items-left justify-left bg-green-50 dark:bg-gray-800">
                    <span className="text-4xl font-black text-neutral-500 dark:text-neutral-400">
                      2
                    </span>
                  </div>
                  {influencerProfile?.bankAccountNumber ? (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-green-200 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-green-800 stroke-current svg-active"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-gray-100 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-gray-700 stroke-current"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <div className="pl-3">
                    <div className="text-base font-medium">
                      Add a payment method
                    </div>
                    <div className="font-light text-gray-500">
                      <span className="text-sm">Choose how you get paid.</span>
                    </div>
                  </div>
                  {!influencerProfile.bankAccountNumber && (
                    <button
                      onClick={() => setShowTwoModal(true)}
                      className="absolute right-0 flex items-center justify-end w-3/4 h-full pr-8 transition opacity-0 bg-gradient-to-l from-white dark:from-gray-900 via-white dark:via-gray-900 group-hover:opacity-100"
                    >
                      <span className="text-base font-semibold text-primary-6000">
                        Learn how
                      </span>
                    </button>
                  )}
                </div>

                {/* ----- 3 ----- */}
                <div
                  className={`relative flex font-medium text-gray-900 group items-left justify-left dark:text-white ${
                    invoices && invoices[0] ? "opacity-50" : ""
                  }`}
                >
                  <div className="w-[60px] sm:w-[90px] xl:w-[70px] md:w-[70px] p-2 rounded-lg shadow-md h-[54px] items-left justify-left bg-yellow-50 dark:bg-gray-800">
                    <span className="text-4xl font-black text-neutral-500 dark:text-neutral-400">
                      3
                    </span>
                  </div>
                  {invoices && invoices[0] ? (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-green-200 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-green-800 stroke-current svg-active"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-gray-100 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-gray-700 stroke-current"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <div className="pl-3">
                    <div className="text-base font-medium">
                      Create your first invoice
                    </div>
                    <div className="font-light text-gray-500">
                      <span className="text-sm">Get paid, today.</span>
                    </div>
                  </div>
                  {!(invoices && invoices[0]) && (
                    <button
                      onClick={() => setShowThreeModal(true)}
                      className="absolute right-0 flex items-center justify-end w-3/4 h-full pr-8 transition opacity-0 bg-gradient-to-l from-white dark:from-gray-900 via-white dark:via-gray-900 group-hover:opacity-100"
                    >
                      <span className="text-base font-semibold text-primary-6000">
                        Learn how
                      </span>
                    </button>
                  )}
                </div>

                {/* ----- 4 ----- */}
                <div
                  className={`relative flex font-medium text-gray-900 group items-left justify-left dark:text-white ${
                    proposals && proposals[0] ? "opacity-50" : ""
                  }`}
                >
                  <div className="w-[60px] sm:w-[90px] xl:w-[70px] md:w-[70px] p-2 rounded-lg shadow-md h-[54px] items-left justify-left bg-blue-50 dark:bg-gray-800">
                    <span className="text-4xl font-black text-neutral-500 dark:text-neutral-400">
                      4
                    </span>
                  </div>
                  {proposals && proposals[0] ? (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-green-200 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-green-800 stroke-current svg-active"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute flex items-center justify-center w-5 h-5 mt-10 -ml-2.5 bg-gray-100 rounded-full">
                      <svg
                        aria-hidden="false"
                        aria-label=""
                        className="w-4 h-4 text-gray-700 stroke-current"
                        height="24"
                        width="24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                  <div className="pl-3">
                    <div className="text-base font-medium">
                      Receive a proposal 🎉
                    </div>
                    <div className="font-light text-gray-500">
                      <span className="text-sm">Your first collaboration!</span>
                    </div>
                  </div>
                  {!(proposals && proposals[0]) && (
                    <button
                      onClick={() => setShowFourModal(true)}
                      className="absolute right-0 flex items-center justify-end w-3/4 h-full pr-8 transition opacity-0 bg-gradient-to-l from-white dark:from-gray-900 via-white dark:via-gray-900 group-hover:opacity-100"
                    >
                      <span className="text-base font-semibold text-primary-6000">
                        Learn how
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div className="inline-flex text-2xl font-medium xl:text-3xl">
              <span>Level-up</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-5 gap-y-8 lg:grid-cols-2 md:grid-cols-2">
              <div className="">
                <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    LEARN
                  </span>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Join the community
                  </h5>

                  <p className="mb-8 text-sm font-light text-gray-500 dark:text-gray-400">
                    The Collabo Community is an awesome place for creators to create, connect, collaborate, stay up-to-date with latest news, and learn from other amazing creators.
                  </p>
                  <a
                    href="https://t.me/creatorsandinfluencers"
                    className="relative inline-flex items-center justify-center h-auto px-5 py-2 text-sm font-medium transition-colors rounded-full dark:text-neutral-200 sm:text-base disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
                    target="_blank"
                  >
                    Join now
                  </a>
                </div>
              </div>

              <div className="">
                <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    APPS
                  </span>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Get the App
                  </h5>

                  <p className="mb-8 text-sm font-light text-gray-500 dark:text-gray-400">
                    Customize your rate card, create invoices, receive payments,
                    manage contracts, chat with brands, and track multiple
                    collaborations - all in one app.
                  </p>
                  <div className="space-y-4 items-left justify-left sm:flex sm:space-y-0 sm:space-x-4">
                    <a
                      //href="/welcome"
                      onClick={() => setShowModal(true)}
                      className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="mr-3 w-7 h-7"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="apple"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                        ></path>
                      </svg>
                      <div className="text-left">
                        <div className="mb-1 text-xs">Download on the</div>
                        <div className="-mt-1 font-sans text-sm font-semibold">
                          Mac App Store
                        </div>
                      </div>
                    </a>
                    <a
                      //href="/welcome"
                      onClick={() => setShowModal(true)}
                      className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="mr-3 w-7 h-7"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google-play"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                        ></path>
                      </svg>
                      <div className="text-left">
                        <div className="mb-1 text-xs">Get in on</div>
                        <div className="-mt-1 font-sans text-sm font-semibold">
                          Google Play
                        </div>
                      </div>
                    </a>
                  </div>
                  {/**<div className="mt-4">
                    <Badge
                      className="px-6 py-2 text-center rounded"
                      color="green"
                      name="Coming soon"
                    />
                  </div>
                  */}
                </div>
              </div>

              <div className="">
                <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    REFER
                  </span>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Invite a friend
                  </h5>

                  <p className="mb-8 text-sm font-light text-gray-500 dark:text-gray-400">
                    Invite a friend that's a creator or a wannabe-creator to
                    GetCollabo, and you'll earn{" "}
                    <span className="font-bold text-green-500">N1,000</span> for
                    each of their first 5 bookings. It's a win-win for both of
                    you!
                  </p>
                  {/**
                  <ButtonPrimary
                    href={"/invite"}
                    sizeClass="px-5 py-2"
                    type="button"
                  >
                    Invite now
                  </ButtonPrimary>
                  */}
                  <div className="mt-4">
                    <Badge
                      className="px-6 py-2 text-center rounded"
                      color="green"
                      name="Coming soon"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    FOLLOW
                  </span>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Drop us a follow
                  </h5>

                  <p className="mb-8 text-sm font-light text-gray-500 dark:text-gray-400">
                    Stay in sync! Connect with us on all our social media
                    channels to catch all the latest updates, tips, and creative
                    inspirations.
                  </p>
                  <div className="flex mt-4 items-left justify-left">
                    <ul className="flex mt-3 space-x-4 justify-left items-left">
                      <li>
                        <a
                          href="https://www.twitter.com/getcollabo"
                          title="Twitter"
                          className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                        >
                          <RiTwitterFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.instagram.com/getcollabo"
                          title="Instagram"
                          className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                        >
                          <RiInstagramFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.linkedin.com/company/getcollabo"
                          title="LinkedIn"
                          className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                        >
                          <RiLinkedinFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.tiktok.com/@getcollabo"
                          title="TikTok"
                          className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                        >
                          <SiTiktok className="w-5 h-6 dark:fill-white fill-bg-neutral-900" />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.facebook.com/getcollabo"
                          title="Facebook"
                          className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                        >
                          <RiFacebookFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div className="grid grid-cols-1 gap-x-5 gap-y-8">
              <div className="">
                <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    SUBSCRIBE
                  </span>

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Receive our emails
                  </h5>

                  <p className="mb-8 text-sm font-light text-gray-500 dark:text-gray-400">
                    We occasionally send an email once a week to 700+ creators
                    with tips, strategies, and insights on becoming a
                    world-class creator.
                  </p>

                  <div className="max-w-sm mt-10">
                    <iframe
                      src="https://embeds.beehiiv.com/bbe7accc-e0ed-4f21-916f-c1816c3e3b76?slim=true"
                      data-test-id="beehiiv-embed"
                      height={52}
                      frameBorder={0}
                      scrolling="no"
                      style={{
                        margin: 0,
                        borderRadius: "0px !important",
                        backgroundColor: "transparent",
                        width: "100%",
                      }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showModal}
            renderContent={renderContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowModal(false)}
            modalTitle="🔔 Notification"
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showOneModal}
            renderContent={renderOneContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowOneModal(false)}
            modalTitle=""
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showTwoModal}
            renderContent={renderTwoContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowTwoModal(false)}
            modalTitle=""
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showThreeModal}
            renderContent={renderThreeContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowThreeModal(false)}
            modalTitle=""
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showFourModal}
            renderContent={renderFourContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowFourModal(false)}
            modalTitle=""
          />
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </div>
  );
};

export default WelcomePage;