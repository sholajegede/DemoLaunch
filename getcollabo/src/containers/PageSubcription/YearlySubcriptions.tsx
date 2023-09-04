// @ts-nocheck
import React, { FC, useEffect, useState, useContext } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { TbCurrencyNaira } from "react-icons/tb";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { useHistory } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface YearlySubscriptionsProps {
  className?: string;
}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  id: string;
  pricing: number;
  desc: string;
  per: string;
  features: string[];
}

const YearlySubscriptions: FC<YearlySubscriptionsProps> = ({
  className = "",
}) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [plans, setPlans] = useState([]);
  const [paystackPlans, setPaystackPlans] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await newRequest.get(`/subscriptions/paystack/plans`);
      setPaystackPlans(response.data);
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await newRequest.get(`/subscriptions/plans`);
      setPlans(response.data);
    };
    fetchPlans();
  }, []);

  //STRIPE
  if (plans.length === 0) {
    return <div>{""}</div>;
  }

  const upgradeAmount =
    plans.data.length >= 2 ? plans.data[1].unit_amount : null;
  const proAmount = plans.data.length >= 1 ? plans.data[0].unit_amount : null;

  const upgradeId = plans.data.length >= 2 ? plans.data[1].id : null;
  const proId = plans.data.length >= 1 ? plans.data[0].id : null;

  //PAYSTACK
  const paystackUpgradeAmount = paystackPlans[1]?.amount;
  const paystackProAmount = paystackPlans[0]?.amount;

  const paystackUpgradeId = paystackPlans[1]?.plan_code;
  const paystackProId = paystackPlans[0]?.plan_code;

  const realPricingList: PricingItem[] = [
    {
      isPopular: false,
      name: "Starter Plan",
      pricing: "0",
      per: "/yr",
      features: [
        "Rate card (with a personalized booking link)",
        "Unlimited booking management",
        "Unlimited deliverables",
        "Unlimited invoices",
        "Connect 6 social media accounts",
        "Booking by email",
        "Unlimited content delivery (up to 200MB/video)",
      ],
      desc: "For creators just starting out with brand collaborations and want just a few tools",
    },
    {
      isPopular: false,
      name: "Upgrade Plan",
      id: paystackUpgradeId,
      rawAmount: paystackUpgradeAmount,
      pricing: paystackUpgradeAmount ? (paystackUpgradeAmount / 100).toLocaleString() : "0",
      per: "/yr",
      features: [
        "Everything in Starter Plan",
        "Unlimited brand proposals (In-app booking)",
        "In-app messaging",
        "Unlimited booking contracts + Legal templates",
        //"Task manager",
        "Receive payments by Bank Transfer",
      ],
      desc: "For growing creators looking to streamline their collaborations like pros",
    },
    {
      isPopular: true,
      name: "Pro Plan",
      id: paystackProId,
      rawAmount: paystackProAmount,
      pricing: paystackProAmount ? (paystackProAmount / 100).toLocaleString() : "0",
      per: "/yr",
      features: [
        "Everything in Upgrade Plan",
        "Omni-channel messaging",
        "Content tracking & performance analytics",
        "Global payment options (including Cryptocurrency)",
        "Co-collaboration with other creators",
        "Global visibility to International Brands",
      ],
      desc: "For bigger creators looking to maximize their brand collaborations like business owners",
    },
  ];

  const purchasePaystackPlan = async (priceId: string, amount: number) => {
    const purchaseData = {
      influencerId: influencer._id,
      amount: amount,
      plan: priceId,
    };

    try {
      const response = await newRequest.post(
        "/subscriptions/paystack/initialize-transaction",
        purchaseData
      );
      const url = response.data.authorization_url;
      window.location.href = url;
    } catch (error) {
      console.error("Error occurred while purchasing plan:", error);
    }
  };

  //STRIPE
  const purchasePlan = async (priceId: string) => {
    const purchaseData = {
      priceId: priceId,
      stripeCustomerId: influencer.stripeCustomerId,
      influencerId: influencer._id,
    };

    try {
      const response = await newRequest.post(
        "/subscriptions/purchase",
        purchaseData
      );
      const url = response.data.url;
      window.location.href = url;
    } catch (error) {
      console.error("Error occurred while purchasing plan:", error);
    }
  };

  const subscriptionFlow = async (priceId: string, amount: number) => {
    history.push(`/create/${priceId}/${amount}`);
  };

  const flutterwaveFlow = async (e) => {
    e.preventDefault();
    const url = "https://flutterwave.com/pay/getcollabo-yearly";
    window.location.href = url;
  };


  const pricingList: PricingItem[] = [
    {
      isPopular: true,
      name: "Pro Plan",
      pricing: "55,000",
      per: "/mo",
      features: [
        "Rate card (with a personalized booking link)",
        "Unlimited brand management",
        "Unlimited deliverables",
        "Unlimited invoices",
        "Connect 6 social media accounts",
        "Unlimited content delivery (up to 200MB/video)",
        "Unlimited brand proposals (In-app booking)",
        "In-app messaging",
        "Unlimited booking contracts + 6 legal templates",
        "Receive payments by Bank Transfer",
        "Increased visibility to local and international brands",
      ],
      desc: "",
    },
  ];

  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <p className="mt-3 mb-3 text-sm text-neutral-500 dark:text-neutral-400">
          Explore our platform with confidence - you have 14 days to request a full refund if it's not what you expected. Read our complete <Link to={"/refund-policy"} className="font-medium text-primary-6000">refund policy here</Link>.
        </p>
        <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
        {pricing.isPopular && (
          <span className="absolute z-10 px-3 py-1 text-xs tracking-widest text-white rounded-full bg-primary-500 right-3 top-3">
            14-days refund
          </span>
        )}

        <div className="mt-4 mb-8">
          <h3 className="block mb-2 text-base font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {pricing.name}
          </h3>
          <span className="text-base font-normal text-neutral-500">
            {pricing.name === "Upgrade Plan" ? (
              <Badge
                className="absolute px-2 py-1 text-center left-[265px] p-4"
                color="green"
                name="Save 8.33%"
              />
            ) : pricing.name === "Pro Plan" ? (
              <Badge
                className="absolute px-2 py-1 text-center left-[280px] p-4"
                color="green"
                name="Save 8.33%"
              />
            ) : null}
          </span>
          <h2 className="flex items-center text-5xl leading-none">
            <span className="inline-flex text-neutral-500">
              <TbCurrencyNaira />
              {pricing.pricing}
            </span>
            <span className="ml-1 text-base font-normal text-neutral-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <>
              {pricing.name === "Starter Plan" ? (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                    <span className="text-black dark:text-white">Features</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black dark:text-white`}
                    />
                  </Disclosure.Button>

                  {pricing.features.map((item, index) => (
                    <Disclosure.Panel
                      key={index}
                      className="px-4 pt-4 text-sm text-neutral-500 dark:text-neutral-400"
                      as="p"
                    >
                      <li className="flex items-center">
                        <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span
                          className={`text-sm ${
                            item.includes("Everything in")
                              ? "text-primary-6000 font-semibold"
                              : "text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    </Disclosure.Panel>
                  ))}
                </>
              ) : pricing.name === "Upgrade Plan" ? (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                    <span className="text-black dark:text-white">Features</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black dark:text-white`}
                    />
                  </Disclosure.Button>

                  {pricing.features.map((item, index) => (
                    <Disclosure.Panel
                      key={index}
                      className="px-4 pt-4 text-sm text-neutral-500 dark:text-neutral-400"
                      as="p"
                    >
                      <li className="flex items-center">
                        <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span
                          className={`text-sm ${
                            item.includes("Everything in")
                              ? "text-primary-6000 font-semibold"
                              : "text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    </Disclosure.Panel>
                  ))}
                </>
              ) : pricing.name === "Pro Plan" ? (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                    <span className="text-black dark:text-white">What you'll get</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-black dark:text-white`}
                    />
                  </Disclosure.Button>

                  {pricing.features.map((item, index) => (
                    <Disclosure.Panel
                      key={index}
                      className="px-4 pt-4 text-sm text-neutral-500 dark:text-neutral-400"
                      as="p"
                    >
                      <li className="flex items-center">
                        <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span
                          className={`text-sm ${
                            item.includes("Everything in")
                              ? "text-primary-6000 font-semibold"
                              : "text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    </Disclosure.Panel>
                  ))}
                </>

              ) : null}
            </>
          )}
        </Disclosure>
        <div className="flex flex-col mt-8">
          <ButtonPrimary onClick={(e) => flutterwaveFlow(e)}>
            Signup
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-YearlySubscriptions container pb-24 lg:pb-32 ${className}`}
      data-nc-id="YearlySubscriptions"
    >
      <Helmet>
        <title>Affordable Yearly Plans</title>

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
          content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png"
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
          content="https://res.cloudinary.com/newlink/image/upload/v1686527321/samples/Screenshot_159_igtnfd.png"
        />
      </Helmet>
      <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
        <div className="pl-0 pr-0 xl:pl-96 xl:pr-96 md:pl-16 md:pr-16">
          {pricingList.map((pricing, index) => {
            return renderPricingItem(pricing, index);
          })}
        </div>
      </section>
    </div>
  );
};

export default YearlySubscriptions;