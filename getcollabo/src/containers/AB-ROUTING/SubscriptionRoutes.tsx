// @ts-nocheck
import React, { FC, useContext, useState, useEffect } from "react";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { InfluencerProfileData } from "routers/types";
import { useHistory, useLocation } from "react-router-dom";

export interface SubscriptionRoutesProps {
  className?: string;
}

const SubscriptionRoutes: FC<SubscriptionRoutesProps> = ({
  className = "",
}) => {
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

  const paystackPlanStatus = paystackCustomerSub?.data?.data?.status;

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

  const history = useHistory();

  //SUBSCRIPTION ROUTES
  const location = useLocation();

  if (!paystackPlan === "Upgrade Plan - Yearly" || !paystackPlanStatus === "active") {
    const isChatPage = (() => {
      const chatRoutes = [
        "/proposals",
        "/contracts",
        "/chat",
        "/edit-contract",
        "/convo/:chatId",
      ];

      const currentPath = decodeURIComponent(location.pathname);

      const isChatRoute = chatRoutes.some((route) => {
        const routeSegments = route.split("/");
        const currentSegments = currentPath.split("/");

        if (routeSegments.length !== currentSegments.length) {
          return false;
        }

        for (let i = 0; i < routeSegments.length; i++) {
          const routeSegment = routeSegments[i];
          const currentSegment = currentSegments[i];

          if (routeSegment.startsWith(":")) {
            continue;
          }

          if (routeSegment !== currentSegment) {
            return false;
          }
        }

        return true;
      });

      return isChatRoute;
    })();

    if (isChatPage) {
      history.push("/change-plan");
    }
  }
};

export default SubscriptionRoutes;