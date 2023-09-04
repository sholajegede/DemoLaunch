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

export interface CreateTaskProps {
  className?: string;
}

const CreateTask: FC<CreateTaskProps> = ({
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
          className={`nc-CreateTask  ${className}`}
          data-nc-id="CreateTask"
        >
          <Helmet>
            <title>Task Manager</title>
          </Helmet>

          <div className="py-16 mt-4 mb-24 space-y-16 sm:mb-0 xl:mb-0 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Task Manager
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                </div>
              </Tab.Group>
              <p
                onClick={() => setShowDemoModal(true)}
                className="inline-flex mt-4 mb-6 text-primary-6000"
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

                <span className="text-sm">Take a tour of Task Manager</span>
              </p>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <section className="p-3 mt-4 border-2 border-gray-200 border-dashed rounded-lg xl:mb-0 sm:mb-1.5 mb-28 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sm:p-5">
                <div className="w-full">
                  Write tasks here
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

export default CreateTask;