// @ts-nocheck
import React, { FC, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Tab } from "@headlessui/react";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import "react-toastify/dist/ReactToastify.css";
import Login from "containers/Onboard/Login";
import { Link, useHistory } from "react-router-dom";
import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "utils/newRequest";

export interface ConnectedProfilesProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const ConnectedProfiles: FC<ConnectedProfilesProps> = ({ className = "" }) => {
  const [credentials, setCredentials] = useState({
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
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "REGISTRATION_START" });

    try {
      const updateInfluencer = {
        ...credentials,
      };

      const res = await newRequest.put(
        `/influencer/${influencer._id}`,
        updateInfluencer
      );
      authDispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setLoading(false);
      setCredentials(null);
      toast.success("👍 Social profiles updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history.push("/socials");
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

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-ConnectedProfiles ${className}`}
          data-nc-id="ConnectedProfiles"
        >
          <Helmet>
            <title>Social Profiles</title>
          </Helmet>
          <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Socials
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                </div>
              </Tab.Group>
              <span className="block mt-5 mb-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                Connect or update your social accounts to your profile
              </span>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(e);
                  }
                }}
              >
                <div className="mt-8 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                  <div>
                    <div className="gap-2.5 sm:gap-2.5">
                      {/* ---- */}
                      <h2 className="mt-6 mb-4 text-2xl font-semibold">
                        Connected socials
                      </h2>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-2.5">
                        {influencer.tiktokUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <SiTiktok className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`tiktok.com/@${influencer.tiktokUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}

                        {influencer.instagramUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <RiInstagramFill className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`instagram.com/${influencer.instagramUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}
                        {influencer.youtubeUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <RiYoutubeFill className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`youtube.com/@/${influencer.youtubeUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}
                        {influencer.twitterUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <RiTwitterFill className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`twitter.com/${influencer.twitterUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}

                        {influencer.linkedinUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <FaLinkedin className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`linkedin.com/in/${influencer.linkedinUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}
                        {influencer.facebookUsername && (
                          <FormItem>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                <FaFacebookF className="w-4 h-4" />
                              </span>
                              <Input
                                disabled
                                className="!rounded-l-none"
                                placeholder={`facebook.com/${influencer.facebookUsername}`}
                              />
                            </div>
                          </FormItem>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  <div>
                    <h3 className="text-lg font-semibold sm:text-2xl">
                      Add Socials
                    </h3>
                    <span className="text-xs">
                      Add your social media usernames/handles for each platform.
                    </span>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-2.5">
                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <SiTiktok className="w-4 h-4" />
                          </span>
                          <Input
                            id="tiktokUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiInstagramFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="instagramUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiYoutubeFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="youtubeUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiTwitterFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="twitterUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <FaFacebookF className="w-4 h-4" />
                          </span>
                          <Input
                            id="facebookUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <FaLinkedin className="w-4 h-4" />
                          </span>
                          <Input
                            id="linkedinUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>
                    </div>
                  </div>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  {/* ---- */}

                  <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="flex-1"
                      disabled={loading}
                      type="button"
                      onClick={handleSignUp}
                    >
                      {loading ? "Updating..." : "Update socials"}
                    </ButtonPrimary>
                    <Link
                      to={"/card"}
                      className="relative inline-flex items-center justify-center flex-1 h-auto px-4 py-3 text-sm font-medium transition-colors bg-white border rounded-full disabled:bg-opacity-70 sm:text-base sm:px-6 border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Back
                    </Link>
                    <ToastContainer className="text-sm" />
                  </div>

                  {loading && (
                    <div className="flex items-center mt-2">
                      <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                      <span className="ml-2 text-sm">
                        Updating your socials...give us a few seconds.
                      </span>
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ConnectedProfiles;