import { useEffect, useContext } from "react";
import { Crisp } from "crisp-sdk-web";
import { AuthContext } from "context/AuthContext";

export const CrispChatBrand = () => {
  const { brand } = useContext(AuthContext);

  const headerBrand = brand?.businessName
    ? brand?.businessName.charAt(0).toUpperCase() + brand?.businessName.slice(1).toLowerCase()
    : "Brand Business Name";

  useEffect(() => {
    Crisp.configure("a8f4c160-0bb7-4f93-92ba-5d7658bf32a0");

    Crisp.user.setEmail(brand?.email);
    Crisp.user.setNickname(headerBrand);
    Crisp.user.setAvatar(brand?.logo);

    Crisp.session.setData({
      user_id: brand?._id,
    });
  }, []);

  return null;
};