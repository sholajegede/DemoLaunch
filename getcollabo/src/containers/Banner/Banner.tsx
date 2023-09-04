// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useLocation, useHistory } from "react-router-dom";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { InfluencerProfileData } from "routers/types";
import NcModal from "shared/NcModal/NcModal";
import { CheckIcon } from "@heroicons/react/solid";

const allowedRoutes = [
  "/dashboard",
  "/invoices",
  "/support",
  "/chat",
  "/card",
  "/payments",
  "/settings",
  "/proposals",
  "/contracts",
  "/deliverables",
  "/tasks",
  "/edit-deliverables",
  "/invoice",
  "/edit-bank",
  "/general-info",
  "/password-update",
  "/edit-card",
  "/preview-card",
  "/view/:username/:deliverableId",
  "/preview/:invoiceId",
  "/invoiceNew/:deliverableId",
  "/socials",
  "/videos",
  "/submit/:username/:indexId",
  "/subscription",
  "/chatInvoice/:businessName",
];

const Banner: React.FC = () => {
  const { influencer } = useContext(InfluencerAuthContext);
  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const navFeatures = [
    {
      id: 1,
      features: [influencerProfile.img ? "" : "Profile Image"],
      icon: [influencerProfile.img ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      id: 2,
      features: [influencerProfile.about ? "" : "Bio"],
      icon: [influencerProfile.about ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      id: 3,
      features: [influencerProfile.industry ? "" : "Industry"],
      icon: [influencerProfile.industry ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      id: 4,
      features: [influencerProfile.username ? "" : "Username"],
      icon: [influencerProfile.username ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      id: 5,
      features: [influencerProfile.displayName ? "" : "Display Name"],
      icon: [influencerProfile.displayName ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
  ];

  useEffect(() => {
    const isAllowedRoute = allowedRoutes.includes(location.pathname);

    if (influencer?._id || isAllowedRoute) {
      const fetchProfile = async () => {
        const response = await newRequest.get(
          `/influencer/find/${influencer?._id}`
        );
        setInfluencerProfile(response.data);

        const isProfileIncomplete =
          !response.data?.displayName ||
          !response.data?.username ||
          !response.data?.industry ||
          !response.data?.img ||
          !response.data?.about;

        if (isProfileIncomplete) {
          const popupTimeout = setTimeout(() => {
            setShowPopup(true);
          }, 300000);

          return () => clearTimeout(popupTimeout);
        }
      };
      fetchProfile();
    }
  }, [influencer, location.pathname]);

  const handleCompleteProfile = () => {
    setShowPopup(false);

    localStorage.setItem("previousLocation", location.pathname);

    const profileCompletionLink = "/general-info";
    history.push(profileCompletionLink);
  };

  const renderPopupContent = () => {
    return (
      <div>
        <p className="mt-1 text-sm sm:text-base lg:text-base">
          Hey{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {influencerProfile.username}!
          </span>
          👋
        </p>
        <p className="mt-4 mb-3 text-sm sm:text-base lg:text-base">
          Please complete your profile to enjoy all features on GetCollabo.🚀
        </p>
        <p className="mt-2 mb-8 text-sm sm:text-base lg:text-base">
          You need to update your:
        </p>
        <nav className="mt-5 mb-5 space-y-4">
          {navFeatures && navFeatures.length > 0
            ? navFeatures.map((item) => (
                <li className="flex items-center" key={item.id}>
                  <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                    {item.icon}
                  </span>
                  <span className="text-sm sm:text-base lg:text-base text-neutral-700 dark:text-neutral-300">
                    {item.features.map((feature, featureIndex) => (
                      <span key={featureIndex}>{feature}</span>
                    ))}
                  </span>
                </li>
              ))
            : null}
        </nav>
        <ButtonPrimary
          sizeClass="px-4 py-2 sm:px-5"
          onClick={handleCompleteProfile}
        >
          Complete Profile
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <NcModal
      renderTrigger={() => null}
      isOpenProp={showPopup}
      renderContent={renderPopupContent}
      contentExtraClass="max-w-md"
      onCloseModal={() => setShowPopup(false)}
      modalTitle="⚠️ Profile Incomplete"
    />
  );
};

export default Banner;