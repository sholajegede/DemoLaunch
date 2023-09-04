// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";
import NcImage from "shared/NcImage/NcImage";
import { AuthContext } from "context/AuthContext";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { TbCurrencyNaira } from "react-icons/tb";
import BrandLogin from "containers/PageLogin/BrandLogin";

export interface PageBookProps {
  className?: string;
}

const PageBook: FC<PageBookProps> = ({ className = "" }) => {
  const { username, deliverableId } = useParams<{
    username: string;
    deliverableId: string;
  }>();

  const { brand } = useContext(AuthContext);

  const [influencer, setInfluencer] = useState<InfluencerData>({});

  const [fetchedDeliverable, setFetchedDeliverable] = useState({});

  const history = useHistory();

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/get/${username}`)
      .then((response) => {
        if (response.data) {
          setInfluencer(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [username]);
  //

  useEffect(() => {
    const fetchDeliverable = async () => {
      const response = await newRequest.get(
        `/influencer/deliverable/${username}/${deliverableId}`
      );
      setFetchedDeliverable(response.data);
    };
    fetchDeliverable();
  }, [username, deliverableId]);

  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Remove trailing decimal zeros
    return formattedNumber.replace(/\.?0+$/, "");
  };

  const deliverableRate = fetchedDeliverable.rate;

  const formatDeliverableAmount = (deliverableRate = 0) => {
    return formatNumber(deliverableRate);
  };

  const formattedDeliverableAmount = formatDeliverableAmount(deliverableRate);

  const fee = deliverableRate * 0.03 + 500;
  const totalAmount = deliverableRate + fee;

  const formatFee = (fee = 0) => {
    return formatNumber(fee);
  };

  const formattedFee = formatFee(fee);

  //Total Payment
  const formatTotal = (totalAmount = 0) => {
    return formatNumber(totalAmount);
  };

  const formattedTotal = formatTotal(totalAmount);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(Date.now());

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: brand?.email,
      phone_number: brand?.phone,
      name: brand?.businessName,
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
        const bookingDetails = {
          influencerImage: influencer.img,
          brandImage: brand.logo,
          brandName: brand.businessName,
          aboutBrand: brand.desc,
          bookedDeliverable: fetchedDeliverable.description,
          paidAmount: fetchedDeliverable.rate,
          sendAmount: formattedDeliverableAmount,
          timeFrame: fetchedDeliverable.deliveryTime,
          influencerEmail: influencer.email,
          brandEmail: brand.email,
          username: influencer.username,
          brandId: brand._id,
          influencerId: influencer._id,
          date: currentDate,
        };

        try {
          const response = await newRequest.post(
            "/auth-influencer/booking-email",
            bookingDetails
          );
          console.log(response);
          window.location.href = "/confirmed";
        } catch (err) {
          setError(err);
        }
        window.location.href = "/confirmed";
      } else {
        history.push(`/book/${username}/${deliverableId}`);
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

  return (
    <>
      {brand?._id ? (
        <div className={`nc-PageBook ${className}`} data-nc-id="PageBook">
          <Helmet>
            <title>Booking {headerName}</title>
          </Helmet>

          <main className="container flex mt-10 mb-20">
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
              {/* BOOKING */}
              <div className="mt-0 space-y-8 sm:space-y-10 sm:mt-0 lg:mt-10 md:mt-0 xl:mt-10">
                <div className="space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                  <div className="px-8 py-6 border-2 shadow-xl rounded-2xl">
                    <div className="flex justify-between mt-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          Booking <span className="capitalize">{username}</span>
                        </h2>
                      </div>
                      <div>
                        <NcImage
                          alt="Creator Image"
                          className="object-cover w-20 h-20 rounded-lg"
                          src={influencer.img}
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium">Brand</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {brand.businessName}
                          </p>
                        </div>
                        <div className="mr-3">
                          <h3 className="text-lg font-medium">Creator</h3>
                          <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
                            {influencer.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium">Brand Email</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {brand.email}
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
                              Deliverable: {fetchedDeliverable.description}
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
                              Timeframe: {fetchedDeliverable.deliveryTime}
                            </p>
                          </li>
                          <li className="flex items-center">
                            <TbCurrencyNaira
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                            <p>
                              Booking Rate:{" "}
                              <span>{formattedDeliverableAmount}</span>
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-40">
                        <h3 className="text-lg font-medium">SubTotal:</h3>
                        <p className="text-neutral-500 dark:text-neutral-400">
                          NGN {formattedDeliverableAmount}
                        </p>
                      </div>
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
                        Make Payment
                      </h2>
                    </div>

                    <div className="flex mb-6 space-x-24 sm:space-x-64 lg:space-x-64 xl:space-x-64 md:space-x-64">
                      <div>
                        <h3 className="text-lg font-medium mr-7">SubTotal:</h3>
                      </div>
                      <div className="">
                        <h3 className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
                          <span className="font-bold">NGN</span>{" "}
                          {formattedDeliverableAmount}
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
                          <span className="font-black text-green-500">
                            {formattedTotal}
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div className="w-full mt-4 border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                    <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <FlutterWaveButton
                        {...fwConfig}
                        className="relative inline-flex items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base"
                      />
                      <Link to="/messages">
                        <ButtonSecondary type="button">
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
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : influencer?._id ? (
        <BrandLogin />
      ) : (
        <>
          <BrandLogin />
          {(() => {
            localStorage.setItem(
              "previousLocation",
              `deliverable/${username}/${deliverableId}`
            );
          })()}
        </>
      )}
    </>
  );
};

export default PageBook;