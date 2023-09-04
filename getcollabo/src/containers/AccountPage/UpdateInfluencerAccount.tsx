// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import { useHistory } from "react-router-dom";
import upload from "utils/upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfluencerLoggedOut from "containers/PageLoggedOut/InfluencerLogin";
import { Link } from "react-router-dom";
import { InfluencerProfileData } from "routers/types";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface UpdateInfluencerAccountProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const UpdateInfluencerAccount: FC<UpdateInfluencerAccountProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [file, setFile] = useState(null);
  const [credentials, setCredentials] = useState({
    email: undefined,
    displayName: undefined,
    username: undefined,
    about: undefined,
    industry: undefined,
    otherInterests: undefined,
    tiktokUsername: undefined,
    instagramUsername: undefined,
    twitterUsername: undefined,
    youtubeUsername: undefined,
    facebookUsername: undefined,
    linkedinUsername: undefined,
  });
  const [error, setError] = useState(null);

  const { dispatch: authDispatch, influencer } = useContext(
    InfluencerAuthContext
  ); // rename dispatch to authDispatch

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer?._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size; // in bytes
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (fileSize > maxSize) {
      setErrorMessage("File size exceeds 10MB limit.");
      event.target.value = null; // reset input value
      setFile(null);
    } else {
      setFile(file);
      setErrorMessage("");
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    const onlyLetters = /^[A-Za-z]+$/;

    if (!input.match(onlyLetters)) {
      // Remove any non-letter characters
      e.target.value = input.replace(/[^A-Za-z]/g, "");
    }

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.id]: e.target.value,
    }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "UPDATE_START" });
    const url = await upload(file);

    try {
      const updateInfluencer = {
        ...credentials,
        img: url,
      };

      const res = await newRequest.put(
        `/influencer/${influencer._id}`,
        updateInfluencer
      );
      authDispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setLoading(false);
      toast.success("👍 Account updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const previousLocation = localStorage.getItem("previousLocation");

      if (previousLocation) {
        localStorage.removeItem("previousLocation"); 
        history.push(previousLocation);
      } else {
        history.push("/settings");
      }
    } catch (error) {
      authDispatch({
        type: "UPDATE_FAILURE",
        payload: error.response.data,
      });
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setError(error.message);
        toast.error(error.message, {
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
    }
  };

  const handleBackLogic = () => {
    const previousLocation = localStorage.getItem("previousLocation");

    if (previousLocation) {
      localStorage.removeItem("previousLocation"); 
      history.push(previousLocation);
    } else {
      history.push("/settings");
    }
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-UpdateInfluencerAccount ${className}`}
          data-nc-id="UpdateInfluencerAccount"
        >
          <Helmet>
            <title>Edit General Info</title>
          </Helmet>
            <div className="pt-20 mt-4 lg:pt-20">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Update Profile
                </h2>
                <span className="block mt-4 mb-2 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  Change your email, profile image, display name, username, industry or
                  bio.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(e);
                  }
                }}
              >
                <div className="mt-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
                  {/* ---- */}

                  <FormItem label="Email Address">
                    <Input
                      id="email"
                      placeholder={influencer.email}
                      onChange={handleChange}
                    />
                  </FormItem>

                  <div>
                    <h3 className="text-base font-medium sm:text-base">
                      Upload Image
                    </h3>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      All image file types supported
                    </span>
                    <div className="mt-2">
                      <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
                        <div className="relative flex items-center justify-center w-32 h-32 overflow-hidden rounded-2xl">
                          <img
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : `${influencer.img}`
                            }
                            alt="Uploaded image"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="mt-1 text-xs">Upload Image</span>
                            <p className="mt-1 text-xs">Max size: 10MB</p>
                          </div>
                          <input
                            type="file"
                            id="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onInput={handleFileInputChange}
                          />
                        </div>
                      </div>
                      {errorMessage && (
                        <p className="mt-1 text-xs text-red-500">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ---- */}
                  <FormItem label="Display Name">
                    <Input
                      placeholder={influencer.displayName}
                      id="displayName"
                      onChange={handleChange}
                    />
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Username"
                    desc={
                      <div>
                        Only letters can be entered
                      </div>
                    }
                  >
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        getcollabo.io/book/
                      </span>
                      <Input
                        id="username"
                        onChange={handleUsernameChange}
                        className="!rounded-l-none"
                        type="text"
                        placeholder={influencer.username}
                      />
                    </div>
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Bio"
                    desc={
                      <div>
                        Write a bit about yourself here.{" "}
                        <span className="text-green-500">Be original</span>
                      </div>
                    }
                  >
                    <Textarea
                      id="about"
                      onChange={handleChange}
                      rows={6}
                      className="mt-1.5"
                      placeholder={influencer.about}
                    />
                  </FormItem>

                  {/* ---- */}
                  <FormItem label="Industry">
                    <select
                      id="industry"
                      className={`capitalize block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                      onChange={handleChange}
                    >
                      <option defaultValue>{influencer.industry}</option>
                      <option value="art">Art</option>
                      <option value="beauty">Beauty</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="business">Business</option>
                      <option value="dance">Dance</option>
                      <option value="fashion">Fashion</option>
                      <option value="finance">Finance</option>
                      <option value="food">Food</option>
                      <option value="gaming">Gaming</option>
                      <option value="health">Health</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="music">Music</option>
                      <option value="photography">Photography</option>
                      <option value="real estate">Real Estate</option>
                      <option value="skits">Skits</option>
                      <option value="storytelling">Storytelling</option>
                      <option value="sports">Sports</option>
                      <option value="tech">Tech</option>
                      <option value="travel">Travel</option>
                    </select>
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Other Industries/Interests"
                    desc={
                      <div>
                        Type in other industries/interests that's not on the
                        list [
                        <span className="text-green-500">Please include a comma after each one</span>]
                      </div>
                    }
                  >
                    <Input
                      id="otherInterests"
                      placeholder={influencer.otherInterests}
                      onChange={handleChange}
                    />
                  </FormItem>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  <div className="">
                    <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <ButtonPrimary
                        className="flex-1"
                        disabled={loading}
                        type="button"
                        onClick={handleUpdate}
                      >
                        {loading ? "Updating your profile..." : "Update profile"}
                      </ButtonPrimary>
                      <ButtonSecondary className="flex-1" onClick={handleBackLogic}>
                        Back
                      </ButtonSecondary>
                      <ToastContainer className="text-sm" />
                    </div>

                    {loading && (
                      <div className="flex items-center mt-2">
                        <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                        <span className="ml-2 text-sm">
                          Updating your awesome profile...give us a few seconds.
                        </span>
                      </div>
                    )}

                    {error && (
                      <p className="mt-4 text-sm text-center text-red-500">{error}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
      ) : (
        <InfluencerLoggedOut />
      )}
    </div>
  );
};

export default UpdateInfluencerAccount;