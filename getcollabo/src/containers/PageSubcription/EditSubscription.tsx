// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { Tab } from "@headlessui/react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import InputPreview from "shared/Input/InputPreview";
import Badge from "shared/Badge/Badge";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";

export interface EditSubscriptionProps {
  className?: string;
}

const EditSubscription: FC<EditSubscriptionProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const [invoices, setInvoices] = useState();

  const [singleSub, setSingleSub] = useState();

  const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch influencer profile
        const influencerProfileResponse = await newRequest.get(
          `/influencer/find/${influencer._id}`
        );
        const updatedProfile = influencerProfileResponse.data;
        setInfluencerProfile(updatedProfile);

        //if (!updatedProfile.stripeCustomerId) {
          //console.error(
          //  "Missing stripeCustomerId for influencer:",
          //  updatedProfile
          //);
         // return;
       // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [influencer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice
        const invoiceResponse = await newRequest.get(
          `/subscriptions/invoices/${influencerProfile.stripeCustomerId}`
        );
        setInvoices(invoiceResponse.data);
      } catch (error) {
        console.error("No invoice for this customer");
      }
    };

    fetchData();
  }, [influencerProfile.stripeCustomerId]);

  const subscriptionCode = invoices?.[0]?.subscription;

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if (subscriptionCode) {
          const subResponse = await newRequest.get(
            `/subscriptions/single/${subscriptionCode}`
          );

          setSingleSub(subResponse.data);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };
    fetchSubscription();
  }, [subscriptionCode]);

  const paymentMethodId = singleSub?.default_payment_method;

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        if (paymentMethodId) {
          const subResponse = await newRequest.get(
            `/subscriptions/paymentMethod/${paymentMethodId}`
          );

          setPaymentMethod(subResponse.data);
        }
      } catch (error) {
        console.error("Error fetching payment method:", error);
      }
    };
    fetchPaymentMethod();
  }, [paymentMethodId]);

  //PAYSTACK
  const [paystackCustomer, setPaystackCustomer] = useState();
  const [paystackSubscriptionId, setPaystackSubscriptionId] = useState();
  const [paystackCustomerSub, setPaystackCustomerSub] = useState();

  const [paystackInvoices, setPaystackInvoices] = useState([]);

  useEffect(() => {
    const fetchPaystackData = async () => {
      try {
        if (!influencerProfile.paystackCustomerId) return;

        const customerResponse = await newRequest.get(
          `/subscriptions/paystack/customer/${influencerProfile.paystackCustomerId}`
        );

        const subscriptions = customerResponse?.data?.data?.subscriptions || [];
        if (subscriptions.length > 0) {
          const latestSubscriptionCode =
            subscriptions[subscriptions.length - 1]?.subscription_code;
          setPaystackSubscriptionId(latestSubscriptionCode);
        }

        const transactionsResponse = await newRequest.get(
          `/subscriptions/paystack/transactions/${influencerProfile.paystackCustomerId}`
        );

        setPaystackCustomer(customerResponse);
        setPaystackInvoices(transactionsResponse.data);
      } catch (error) {
        console.error(
          "Error occurred while getting paystack data:",
          error.message
        );
      }
    };

    fetchPaystackData();
  }, [influencerProfile.paystackCustomerId]);

  //console.log(paystackCustomer);

  //console.log(paystackInvoices);

  useEffect(() => {
    const getPaystackCustomerSub = async () => {
      try {
        if (paystackSubscriptionId) {
          const response = await newRequest.get(
            `/subscriptions/paystack/subscriptions/${paystackSubscriptionId}`
          );
          setPaystackCustomerSub(response);
        }
      } catch (error) {
        console.error(
          "Error occurred while getting customer subscriptions:",
          error.message
        );
      }
    };

    getPaystackCustomerSub();
  }, [paystackSubscriptionId]);

  //console.log(paystackCustomerSub);

  const paystackPlan = paystackCustomerSub?.data?.data?.plan.name;

  const paystackPlanStatus = paystackCustomerSub?.data?.data?.status;

  const paystackPlanAmount = paystackCustomerSub?.data?.data?.amount;

  const paystackPlanCreated = paystackCustomerSub?.data?.data?.createdAt;

  const paystackPlanNextPayment =
    paystackCustomerSub?.data?.data?.next_payment_date;

  //CARD INFO
  const paystackCardBrand =
    paystackCustomerSub?.data?.data?.authorization.brand;

  const paystackCardLast4 =
    paystackCustomerSub?.data?.data?.authorization.last4;

  const paystackCardOwner =
    paystackCustomerSub?.data?.data?.authorization.account_name;

  const paystackCardMO =
    paystackCustomerSub?.data?.data?.authorization.exp_month;

  const paystackCardYR =
    paystackCustomerSub?.data?.data?.authorization.exp_year;

  //PAYSTACK EMAIL TOKEN AND SUBCRIPTION CODE
  const emailToken = paystackCustomerSub?.data?.data?.email_token;
  const subCode = paystackSubscriptionId;

  const convertTimestampToTimeAndDay = (timestamp) => {
    const dateObj = new Date(timestamp * 1000);
    const time = dateObj.toLocaleTimeString();
    const day = dateObj.toLocaleDateString();
    return { time, day };
  };

  const convertPaystackTimestampToTimeAndDay = (timestamp) => {
    const dateObj = new Date(timestamp);

    // Get hours in 12-hour format
    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12

    const minutes = dateObj.getMinutes();

    const time = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    const day = dateObj.toISOString().substr(0, 10);

    return { time, day };
  };

  const convertSubDate = (timestamp) => {
    const dateObj = new Date(timestamp * 1000);
    const day = dateObj.toLocaleDateString();
    return day;
  };

  const convertPaystackSubDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleString("en-US", options);
  };

  const subscriptionId = singleSub?.id;

  const cancelSubscription = async () => {
    try {
      if (subscriptionId) {
        const response = await newRequest.delete(
          `/subscriptions/cancel/${subscriptionId}`
        );
        console.log(response);
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const cancelPaystackSubscription = async () => {
    try {
      const response = await newRequest.delete(
        `/subscriptions/paystack/disable/${subCode}/${emailToken}`
      );
      console.log("Subscription deletion response:", response);
    } catch (error) {
      console.error("Error deleting subscription:", error.message);
    }
  };

  const updatePaystackCard = async () => {
    try {
      const response = await newRequest.get(
        `/subscriptions/paystack/card/update/${paystackSubscriptionId}`
      );
      const url = response.data.data.link;
      window.location.href = url;
    } catch (error) {
      console.error("Error updating card:", error.message);
    }
  };

  return (
    <div
      className={`nc-EditSubscription ${className}`}
      data-nc-id="EditSubscription"
    >
      <Helmet>
        <title>Subscription</title>
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* HEADING */}
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Manage Subscription
                    </div>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </Tab.Group>

          <p className="mt-4 mb-2 font-normal text-gray-500 dark:text-gray-400">
            Switch your subscription to a different type, cancel your
            subscription or download your invoice.
          </p>

          <span className="block max-w-2xl mt-4 mb-2 text-sm text-neutral-500 dark:text-neutral-400"></span>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="mt-10">
            <div className="grid sm:grid-cols-1 gap-x-5 gap-y-8 lg:grid-cols-2 xl:grid-cols-2">
              <div className="">
                <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 xl:h-96 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 mt-0.5 mb-2 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <h5 className="inline-flex mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Plan -{" "}
                    {singleSub?.status === "active" ? (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="green"
                        name="Active"
                      />
                    ) : paystackPlanStatus === "active" ? (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="green"
                        name="Active"
                      />
                    ) : singleSub?.status === "canceled" ? (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="red"
                        name="Inactive"
                      />
                    ) : singleSub?.trial_start ? (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="yellow"
                        name="Trial active"
                      />
                    ) : singleSub?.trial_start === null ? (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="gray"
                        name="No active plan"
                      />
                    ) : (
                      <Badge
                        className="flex items-center justify-center ml-2 text-center rounded"
                        color="gray"
                        name="No active plan"
                      />
                    )}
                  </h5>

                  {singleSub?.status === "active" ? (
                    <p className="mt-2 mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Type:{" "}
                      <span className="font-semibold text-primary-6000">
                        {singleSub?.plan.nickname}
                      </span>
                    </p>
                  ) : paystackPlanStatus === "active" ? (
                    <p className="mt-2 mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Type:{" "}
                      <span className="font-semibold text-primary-6000">
                        {paystackPlan}
                      </span>
                    </p>
                  ) : singleSub?.trial_start ? (
                    <p className="mt-2 mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Type:{" "}
                      <span className="font-semibold text-primary-6000">
                        {singleSub?.plan.nickname}
                      </span>
                    </p>
                  ) : singleSub?.trial_start === null ? (
                    <>{""}</>
                  ) : null}

                  {singleSub?.status === "active" ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Created:{" "}
                      {singleSub?.trial_start === null ? (
                        <span>
                          {convertSubDate(singleSub?.current_period_start)}
                        </span>
                      ) : (
                        <span>{convertSubDate(singleSub?.trial_start)}</span>
                      )}
                    </p>
                  ) : paystackPlanStatus === "active" ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Created:{" "}
                      <span>{convertPaystackSubDate(paystackPlanCreated)}</span>
                    </p>
                  ) : singleSub?.status === "canceled" ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Ended: <span>{convertSubDate(singleSub?.ended_at)}</span>
                    </p>
                  ) : singleSub?.trial_start ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      Created:{" "}
                      {singleSub?.trial_start === null ? (
                        <span>
                          {convertSubDate(singleSub?.current_period_start)}
                        </span>
                      ) : (
                        <span>{convertSubDate(singleSub?.trial_start)}</span>
                      )}
                    </p>
                  ) : singleSub?.trial_start === null ? (
                    <>{""}</>
                  ) : null}

                  {/**singleSub?.trial_start ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      <span>
                        Free Trial: {singleSub?.plan.trial_period_days || "0"}{" "}
                        Days
                      </span>
                    </p>
                  ) : paystackPlanStatus === "active" ? (
                    <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                      <span>
                        Free Trial: {"To be added"}-
                        {singleSub?.plan.trial_period_days || "0"} Days
                      </span>
                    </p>
                  ) : singleSub?.trial_start === null ? (
                    <>{""}</>
                  ) : null*/}

                  {singleSub?.status === "active" ? (
                    <p className="mb-10 font-normal text-gray-500 xl:mb-20 dark:text-gray-400">
                      Next payment of{" "}
                      <span className="font-bold text-green-500">
                        NGN {(singleSub?.plan.amount / 100).toLocaleString()}
                      </span>{" "}
                      to be made on{" "}
                      <span className="font-bold">
                        {singleSub?.trial_end === null ? (
                          <span>
                            {convertSubDate(singleSub?.current_period_end)}
                          </span>
                        ) : (
                          <span>{convertSubDate(singleSub?.trial_end)}</span>
                        )}
                      </span>
                    </p>
                  ) : paystackPlanStatus === "active" ? (
                    <p className="mb-10 font-normal text-gray-500 xl:mb-20 dark:text-gray-400">
                      Next payment of{" "}
                      <span className="font-bold text-green-500">
                        NGN {(paystackPlanAmount / 100).toLocaleString()}
                      </span>{" "}
                      to be made on{" "}
                      <span className="font-bold">
                        {paystackPlanNextPayment ? (
                          <span>
                            {convertPaystackSubDate(paystackPlanNextPayment)}
                          </span>
                        ) : (
                          <span>
                            {convertPaystackSubDate(paystackPlanNextPayment)}
                          </span>
                        )}
                      </span>
                    </p>
                  ) : singleSub?.trial_start ? (
                    <p className="mb-10 font-normal text-gray-500 xl:mb-20 dark:text-gray-400">
                      Next payment of{" "}
                      <span className="font-bold text-green-500">
                        NGN {(singleSub?.plan.amount / 100).toLocaleString()}
                      </span>{" "}
                      to be made on{" "}
                      <span className="font-bold">
                        {singleSub?.trial_end === null ? (
                          <span>
                            {convertSubDate(singleSub?.current_period_end)}
                          </span>
                        ) : (
                          <span>{convertSubDate(singleSub?.trial_end)}</span>
                        )}
                      </span>
                    </p>
                  ) : singleSub?.trial_start === null ? (
                    <>{""}</>
                  ) : null}

                  {singleSub?.status === "active" ? (
                    <div className="flex flex-col sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
                      <ButtonPrimary
                        href={"/change-plan"}
                        className="flex-1"
                        type="button"
                      >
                        Change plan
                      </ButtonPrimary>
                      <ButtonSecondary
                        onClick={cancelSubscription}
                        className="flex-1 mt-2"
                      >
                        <span className="text-red-500">
                          Cancel subscription
                        </span>
                      </ButtonSecondary>
                    </div>
                  ) : paystackPlanStatus === "active" ? (
                    <div className="flex flex-col sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
                      <ButtonPrimary
                        href={"/change-plan"}
                        className="flex-1"
                        type="button"
                      >
                        Change plan
                      </ButtonPrimary>
                      <ButtonSecondary
                        onClick={cancelPaystackSubscription}
                        className="flex-1 mt-2"
                      >
                        <span className="text-red-400">
                          Cancel subscription
                        </span>
                      </ButtonSecondary>
                    </div>
                  ) : singleSub?.trial_start ? (
                    <div className="flex flex-col sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
                      <ButtonPrimary
                        href={"/change-plan"}
                        className="flex-1"
                        type="button"
                      >
                        Change plan
                      </ButtonPrimary>
                      <ButtonSecondary
                        onClick={cancelSubscription}
                        className="flex-1 mt-2"
                      >
                        <span className="text-red-500">
                          Cancel subscription
                        </span>
                      </ButtonSecondary>
                    </div>
                  ) : singleSub?.trial_start === null ? (
                    <div className="flex flex-col mt-10 sm:mt-10 xl:mt-48 sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
                      <ButtonPrimary
                        href={"/change-plan"}
                        className="flex-1"
                        type="button"
                      >
                        Subscribe to a Plan
                      </ButtonPrimary>
                    </div>
                  ) : (
                    <div className="flex flex-col mt-10 sm:mt-10 xl:mt-48 sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
                      <ButtonPrimary
                        href={"/change-plan"}
                        className="flex-1"
                        type="button"
                      >
                        Subscribe to a Plan
                      </ButtonPrimary>
                    </div>
                  )}
                </div>
              </div>

              <div className="">
                <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 sm:h-full xl:h-96 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <BsCreditCard2BackFill className="w-10 h-10 mt-2 mb-2 text-gray-500 dark:text-gray-400" />

                  <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                    Connected Card
                  </h5>

                  <form className="mb-6 mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 sm:gap-2.5">
                    <FormItem label="Name on Card">
                      <InputPreview
                        disabled
                        id="card_name"
                        type="text"
                        placeholder={
                          paystackCardOwner || "xxxx xxxx"
                          /**paymentMethod?.billing_details.name ||*/
                        }
                      />
                    </FormItem>

                    <FormItem label="Card Number">
                      <div className="relative flex">
                        <InputPreview
                          disabled
                          id="card_name"
                          type="number"
                          placeholder={`xxxx-xxxx-xxxx-${
                            paystackCardLast4 ||
                            paymentMethod?.card.last4 ||
                            "xxxx"
                          }`}
                        />
                        {paystackCardBrand ? (
                          <div className="absolute inset-y-0 right-0 z-10 flex items-center px-3 w-18 rounded-2xl focus:outline-none">
                            <FaCcVisa size={30} />
                          </div>
                        ) : null}
                      </div>
                    </FormItem>

                    <FormItem label="MM/YYYY">
                      <InputPreview
                        disabled
                        id="card_name"
                        type="number"
                        placeholder={`${
                          paystackCardMO ||
                          paymentMethod?.card.exp_month ||
                          "00"
                        }/${
                          paystackCardYR ||
                          paymentMethod?.card.exp_year ||
                          "0000"
                        }`}
                      />
                    </FormItem>
                  </form>
                  {paystackSubscriptionId ? (
                    <ButtonPrimary
                      className="flex flex-1"
                      type="button"
                      onClick={updatePaystackCard}
                    >
                      Update card
                    </ButtonPrimary>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full mt-6 gap-x-5 gap-y-8">
              <div className="p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 mt-0.5 mb-2 text-gray-500 dark:text-gray-400"
                >
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                  Payment History
                </h5>

                <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        {invoices ? (
                          <th scope="col" className="px-6 py-3"></th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {paystackInvoices && paystackInvoices.length > 0
                        ? paystackInvoices?.map((item) => {
                            const { time, day } =
                              convertPaystackTimestampToTimeAndDay(
                                item.created_at
                              );
                            return (
                              <tr
                                key={item.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {item.reference}
                                </td>
                                <td className="px-6 py-4">{day}</td>
                                <td className="px-6 py-4">{time}</td>
                                <td className="px-6 py-4">
                                  {item.currency === "NGN" ? (
                                    <span>
                                      NGN {(item.amount / 100).toLocaleString()}
                                    </span>
                                  ) : item.currency === "GHS" ? (
                                    <span>
                                      GHS {(item.amount / 100).toLocaleString()}
                                    </span>
                                  ) : item.currency === "USD" ? (
                                    <span>
                                      USD {(item.amount / 100).toLocaleString()}
                                    </span>
                                  ) : null}
                                </td>

                                <td className="px-6 py-4">
                                  {item.status === "success" ? (
                                    <div className="flex items-center">
                                      <Badge
                                        className="flex items-center justify-center text-center rounded"
                                        color="green"
                                        name="Paid"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <Badge
                                        className="flex items-center justify-center text-center rounded"
                                        color="red"
                                        name="Failed"
                                      />
                                    </div>
                                  )}
                                </td>
                                {/**
                                 * <td className="px-6 py-4">
                                  <a href={item.ip_address}>
                                    <ButtonPrimary sizeClass="px-4 py-2">
                                      Download
                                    </ButtonPrimary>
                                  </a>
                                </td>
                                  */}
                              </tr>
                            );
                          })
                        : invoices && invoices.length > 0
                        ? invoices?.map((item) => {
                            const { time, day } = convertTimestampToTimeAndDay(
                              item.created
                            );
                            return (
                              <tr
                                key={item.id}
                                className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {item.number}
                                </td>
                                <td className="px-6 py-4">{day}</td>
                                <td className="px-6 py-4">{time}</td>
                                <td className="px-6 py-4">
                                  NGN{" "}
                                  {(item.amount_paid / 100).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                  {item.paid === true ? (
                                    <div className="flex items-center">
                                      <Badge
                                        className="flex items-center justify-center text-center rounded"
                                        color="green"
                                        name="Paid"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <Badge
                                        className="flex items-center justify-center text-center rounded"
                                        color="red"
                                        name="Failure"
                                      />
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <a href={item.invoice_pdf}>
                                    <ButtonPrimary sizeClass="px-4 py-2">
                                      Download
                                    </ButtonPrimary>
                                  </a>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditSubscription;