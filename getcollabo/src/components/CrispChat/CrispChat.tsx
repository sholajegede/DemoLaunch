import React, { useEffect, useContext } from "react";
import { Crisp } from "crisp-sdk-web";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

export const CrispChat = () => {
  const { influencer } = useContext(InfluencerAuthContext);

  useEffect(() => {
    Crisp.configure("a8f4c160-0bb7-4f93-92ba-5d7658bf32a0");

    if (influencer) {
      Crisp.user.setEmail(influencer.email);
      Crisp.user.setNickname(influencer.username);
      Crisp.user.setAvatar(influencer.img);
      Crisp.session.setData({
        user_id: influencer._id,
      });
    }
    
    return () => {
      Crisp.session.reset();
    };
  }, [influencer]);

  return null;
};
