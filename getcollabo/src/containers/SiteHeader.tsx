import React, { useContext } from "react";
import HeaderLogged from "components/Header/HeaderLogged";
import HeaderLoggedInfluencer from "components/Header/HeaderLoggedInfluencer";
import Header2 from "components/Header/Header2";
import { AuthContext } from "context/AuthContext";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { useLocation } from "react-router-dom";

const SiteHeader = () => {
  const { brand } = useContext(AuthContext);
  const { influencer } = useContext(InfluencerAuthContext);

  const location = useLocation();

  const isChatPage = (() => {
    const chatRoutes = [
      "/payment-notification",
      //
      "/dashboard",
      "/welcome",
      "/invoices",
      "/support",
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
      "/subscription",
      "/submit/:username/:indexId",
      "/chatInvoice/:businessName",
      "/change-plan",
      "/edit-contract",
      "/convo/:chatId",
      "/message/:chatId",
    ];

    const currentPath = decodeURIComponent(location.pathname); // Decode the URL to handle encoded characters like %20

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
          continue; // Skip parameter segments
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
    return null;
  }

  return (
    <div>
      {brand ? (
        <HeaderLogged firstProp={brand} />
      ) : influencer ? (
        <HeaderLoggedInfluencer influencerProp={influencer} />
      ) : (
        <Header2 />
      )}
    </div>
  );
};

export default SiteHeader;