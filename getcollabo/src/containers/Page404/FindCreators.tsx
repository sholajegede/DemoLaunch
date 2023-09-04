// @ts-nocheck
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import Creators from "images/findCreator.png";
import Input from "shared/Input/Input";
import newRequest from "utils/newRequest";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FindCreators: React.FC = () => {
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

  const handleButtonClick = async (e) => {
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
    <div className="nc-FindCreators">
      <Helmet>
        <title>Find your Favorite Creator</title>
      </Helmet>
      <div className="container flex justify-center max-w-3xl mt-20 mb-10 text-center sm:max-w-2xl lg:max-w-4xl xl:max-w-4xl md:max-w-2xl">
        <section>
          <span className="text-xl font-semibold sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-neutral-800 dark:text-neutral-200">
            Hey👋! Find and collaborate with your favorite creators on
            GetCollabo
          </span>
          <div className="mt-12 mb-4">
            <div>
              <form onSubmit={handleSubmit} className="mt-1.5 flex relative">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </span>
                <Input
                  type="search"
                  placeholder="Type in their username"
                  className="!rounded-l-none"
                  sizeClass="h-[50px]"
                  name="search"
                  value={searchValue}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="absolute inset-y-0 right-0 z-10 flex items-center px-3 text-white border-2 bg-primary-6000 dark:bg-primary-6000 border-primary-6000 rounded-2xl focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 m-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <p title="Search" className="text-sm">
                    Search
                  </p>
                </button>
              </form>
            </div>
          </div>
          <NcImage src={Creators} />
        </section>
        <ToastContainer className="text-sm" />
      </div>
    </div>
  );
};

export default FindCreators;