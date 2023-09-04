// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useLocation, useHistory } from "react-router-dom";
import newRequest from "utils/newRequest";
import { AuthContext } from "context/AuthContext";
import { BrandProfileData } from "routers/types";
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
  "/view/:businessName/:deliverableId",
  "/preview/:invoiceId",
  "/invoiceNew/:deliverableId",
  "/socials",
  "/videos",
  "/submit/:businessName/:indexId",
  "/subscription",
  "/chatInvoice/:businessName",
];

const BannerBrand: React.FC = () => {
  const { brand } = useContext(AuthContext);
  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const navFeatures = [
    {
      features: [brandProfile.logo ? "" : "Brand Logo"],
      icon: [brandProfile.logo ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      features: [brandProfile.desc ? "" : "About"],
      icon: [brandProfile.desc ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      features: [brandProfile.industry ? "" : "Industry"],
      icon: [brandProfile.industry ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
    {
      features: [brandProfile.businessName ? "" : "Business Name"],
      icon: [brandProfile.businessName ? "" : <CheckIcon className="w-5 h-5" aria-hidden="true" />],
    },
  ];

  useEffect(() => {
    const isAllowedRoute = allowedRoutes.includes(location.pathname);

    if (brand?._id || isAllowedRoute) {
      const fetchProfile = async () => {
        const response = await newRequest.get(`/brand/${brand?._id}`);
        setBrandProfile(response.data);

        const isProfileIncomplete =
          !response.data?.businessName ||
          !response.data?.industry ||
          !response.data?.logo ||
          !response.data?.desc;

        if (isProfileIncomplete) {
          const popupTimeout = setTimeout(() => {
            setShowPopup(true);
          }, 300000);

          return () => clearTimeout(popupTimeout);
        }
      };
      fetchProfile();
    }
  }, [brand, location.pathname]);

  const handleCompleteProfile = () => {
    setShowPopup(false);

    localStorage.setItem("previousLocation", location.pathname);

    const profileCompletionLink = `/update/${brand?._id}`;
    history.push(profileCompletionLink);
  };

  const renderPopupContent = () => {
    return (
      <div>
        <p className="mt-1 text-sm sm:text-base lg:text-base">
          Hey{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {brandProfile.businessName}!
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
            ? navFeatures.map((item, index) => (
                <li className="flex items-center" key={index}>
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

export default BannerBrand;