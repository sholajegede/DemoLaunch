// @ts-nocheck
import React, { FC, useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import NcModal from "shared/NcModal/NcModal";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import InfluencerProfile from "./InfluencerDetails/InfluencerProfile";

export interface EditRateCardProps {
  className?: string;
}

export interface UserItem {
  name: string;
}

const build: UserItem[] = [
  {
    name: "Build Rate Card",
  },
];

const preview: UserItem[] = [
  {
    name: "Preview Rate Card",
  },
];

const live: UserItem[] = [
  {
    name: "Live Rate Card",
  },
];

const EditRateCard: FC<EditRateCardProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const history = useHistory();

  const [selectedUser, setSelectedUser] = useState("build");

  const [tabActive, setTabActive] = React.useState("Build");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const handleBioLogic = () => {
    history.push("/general-info");
    localStorage.setItem("previousLocation", "card");
  };

  const handleDeliverableLogic = () => {
    history.push("/edit-deliverables");
    localStorage.setItem("previousLocation", "card");
  };

  const renderBuild = () => {
    return (
      <div className="mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3">
          <div className="max-w-sm">
            <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                Profile
              </h5>

              <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                Add your bio, image, username, and display name.
              </p>
              <ButtonPrimary
                onClick={handleBioLogic}
                sizeClass="px-5 py-2"
                type="button"
              >
                Edit
              </ButtonPrimary>
            </div>
          </div>

          <div className="max-w-sm">
            <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                Deliverables
              </h5>

              <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                Add deliverables, edit or delete existing deliverables.
              </p>
              <ButtonPrimary
                onClick={handleDeliverableLogic}
                sizeClass="px-5 py-2"
                type="button"
              >
                Edit
              </ButtonPrimary>
            </div>
          </div>

          <div className="max-w-sm">
            <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                Samples
              </h5>

              <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                Add new samples, edit or delete existing ones.
              </p>
              <Link to={"/videos"}>
                <ButtonPrimary sizeClass="px-5 py-2" type="button">
                  Edit
                </ButtonPrimary>
              </Link>
            </div>
          </div>

          <div className="max-w-sm">
            <div className="max-w-sm p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>

              <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                Socials
              </h5>

              <p className="mb-8 font-normal text-gray-500 dark:text-gray-400">
                Add or change the socials connected to your rate card.
              </p>
              <Link to={"/socials"}>
                <ButtonPrimary sizeClass="px-5 py-2" type="button">
                  Edit
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return <InfluencerProfile username={influencer.username} />;
  };

  const renderLive = () => {
    return history.push(`/book/${influencer.username}`);
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
            <span>Close</span>''
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-EditRateCard ${className}`} data-nc-id="EditRateCard">
      <Helmet>
        <title>Rate Card</title>
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Rate Card
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

            <span className="text-sm">How to build your Rate Card</span>
          </p>

          <Tab.Group>
            <Tab.List className="flex mt-4 mb-2 space-x-0 overflow-x-auto sm:space-x-2">
              <Nav
                className="flex-shrink-0 p-1 rounded-full shadow-lg text-neutral-50 dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-100"
                containerClassName="mb-2 text-sm md:text-base"
              >
                {[
                  {
                    name: "Build",
                    user: "build",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    `,
                  },
                  {
                    name: "Preview",
                    user: "preview",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    `,
                  },
                  {
                    name: "Live Card",
                    user: "live",
                    linkUrl: `getcollabo.io/book/${influencer.username}`,
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    `,
                  },
                ].map((item, index) => (
                  <NavItem2
                    key={index}
                    isActive={tabActive === item.name}
                    onClick={() => {
                      setTabActive(item.name);
                      handleUserSelection(item.user);
                    }}
                  >
                    <div className="text-neutral-50 dark:text-neutral-900 sm:space-x-2.5 text-sm">
                      <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm ">
                        <span
                          className="inline-block mr-1 xl:mr-0 sm:mr-0 lg:mr-0 md:mr-0"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        ></span>
                        {item.user === "live" ? (
                          <span title={item.linkUrl}>{item.name}</span>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </div>
                    </div>
                  </NavItem2>
                ))}
              </Nav>
            </Tab.List>
          </Tab.Group>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="mt-2">
            {selectedUser === "build"
              ? build.map((item, index) => renderBuild(item, index))
              : selectedUser === "preview"
              ? renderPreview()
              : renderLive()}
          </div>
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
  );
};

export default EditRateCard;