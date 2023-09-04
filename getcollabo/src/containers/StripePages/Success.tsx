// @ts-nocheck
import React, { FC, useContext, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import { InfluencerProfileData } from "routers/types";

export interface SuccessProps {
  className?: string;
}

const Success: FC<SuccessProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);
  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  //STRIPE
  const [invoices, setInvoices] = useState();
  const [singleSub, setSingleSub] = useState();

  //PAYSTACK
  const [paystackCustomer, setPaystackCustomer] = useState();
  const [paystackSubscriptionId, setPaystackSubscriptionId] = useState();
  const [paystackCustomerSub, setPaystackCustomerSub] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch influencer profile
        const influencerProfileResponse = await newRequest.get(
          `/influencer/find/${influencer._id}`
        );
        const updatedProfile = influencerProfileResponse.data;
        setInfluencerProfile(updatedProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [influencer]);

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

        setPaystackCustomer(customerResponse);
      } catch (error) {
        console.error(
          "Error occurred while getting paystack data:",
          error.message
        );
      }
    };

    fetchPaystackData();
  }, [influencerProfile.paystackCustomerId]);

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

  const paystackPlan = paystackCustomerSub?.data?.data?.plan.name;


  //STRIPE
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!influencer.stripeCustomerId) {
          console.error("Missing stripeCustomerId for influencer:", influencer);
          return;
        }

        const invoiceResponse = await newRequest.get(
          `/subscriptions/invoices/${influencer.stripeCustomerId}`
        );
        setInvoices(invoiceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [influencer]);

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

  const subscriptionAccess = singleSub?.plan.nickname;

  return (
    <>
      {influencer.stripeCustomerId ? (
        <div className={`nc-Success ${className}`} data-nc-id="Success">
          <Helmet>
            <title>Subscription Successful</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-10">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Subscription Successful 🎉!</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-600 dark:text-gray-400">
                          <p>
                            Hi{" "}
                            <span className="capitalize">
                              {influencer.username}
                            </span>
                            👋, your subscription for the "
                            <span className="text-primary-6000">
                              {subscriptionAccess || paystackPlan}
                            </span>
                            " was successful.
                          </p>
                        </div>
                        <svg
                          aria-hidden="true"
                          className="w-24 h-24 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>

                      <ButtonPrimary href={"/welcome"}>
                        Go to Workspace
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </>
  );
};

export default Success;