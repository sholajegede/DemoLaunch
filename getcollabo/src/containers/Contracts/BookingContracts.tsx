// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
import FormItem from "components/FormItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import { FaRobot } from "react-icons/fa";
import Badge from "shared/Badge/Badge";

const BookingContracts: React.FC = () => {
  const viewer = useRef<HTMLDivElement>(null);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const [showBotModal, setShowBotModal] = useState(false);

  useEffect(() => {
    WebViewer(
      {
        path: "/lib",
        licenseKey:
          "demo:1690583705120:7c4810240300000000a5d7540f4929b69658a0a44b0d82d3531d945f72",
        preloadWorker: WebViewer.WorkerTypes.CONTENT_EDIT,
        initialDoc: "",
        extension: ["pdf"],

        disabledElements: [
          "toolbarGroup-Shapes",
          "toolbarGroup-Edit",
          "toolbarGroup-Insert",
          "toolbarGroup-Annotate",
          "toolbarGroup-Forms",
          "notesPanel",
          "viewControlsButton",
          "selectToolButton",
          "toggleNotesButton",
          "searchButton",
          "freeTextToolGroupButton",
          "crossStampToolButton",
          "checkStampToolButton",
          "dotStampToolButton",
          "rubberStampToolGroupButton",
          "dateFreeTextToolButton",
          "eraserToolButton",
          "panToolButton",
          "viewControlsOverlay",
        ],
      },
      viewer.current
    ).then((instance) => {
      document.getElementById("select")!.onchange = (e) => {
        instance.UI.loadDocument(e.target.value);
      };

      document.getElementById("file-picker")!.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          instance.UI.loadDocument(file);
        }
      };

      instance.UI.setLanguage("en");

      instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);
    });
  }, []);

  const [selectedContract, setSelectedContract] = useState({
    info: "",
  });

  const handleContractSelect = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedInfo = selectedOption.getAttribute("info");
    setSelectedContract({ info: selectedInfo });
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

  const renderBotContent = () => {
    return (
      <div className="ml-1 mr-1">
        <div className="flex items-center justify-center">
          <FaRobot size={60} className="mb-2 fill-primary-6000" />
        </div>
        <span className="text-base">
          Your personal AI lawyer at your fingertips. Get expert legal help on
          collaborations anytime, anywhere.
        </span>

        <div className="mt-4">
          <Badge
            className="px-6 py-2 text-center rounded"
            color="green"
            name="Coming soon"
          />
        </div>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowBotModal(false);
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
    <div className={`nc-ViewContract`} data-nc-id="ViewContract">
      <Helmet>
        <title>Booking Contracts</title>
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Booking Contracts
                    </div>
                  )}
                </Tab>
                <div className="absolute z-20 right-4">
                  <ButtonSecondary
                    sizeClass="py-2 px-5"
                    onClick={() => setShowBotModal(true)}
                  >
                    <FaRobot
                      size={22}
                      className="mr-2 fill-primary-6000 animate-pulse"
                    />{" "}
                    Talk to Wale
                  </ButtonSecondary>
                </div>
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

            <span className="text-sm">Take a tour of Booking Contracts</span>
          </p>

          <p className="mt-4 mb-2 font-normal text-gray-500 dark:text-gray-400">
            Easily sign, edit, save, and download booking contracts. [Feature to attach contracts to invoices or deliverables coming soon.]
          </p>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="mt-8 mb-8">
            <div className="grid sm:grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-2 xl:grid-cols-2">
              <div className="">
                <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <FormItem
                    label="
                   
                   Use a template"
                  >
                    <select
                      id="select"
                      style={{ width: "100%" }}
                      className="block w-full px-4 py-3 text-sm font-normal capitalize bg-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl"
                      onChange={handleContractSelect}
                    >
                      <option>Select</option>
                      <option
                        value=""
                        info="This contract is between a creator (the “Creator/Influencer”) and a brand (the “Brand/Business”) for product/service promotion to their audience. It outlines booking terms, deliverables, compensation, and expectations of both parties."
                      >
                        Simple Booking Contract
                      </option>
                      <option
                        value="https://getcollabo.s3.amazonaws.com/contracts/BRAND+AMBASSADOR+CONTRACT.pdf"
                        info="This contract is perfect for creators of all niches looking to offer their services to any brand. This Agreement covers appearances, promotions, travel, etc."
                      >
                        Brand Ambassador Contract
                      </option>
                      <option
                        value="https://getcollabo.s3.amazonaws.com/contracts/CONTENT+COLLABORATION+CONTRACT.pdf"
                        info="This contract outlines the terms and conditions between two parties (Brand & Creator / Creator & Creator) who wish to collaborate on the creation and distribution of content. This agreement establishes the rights, responsibilities, and expectations of each party involved in the collaboration."
                      >
                        Content Collaboration Contract
                      </option>
                      <option
                        value=""
                        info="This contract outlines terms between a business (Talent) and an Editor for managing social media content. It defines roles and expectations for an effective online presence."
                      >
                        Content Editor Contract
                      </option>
                      <option
                        value="https://getcollabo.s3.amazonaws.com/contracts/THREE-PARTY+COLLABORATION+CONTRACT.pdf"
                        info="The Three-Party Content Collaboration Agreement outlines terms and conditions for a collaboration between three Creators."
                      >
                        Three-Party Collaboration Contract
                      </option>
                      <option
                        value="https://getcollabo.s3.amazonaws.com/contracts/UGC-SPECIFIC+CONTRACT+AGREEMENT.pdf"
                        info="This contract outlines the terms and conditions of the collaboration between a UGC creator and the brand or platform, ensuring that both parties are clear about their rights, responsibilities, and compensation."
                      >
                        UGC-Specific Booking Contract
                      </option>
                    </select>
                  </FormItem>
                  {selectedContract && (
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {selectedContract.info}
                    </p>
                  )}
                </div>
              </div>

              <div className="">
                <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                  <FormItem label="Upload yours">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-picker"
                        className="flex flex-col items-center justify-center w-full bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-30 dark:hover:bg-bray-800 dark:bg-neutral-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PDF, DOC, PNG, or JPG (MAX. 20MB)
                          </p>
                        </div>
                        <input
                          className="hidden"
                          id="file-picker"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                        />
                      </label>
                    </div>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>

          <span className="block max-w-2xl mt-4 mb-2 text-sm text-neutral-500 dark:text-neutral-400"></span>
          <div
            className="webviewer"
            ref={viewer}
            style={{ height: "100vh" }}
          ></div>
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

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showBotModal}
        renderContent={renderBotContent}
        contentExtraClass="max-w-2xl"
        onCloseModal={() => setShowBotModal(false)}
        modalTitle="Say Hi to Wale"
      />
    </div>
  );
};

export default BookingContracts;