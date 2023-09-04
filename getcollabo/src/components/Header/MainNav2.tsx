// @ts-nocheck
import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Navigation from "shared/Navigation/Navigation";
import { useHistory } from "react-router-dom";
import newRequest from "utils/newRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface MainNav2Props {}

const MainNav2: FC<MainNav2Props> = () => {
  const [searchValue, setSearchValue] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      return toast.error("😢You need to type in a username", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
    const useValue = searchValue.toLowerCase();

    try {
      const res = await newRequest(`/influencer/get/${useValue}`);
      const creator = res.data;

      if (creator) {
        history.push(`/book/${useValue}`);
        setSearchValue("");
      } else {
        history.push(`/share/${useValue}`);
        setSearchValue("");
      }
    } catch (err) {
      console.error("Error fetching influencer:", err);
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        history.push(`/share/${useValue}`);
        setSearchValue("");
      } else {
        console.log(axiosError);
      }
    }
  };

  const handleIconClick = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      return toast.error("😢You need to type in a username", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
    const useValue = searchValue.toLowerCase();

    try {
      const res = await newRequest(`/influencer/get/${useValue}`);
      const creator = res.data;

      if (creator) {
        history.push(`/book/${useValue}`);
        setSearchValue("");
      } else {
        history.push(`/share/${useValue}`);
        setSearchValue("");
      }
    } catch (err) {
      console.error("Error fetching influencer:", err);
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        history.push(`/share/${useValue}`);
        setSearchValue("");
      } else {
        console.log(axiosError);
      }
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`nc-MainNav2 relative z-10 ${"onTop "}`}>
      <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
        <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />

          <div className="flex-grow hidden max-w-xs sm:block">
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="search"
                placeholder="Find your favorite Creator"
                className="w-full pr-10"
                sizeClass="h-[42px] pl-4 py-3"
                name="search"
                value={searchValue}
                onChange={handleChange}
              />
              <span
                onClick={handleIconClick}
                className="absolute -translate-y-1/2 top-1/2 right-3 text-neutral-500"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input type="submit" hidden value="" />
            </form>
          </div>
        </div>
        <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
          <div className="items-center hidden space-x-2 xl:flex">
            <Navigation />
            <div className="hidden h-10 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
            <SwitchDarkMode />
            <ButtonSecondary href={"/login"} sizeClass="px-4 py-2 sm:px-5">
              Login
            </ButtonSecondary>
            <ButtonPrimary href={"/signup"} sizeClass="px-4 py-2 sm:px-5">
              Signup
            </ButtonPrimary>
          </div>
          <div className="flex items-center space-x-1.5 xl:hidden">
            <ButtonPrimary href={"/login"} sizeClass="px-4 py-2 sm:px-5">
              Login
            </ButtonPrimary>
            <MenuBar />
          </div>
        </div>
      </div>
      <ToastContainer className="text-sm" />
    </div>
  );
};

export default MainNav2;