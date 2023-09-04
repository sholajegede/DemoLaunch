import React, { useContext } from "react";
import { CrispChat } from "./CrispChat";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

export const CrispProvider = () => {
  const { influencer } = useContext(InfluencerAuthContext);

  return influencer?._id ? <CrispChat /> : null;
};