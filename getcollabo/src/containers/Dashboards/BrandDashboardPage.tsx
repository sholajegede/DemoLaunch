// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import SocialsList from "shared/SocialsList/SocialsList";
import { Tab } from "@headlessui/react";
import EditBrandButton from "./EditBrandButton";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link, useHistory } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AuthContext } from "context/AuthContext";
import { BrandProfileData, InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import { TbCurrencyNaira } from "react-icons/tb";
import Badge from "shared/Badge/Badge";
import NcModal from "shared/NcModal/NcModal";
import Pagination from "components/DatatablePagination";

export interface BrandDashboardPageProps {
  className?: string;
}

const BrandDashboardPage: FC<BrandDashboardPageProps> = ({
  className = "",
}) => {
  const [selected, setSelected] = useState("Bookings");
  const [categories] = useState(["Bookings", "Invoices", "Proposals"]);
  const { brand } = useContext(AuthContext);
  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});

  const [showDemoModal, setShowDemoModal] = useState(false);

  const [showNoChatModal, setShowNoChatModal] = useState(false);

  const [influencer, setInfluencer] = useState<InfluencerProfileData | {}>({});

  const history = useHistory();

  //
  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/brand/${brand._id}`);
      setBrandProfile(response.data);
    };
    fetchBrandProfile();
  }, [brand]);
  //

  const handleChatLogic = async (creatorUsername: string) => {
    try {
      // Get influencer profile
      const influencerResponse = await newRequest.get(
        `/influencer/get/${creatorUsername}`
      );
      const influencerProfile = influencerResponse.data;

      // Check if a chat already exists between the influencer and brand
      const existingChatResponse = await newRequest.get(
        `/chat/find/${influencerProfile._id}/${brandProfile._id}`
      );
      const existingChat = existingChatResponse.data;

      // If chat exists, redirect to the existing chat
      if (existingChat) {
        const chatId = existingChat._id;
        history.push(`/message/${chatId}`);
        localStorage.setItem("previousLocation", "/brand");
        return;
      } else {
        setShowNoChatModal(true);
        setInfluencer(influencerProfile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getShortenedWebsite = () => {
    const website = brand?.website;

    if (!website) {
      return "Website not provided";
    }

    if (website.includes("instagram.com")) {
      const username = website.split("?")[0].split("/").pop();
      return `Instagram.com/${username}`;
    } else {
      const domain = website.split("/")[0];
      return domain;
    }
  };

  let activeOrders = 0;
  let completedOrders = 0;

  if (brandProfile && brandProfile.datatable && brandProfile.datatable.length) {
    const bookingStatus = brandProfile.datatable.map(
      (item) => item.bookingStatus
    );
    activeOrders = bookingStatus.filter((status) => status).length; // update the variable inside the if block
    completedOrders = bookingStatus.filter((status) => !status).length;
  }

  let creatorsTotal = 0;

  if (brandProfile && brandProfile.datatable && brandProfile.datatable.length) {
    const brandNames = brandProfile.datatable.map(
      (item) => item.creatorUsername
    );
    const uniqueBrandNames = new Set(brandNames);
    creatorsTotal = uniqueBrandNames.size;
  }

  let totalAmountPaid = 0;

  if (brandProfile && brandProfile.datatable && brandProfile.datatable.length) {
    brandProfile.datatable.forEach((item) => {
      if (item.amountPaid) {
        totalAmountPaid += item.amountPaid;
      }
    });
  }

  const handleTabClick = (category) => {
    if (category === "Proposals") {
      history.push("/created/proposals");
      setSelected("Proposals");
    } else if (category === "Invoices") {
      history.push("/received/invoices");
      setSelected("Invoices");
    } else if (category === "Bookings") {
      history.push("/brand");
      setSelected("Bookings");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const data = brandProfile.datatable;
  const totalItems = data?.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Ensure that data is an array and iterable
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a.bookingStatus === true && b.bookingStatus === false) {
          return -1;
        } else if (a.bookingStatus === false && b.bookingStatus === true) {
          return 1;
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      })
    : [];

  // Apply pagination to the sorted data
  const paginatedData = sortedData
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    ?.reverse();

  const calculateSubmissionTime = (timeframe) => {
    // Assuming the input format is "X days", "X weeks", or "X months"
    const timeRegex =
      /^(\d+)\s+(dy|dys|day|days|wk|wks|week|weeks|mn|mns|month|months)$/i;
    const match = timeframe.match(timeRegex);
    if (match) {
      const [, count, unit] = match;
      const currentDate = new Date();
      if (unit.match(/d(ay)?s?/i)) {
        currentDate.setDate(currentDate.getDate() + parseInt(count));
      } else if (unit.match(/w(eek)?s?/i)) {
        currentDate.setDate(currentDate.getDate() + parseInt(count) * 7);
      } else if (unit.match(/m(onth)?s?/i)) {
        currentDate.setMonth(currentDate.getMonth() + parseInt(count));
      }
      const submissionDate = currentDate.toDateString().slice(0, 10);
      return submissionDate;
    }
    return "";
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderDemoContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowDemoModal(false);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <span>Close</span>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderNoChatContent = () => {
    return (
      <div className="ml-1 mr-1">
        <p className="mt-1 text-sm">
          Hello there{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {brandProfile.businessName}!
          </span>
          👋
        </p>
        <p className="mt-4 mb-4 text-sm">
          It appears that you don't have any active conversations with{" "}
          <span className="capitalize font-semibold text-primary-6000">
            {influencer?.username}
          </span>{" "}
          at the moment.
        </p>

        <p className="mt-4 mb-4 text-sm">
          Not to worry; we'll promptly notify you as soon as there's an update
          on your proposal.
        </p>

        <p className="mt-4 mb-6 text-sm">
          If you have any questions or need assistance, feel free to reach out
          to us [
          <a
            href="mailto:support@getcollabo.io"
            className="underline text-primary-6000"
          >
            support@getcollabo.io
          </a>
          ].
        </p>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowNoChatModal(false);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <span>Close</span>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        {brandProfile.verified === false ? (
          history.push("/verify-email/brand")
        ) : (
          <div
            className={`nc-AuthorPage  ${className}`}
            data-nc-id="AuthorPage"
          >
            <Helmet>
              <title>Dashboard</title>
            </Helmet>

            {/* HEADER */}
            <div className="w-full">
              <div className="relative w-full h-20 md:h-20 2xl:h-32"></div>
              <div className="container -mt-10 lg:-mt-16">
                <div className="mb-5 text-lg font-normal capitalize xl:text-2xl">
                  Hi, {brandProfile?.businessName} 👋
                </div>
                <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
                  <div className="flex-shrink-0 w-32 mt-12 lg:w-44 sm:mt-0">
                    <NcImage
                      src={
                        brand.logo ||
                        "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
                      }
                      containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                    />
                  </div>
                  <div className="flex-grow pt-5 md:pt-1 md:ml-6 xl:ml-14">
                    <div className="max-w-screen-sm ">
                      <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        <span>{brand.businessName || "No Business Name"}</span>
                      </h2>
                      <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                        <span className="capitalize text-neutral-700 dark:text-neutral-300">
                          Industry: {brand.industry}
                        </span>
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                        >
                          <path
                            d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                        {brand.desc}
                      </span>

                      <a
                        href={`https://${brand.website}`}
                        target="_blank"
                        className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400"
                      >
                        Website: {getShortenedWebsite(brand.website)}
                      </a>
                    </div>
                    <div className="mt-4">
                      <SocialsList dataProp={brand} itemClass="block w-7 h-7" />
                    </div>
                    <div className="inline-flex mt-8 space-x-4">
                      <EditBrandButton brandProfile={brandProfile} />
                      <Link to={"/search"}>
                        <ButtonPrimary sizeClass="px-4 py-1.5 sm:px-5">
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
                              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                            />
                          </svg>

                          <span className="ml-1">Collaborate</span>
                        </ButtonPrimary>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute flex flex-row-reverse justify-end md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5">
                    <div>
                      <p
                        className="inline-flex text-primary-6000"
                        onClick={() => setShowDemoModal(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                          />
                        </svg>

                        <span className="text-sm">
                          Take a tour of the platform
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6 xl:mt-8 lg:grid-cols-4 sm:gap-4 xl:gap-6">
                  {/* ----- 1 ----- */}
                  <div className="flex flex-col items-center justify-center p-5 border shadow-md bg-green-50 dark:bg-slate-800 rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                    <span className="text-sm text-green-500 dark:text-green-500">
                      Active
                    </span>
                    <span className="mt-4 text-lg font-medium sm:text-xl sm:mt-6">
                      {activeOrders || 0}
                    </span>
                    <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      booking orders
                    </span>
                  </div>

                  {/* ----- 2 ----- */}
                  <div className="flex flex-col items-center justify-center p-5 border shadow-md bg-purple-50 dark:bg-slate-800 rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Completed
                    </span>
                    <span className="mt-4 text-lg font-medium sm:text-xl sm:mt-6">
                      {completedOrders || 0}
                    </span>
                    <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      booking orders
                    </span>
                  </div>

                  {/* ----- Latest Price ----- */}
                  <div className="flex flex-col items-center justify-center p-5 border shadow-md bg-blue-50 dark:bg-slate-800 rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Creators
                    </span>
                    <span className="mt-4 text-lg font-medium sm:text-xl sm:mt-6">
                      {creatorsTotal || 0}
                    </span>
                    <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      booked
                    </span>
                  </div>

                  {/* -----Items ----- */}
                  <div className="flex flex-col items-center justify-center p-5 border shadow-md bg-yellow-50 dark:bg-slate-800 rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Booking Spend
                    </span>
                    <span className="inline-flex mt-4 text-lg font-medium sm:text-xl sm:mt-6">
                      <TbCurrencyNaira className=" w-[26px] h-[26px] xl:w-[26px] xl:h-[26px] sm:w-[25px] sm:h-[27px]" />{" "}
                      {totalAmountPaid?.toLocaleString() || 0}
                    </span>
                    <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      total
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ====================== END HEADER ====================== */}

            <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
              <main>
                <Tab.Group>
                  <div className="flex flex-col justify-between lg:flex-row ">
                    <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                      {categories.map((item) => (
                        <Tab key={item}>
                          {() => (
                            <button
                              className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                                selected === item
                                  ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                                  : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                              }`}
                              onClick={() => handleTabClick(item)}
                            >
                              {item}
                            </button>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                </Tab.Group>
                <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
                  <div className="w-full mt-2">
                    <div className="relative w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                          <form className="flex items-center">
                            <label className="sr-only">Search</label>
                            <div className="relative w-full">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <input
                                type="text"
                                id="simple-search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search"
                                required=""
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-10 py-3">
                                Creator
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Status
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Amount
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Timeframe
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Delivery
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Contact
                              </th>

                              <th scope="col" className="px-10 py-3">
                                Analytics
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {paginatedData &&
                              paginatedData.map((index: any, i: any) => (
                                <tr
                                  key={index.toString() + "-" + i}
                                  className="bg-white border-b dark:bg-slate-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <th
                                    scope="row"
                                    className="flex items-center px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <img
                                      className="object-cover w-10 h-10 rounded-full"
                                      src={
                                        index.img ||
                                        "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
                                      }
                                      alt=""
                                    />
                                    <div className="pl-3">
                                      <a
                                        title={`Click to view ${capitalizeFirstLetter(
                                          index.creatorUsername
                                        )}'s profile`}
                                        href={index.profileLink}
                                        target="_blank"
                                        className="text-base font-semibold capitalize"
                                      >
                                        {index.creatorUsername || ""}
                                      </a>
                                      <div className="font-normal text-gray-500">
                                        <span className="text-green-500">
                                          Deliverable Booked:{" "}
                                        </span>
                                        {index.deliverableBooked}
                                      </div>
                                    </div>
                                  </th>

                                  <td className="px-10 py-4">
                                    {index.bookingStatus ? (
                                      <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                        Active
                                      </div>
                                    ) : index.bookingStatus === false ? (
                                      <div className="flex items-center">
                                        Completed
                                      </div>
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>

                                  <td className="inline-flex px-10 mb-8">
                                    <TbCurrencyNaira className="w-[19px] h-[19px]" />{" "}
                                    {index.amountPaid?.toLocaleString() || 0}
                                  </td>

                                  <td className="px-10 py-4">
                                    {index.timeframe ? (
                                      <span>{index.timeframe}</span>
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>

                                  <td className="px-10 py-4">
                                    {index.timeframe ? (
                                      <span>
                                        {calculateSubmissionTime(
                                          index.timeframe
                                        )}
                                      </span>
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>

                                  <td className="px-10 py-4">
                                    {index.creatorUsername ? (
                                      <BiMessageSquareDetail
                                        onClick={() =>
                                          handleChatLogic(index.creatorUsername)
                                        }
                                        className="w-7 h-7"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </td>

                                  <td className="px-2 py-4">
                                    {index.timeframe ? (
                                      <Badge
                                        className="flex justify-center ml-7 items-center px-2 py-0.5 text-center"
                                        color="green"
                                        name="Coming soon"
                                      />
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </section>
              </main>
            </div>

            <NcModal
              renderTrigger={() => null}
              isOpenProp={showDemoModal}
              renderContent={renderDemoContent}
              contentExtraClass="max-w-2xl"
              onCloseModal={() => setShowDemoModal(false)}
              modalTitle=""
            />

            <NcModal
              renderTrigger={() => null}
              isOpenProp={showNoChatModal}
              renderContent={renderNoChatContent}
              contentExtraClass="max-w-md"
              onCloseModal={() => setShowNoChatModal(false)}
              modalTitle="🔔 No Conversations Found"
            />
          </div>
        )}
      </div>
      {/** ALTERNATIVE CHAT LOGIC:
        const handleChatLogic = async (creatorUsername: string) => {
          try {
            // Get influencer profile
            const influencerResponse = await newRequest.get(
              `/influencer/get/${creatorUsername}`
            );
            const influencerProfile = influencerResponse.data;

            // Check if a chat already exists between the influencer and brand
            const existingChatResponse = await newRequest.get(
              `/chat/find/${influencerProfile._id}/${brandProfile._id}`
            );
            const existingChat = existingChatResponse.data;

            // If chat exists, redirect to the existing chat
            if (existingChat) {
              const chatId = existingChat._id;
              history.push(`/message/${chatId}`);
              localStorage.setItem("previousLocation", "/brand");
              return;
            }

            const chat = {
              senderId: brandProfile._id,
              receiverId: influencerProfile._id,
            };

            const chatRes = await newRequest.post("/chat", chat);
            const createdChat = chatRes.data;

            if (createdChat) {
              const chatId = createdChat._id;
              history.push(`/message/${chatId}`);
              localStorage.setItem("previousLocation", "/brand");
              return;
            }
          } catch (err) {
            console.log(err);
          }
        };
      */}
    </>
  );
};

export default BrandDashboardPage;