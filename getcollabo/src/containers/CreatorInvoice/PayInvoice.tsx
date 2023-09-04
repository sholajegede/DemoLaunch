// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/solid";
import newRequest from "utils/newRequest";
import NcImage from "shared/NcImage/NcImage";
import NcModal from "shared/NcModal/NcModal";
import { AuthContext } from "context/AuthContext";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { TbCurrencyNaira } from "react-icons/tb";

export interface PayInvoiceProps {
  className?: string;
}

export interface UserItem {
  features: string[];
}

const PayInvoice: FC<PayInvoiceProps> = ({ className = "" }) => {
  const { username, invoiceId } = useParams<{
    username: string;
    invoiceId: string;
  }>();

  const { brand } = useContext(AuthContext);

  const { influencer } = useContext(InfluencerAuthContext);

  const [showModal, setShowModal] = useState(false);

  const [fetchedInvoice, setFetchedInvoice] = useState({});

  const history = useHistory();

  const brandFeatures: UserItem[] = [
    {
      features: [
        "Access to top creators",
        "High-quality deliverables",
        "Fast and secure booking",
        "Multiple ways to make payments",
        "Seamless collaboration management",
        "Content tracking and analytics",
      ],
    },
  ];

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await newRequest.get(`/invoice/find/${invoiceId}`);
      setFetchedInvoice(response.data);
    };
    fetchInvoice();
  }, [invoiceId]);

  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Remove trailing decimal zeros
    return formattedNumber.replace(/\.?0+$/, "");
  };

  const invoicePrice = fetchedInvoice.rate;

  const formatInvoiceAmount = (invoicePrice = 0) => {
    return formatNumber(invoicePrice);
  };

  const formattedInvoiceAmount = formatInvoiceAmount(invoicePrice);

  const fee = invoicePrice * 0.03 + 500;
  const invoiceAmount = invoicePrice + fee;

  const formatFee = (fee = 0) => {
    return formatNumber(fee);
  };

  const formattedFee = formatFee(fee);

  //Total Invoice
  const formatTotal = (invoiceAmount = 0) => {
    return formatNumber(invoiceAmount);
  };

  const formattedTotal = formatTotal(invoiceAmount);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(Date.now());

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: invoiceAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: fetchedInvoice.brandEmail,
      phone_number: brand?.phone || "",
      name: fetchedInvoice.brandName,
    },
    customizations: {
      title: "GetCollabo FLW",
      description: "Payments are insured by GetCollabo.",
      logo: "https://res.cloudinary.com/newlink/image/upload/v1680022658/GetCollabo%20Logo.png",
    },
  };

  const fwConfig = {
    ...config,
    tx_ref: Date.now().toString(),
    text: (
      <>
        <span className="mr-2">Pay now</span>
        <span className="inline-block mr-1 align-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline-block w-6 h-6 align-text-bottom"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
        </span>
      </>
    ),
    callback: async (response: any) => {
      console.log(response);

      if (response.status === "completed") {
        if (brand && brand._id) {
          console.log(brand._id);
          const bookingDetails = {
            influencerImage: fetchedInvoice.influencerImg,
            brandImage: brand.logo,
            brandName: fetchedInvoice.brandName,
            aboutBrand: brand.desc,
            bookedDeliverable: fetchedInvoice.description,
            paidAmount: fetchedInvoice.rate,
            sendAmount: formattedInvoiceAmount,
            timeFrame: fetchedInvoice.deliveryTime,
            influencerEmail: fetchedInvoice.influencerEmail,
            brandEmail: fetchedInvoice.brandEmail,
            username: fetchedInvoice.influencerUsername,
            brandId: brand._id,
            influencerId: fetchedInvoice.influencerId,
            invoiceId: fetchedInvoice._id,
            date: currentDate,
          };

          try {
            const bookingResponse = await newRequest.post(
              "/auth-influencer/booking-email",
              bookingDetails
            );
            console.log(bookingResponse);
          } catch (err) {
            console.log(err);
          }
        } else {
          const invoiceDetails = {
            invoiceId: fetchedInvoice._id,
          };

          try {
            const paymentResponse = await newRequest.post(
              "/auth-influencer/invoicePayment",
              invoiceDetails
            );
            console.log(paymentResponse);
          } catch (err) {
            console.log(err);
          }
        }

        window.location.href = "/confirmed";
      } else {
        history.push(`/pay/${username}/${invoiceId}`);
      }

      closePaymentModal(() => {
        history.push("/confirmed");
      });
    },

    onClose: () => {
      history.push("/confirmed");
    },
  };

  const headerName = username
    ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    : "Creator";

  const handleSignUpLogic = async () => {
    history.push("/create-brand");
    localStorage.setItem(
      "previousLocation",
      `pay/${username}/${fetchedInvoice._id}`
    );
  };

  const handleBackLogic = async () => {
    const previousLocation = localStorage.getItem("previousLocation");

    if (previousLocation) {
      localStorage.removeItem("previousLocation");
      history.push(previousLocation);
    } else {
      history.push("/brand");
    }
  };

  const renderContent = () => {
    return (
      <div>
        <span className="text-sm sm:text-base xl:text-base lg:text-base">
          Hi{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {fetchedInvoice.brandName}
          </span>
          , sign up to unlock all these benefits for your brand (for free) or proceed with
          paying{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {username}
          </span>{" "}
          without signing up:
        </span>
        <nav className="mt-6 mb-4 space-y-4">
          {brandFeatures[0]?.features && brandFeatures[0].features.length > 0
            ? brandFeatures[0].features.map((item, index) => (
                <li className="flex items-center" key={index}>
                  <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                    <CheckIcon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))
            : null}
        </nav>

        <span className="text-sm sm:text-base xl:text-base lg:text-base">
          You will be redirected back to this invoice after signing up.
        </span>

        <div className="flex mt-8 space-x-3">
          <FlutterWaveButton
            {...fwConfig}
            className="relative items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base"
          />
          <ButtonSecondary onClick={handleSignUpLogic} type="button">
            <span>Sign up</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`nc-PayInvoice ${className}`} data-nc-id="PayInvoice">
        <Helmet>
          <title>Pay {headerName}</title>
        </Helmet>

        <main className="container flex mt-10 mb-20">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
            {/* INVOICE */}
            <div className="mt-0 space-y-8 sm:space-y-10 sm:mt-0 lg:mt-10 md:mt-0 xl:mt-10">
              <div className="space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                <div className="px-8 py-6 border-2 shadow-xl rounded-2xl">
                  <div className="flex justify-between mt-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold">Invoice</h2>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Invoice #{fetchedInvoice.paperId}
                      </p>
                    </div>
                    <div>
                      <NcImage
                        alt="Creator Image"
                        className="object-cover w-20 h-20 rounded-lg"
                        src={fetchedInvoice.influencerImg}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-medium">Brand</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {fetchedInvoice.brandName}
                        </p>
                      </div>
                      <div className="mr-3">
                        <h3 className="text-lg font-medium">Creator</h3>
                        <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
                          {fetchedInvoice.influencerUsername}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-medium">Brand Email</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {fetchedInvoice.brandEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-medium">Date Created</h3>
                        <p className="inline-flex text-sm text-neutral-500 dark:text-neutral-400">
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>

                          <span className="mt-0.5">{fetchedInvoice.date}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  <div className="flex justify-between mb-2">
                    <div className="mt-6 text-sm">
                      <h3 className="mb-2 text-lg font-medium">
                        Booking Details
                      </h3>

                      <ul className="mb-4 list-disc text-neutral-500 dark:text-neutral-400">
                        <li className="flex items-center mb-1.5">
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
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          <p className="">
                            Deliverable: {fetchedInvoice.description}
                          </p>
                        </li>
                        <li className="flex items-center mb-1.5">
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
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="">
                            Timeframe: {fetchedInvoice.deliveryTime}
                          </p>
                        </li>
                        <li className="flex items-center">
                          <TbCurrencyNaira
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                          <p>
                            Booking Rate: <span>{formattedInvoiceAmount}</span>
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-40">
                      <h3 className="text-lg font-medium">Payment Due:</h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        NGN {formattedInvoiceAmount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="mb-2 text-lg font-medium">Other Notes</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.notes || "No notes"}
                    </p>
                  </div>

                  <div className="mt-16 text-center">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      All payments are insured by GetCollabo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                <div className="mt-0 ml-1 mr-6 sm:mt-0 lg:mt-10 md:mt-0 xl:mt-10">
                  <div className="max-w-2xl mb-10">
                    <h2 className="text-3xl font-semibold capitalize sm:text-4xl">
                      Pay {username}
                    </h2>
                  </div>

                  <div className="flex mb-6 space-x-24 sm:space-x-64 lg:space-x-64 xl:space-x-64 md:space-x-64">
                    <div>
                      <h3 className="text-lg font-medium mr-7">SubTotal:</h3>
                    </div>
                    <div className="">
                      <h3 className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
                        <span className="font-bold">NGN</span>{" "}
                        {formattedInvoiceAmount}
                      </h3>
                    </div>
                  </div>

                  <div className="flex mb-6 space-x-20 sm:space-x-60 lg:space-x-60 xl:space-x-60 md:space-x-60">
                    <div>
                      <h3 className="mr-2.5 text-lg font-medium">
                        Platform Fee:
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        (3% + N500)
                      </p>
                    </div>
                    <div className="">
                      <h3 className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
                        <span className="font-bold">NGN</span> {formattedFee}
                      </h3>
                    </div>
                  </div>

                  <div className="flex mb-6 space-x-36 sm:space-x-80 lg:space-x-80 xl:space-x-80 md:space-x-80">
                    <div>
                      <h3 className="mr-3 text-lg font-medium sm:mr-0 md:mr-0 lg:mr-0 xl:mr-0">
                        Total:
                      </h3>
                    </div>
                    <div className="">
                      <h3 className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
                        <span className="font-bold">NGN</span>{" "}
                        {fetchedInvoice.status === true ? (
                          <span className="">{formattedTotal}</span>
                        ) : (
                          <span className="font-black text-green-500">
                            {formattedTotal}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>

                  <div className="w-full mt-4 border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    {brand?._id && fetchedInvoice.status === false ? (
                      <FlutterWaveButton
                        {...fwConfig}
                        className="relative inline-flex items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base"
                      />
                    ) : brand?._id && fetchedInvoice.status === true ? (
                      <span>You've already paid this invoice👍</span>
                    ) : influencer?._id ? (
                      <p className="text-sm">
                        You're not allowed to make a payment for this invoice
                      </p>
                    ) : fetchedInvoice.status === true ? (
                      <span>
                        This invoice has been paid by {fetchedInvoice.brandName}
                        👍
                      </span>
                    ) : (
                      <ButtonPrimary
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        Make Payment
                      </ButtonPrimary>
                    )}
                    {brand?._id ? (
                      <ButtonSecondary onClick={handleBackLogic} type="button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5 12H3.67004"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-2">Back</span>
                      </ButtonSecondary>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <NcModal
          renderTrigger={() => null}
          isOpenProp={showModal}
          renderContent={renderContent}
          contentExtraClass="max-w-xl"
          onCloseModal={() => setShowModal(false)}
          modalTitle="Invoice Payment"
        />
      </div>
    </>
  );
};

export default PayInvoice;