// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { Link, useHistory } from "react-router-dom";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { AiOutlineFieldTime } from "react-icons/ai";

export interface InfluencerDeliverablesProps {
  className?: string;
}

const InfluencerDeliverables: FC<InfluencerDeliverablesProps> = ({
  className = "",
}) => {
  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const { influencer } = useContext(InfluencerAuthContext);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const history = useHistory();

  //
  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);
  //

  const handleCreateLogic = async () => {
    history.push("/edit-deliverables");
    localStorage.setItem("previousLocation", `/deliverables`);
  };

  const renderDemoContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowDemoModal(false);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <span>Close</span>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-InfluencerDeliverables  ${className}`}
          data-nc-id="InfluencerDeliverables"
        >
          <Helmet>
            <title>Deliverables</title>
          </Helmet>

          <div className="py-16 mt-4 mb-24 space-y-16 sm:mb-0 xl:mb-0 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Deliverables
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                </div>
              </Tab.Group>
              <p
                onClick={() => setShowDemoModal(true)}
                className="inline-flex mt-4 text-primary-6000"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>

                <span className="text-sm">Take a tour of Deliverables</span>
              </p>
              <section className="p-3 mt-4 border-2 border-gray-200 border-dashed rounded-lg xl:mb-0 sm:mb-1.5 mb-28 dark:border-gray-700 bg-white dark:bg-gray-900 sm:p-5">
                <div className="w-full">
                  <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <ButtonPrimary
                      sizeClass="py-2 px-8"
                      onClick={handleCreateLogic}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>

                      <span className="text-sm font-normal">
                        Create/Edit deliverables
                      </span>
                    </ButtonPrimary>
                  </div>
                  <div className="mt-6 space-y-3 text-sm">
                    {!Array.isArray(influencerProfile.deliverable) ? (
                      `Hi ${influencer.username}, you have no deliverables available.`
                    ) : influencerProfile.deliverable &&
                      influencerProfile.deliverable.length > 0 ? (
                      influencerProfile.deliverable.map(
                        (item) =>
                          item._id &&
                          item.description &&
                          item.rate &&
                          item.deliveryTime && (
                            <>
                              <div
                                key={item._id}
                                className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 bg-gray-50 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                              >
                                <div className="flex items-center w-full">
                                  <div className="inline-grid text-xs font-normal sm:ml-8 sm:text-sm">
                                    <div>{item.description}</div>
                                    <div className="inline mt-2">
                                      <span className="mt-2 text-green-500">
                                        NGN
                                      </span>{" "}
                                      <span className="">
                                        {item.rate.toLocaleString()}
                                      </span>
                                      {" - "}
                                      <span className="inline-flex">
                                        {item.deliveryTime} delivery{" "}
                                        <AiOutlineFieldTime className="w-4 h-4 ml-1" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Link
                                  to={`/view/${influencerProfile.username}/${item._id}`}
                                >
                                  <ButtonSecondary sizeClass="py-2 px-5">
                                    <span className="mr-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                    </span>
                                    <span className="text-sm">View</span>
                                  </ButtonSecondary>
                                </Link>
                              </div>
                            </>
                          )
                      )
                    ) : (
                      <p>
                        Hi{" "}
                        <span className="capitalize">
                          {influencer.username}
                        </span>
                        , you have no deliverables available.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </main>
          </div>

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showDemoModal}
            renderContent={renderDemoContent}
            contentExtraClass="max-w-2xl"
            onCloseModal={() => setShowDemoModal(false)}
            modalTitle=""
          />
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </div>
  );
};

export default InfluencerDeliverables;