// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { useHistory, useParams } from "react-router-dom";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";
import { BrandProfileData } from "routers/types";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import uploadVideo from "utils/uploadVideo";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";
import { BsCheck2Square } from "react-icons/bs";
import { TiDocumentAdd } from "react-icons/ti";
import Badge from "shared/Badge/Badge";

export interface SubmitDeliverableProps {
  className?: string;
}

const SubmitDeliverable: FC<SubmitDeliverableProps> = ({ className = "" }) => {
  const { username, indexId } = useParams<{
    username: string;
    indexId: number;
  }>();
  const [videoFile, setVideoFile] = useState(null);
  const [datatable, setDatatable] = useState<InfluencerData | {}>({});
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  //New Codes
  const [uploadProgress, setUploadProgress] = useState(0);

  const { influencer } = useContext(InfluencerAuthContext);

  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});

  const [showModal, setShowModal] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);

  const [showVideoModal, setShowVideoModal] = useState(false);

  const [showLinkModal, setShowLinkModal] = useState(false);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const [errorVideoMessage, setErrorVideoMessage] = useState("");

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/datatable/${influencer.username}/${indexId}`)
      .then((response) => {
        setDatatable(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [username, indexId]);

  const handleChatLogic = async () => {
    try {
      const existingChatResponse = await newRequest.get(
        `/chat/find/${influencer._id}/${brandProfile._id}`
      );

      const existingChat = existingChatResponse.data;

      if (existingChat) {
        const chatId = existingChat._id;
        history.push(`/convo/${chatId}`);
        localStorage.setItem(
          "previousLocation",
          `/submit/${username}/${indexId}`
        );
        return;
      }

      const chat = {
        senderId: influencer._id,
        receiverId: brandProfile._id,
      };

      const chatRes = await newRequest.post("/chat", chat);
      const createdChat = chatRes.data;

      if (createdChat) {
        const chatId = createdChat._id;
        history.push(`/convo/${chatId}`);
        localStorage.setItem(
          "previousLocation",
          `/submit/${username}/${indexId}`
        );
        return;
      }
    } catch (err) {
      setError(err);
    }
  };

  //
  useEffect(() => {
    if (datatable && datatable.businessName) {
      const fetchBrandProfile = async () => {
        try {
          const response = await newRequest.get(
            `/brand/getBrand/${datatable.businessName}`
          );
          setBrandProfile(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchBrandProfile();
    }
  }, [datatable]);
  //

  const history = useHistory();

  const newBrand = datatable?.businessName || "";
  const newDeliverable = datatable?.deliverableBooked || "";
  const newAmount = datatable?.amountPaid || 0;

  const handleVideoInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size; // in bytes
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes

    if (fileSize > maxSize) {
      setErrorVideoMessage("File size exceeds 200MB limit.");
      event.target.value = null; // reset input value
      setVideoFile(null); // reset video file
    } else {
      setVideoFile(file);
      setErrorVideoMessage("");
    }
  };

  const handleDeliverableComplete = async () => {
    if (!videoFile) {
      setError("Error: Video file is required");
      return;
    }
    if (!videoFile) {
      setError("Error: Video is required");
      return;
    }

    const videoUrl = await uploadVideo(videoFile, setUploadProgress);
    try {
      setLoading(true);
      const newCompleteEmail = {
        sendBrandName: datatable.businessName,
        sendInfluencerId: influencer._id,
        sendDeliverableCompleted: datatable.deliverableBooked,
        datatableDataId: datatable._id,
        videoSubmit: videoUrl,
      };

      const response = await newRequest.post(
        "/auth-influencer/submitDeliverable",
        newCompleteEmail
      );
      setVideoFile(null);
      setLoading(false);
      history.push(`/submit/${influencer.username}/${indexId}`);

      if (response.data.success) {
        setSubmitted("Content delivered successfully!");
        setShowVideoModal(false);
        setShowModal(false);
      } else {
        setSubmitted("Content delivered successfully!");
      }
    } catch (error) {
      setError("Error delivering content");
    }
  };

  const calculateSubmissionTime = (timeframe: any, dateCreated: any) => {
    if (typeof timeframe !== "undefined" && timeframe !== null) {
      const timeRegex =
        /^(\d+)\s+(dy|dys|day|days|wk|wks|week|weeks|mn|mns|month|months)$/i;
      const match = timeframe.match(timeRegex);

      if (match) {
        const [, count, unit] = match;
        const currentDate = new Date(dateCreated);

        if (unit.match(/d(ay)?s?/i)) {
          currentDate.setDate(currentDate.getDate() + parseInt(count));
        } else if (unit.match(/w(eek)?s?/i)) {
          currentDate.setDate(currentDate.getDate() + parseInt(count) * 7);
        } else if (unit.match(/m(onth)?s?/i)) {
          currentDate.setMonth(currentDate.getMonth() + parseInt(count));
        }

        // Format the date with the weekday, full month, day, and year
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const submissionDate = currentDate.toLocaleDateString("en-US", options);

        // Construct the desired format with the year
        const formattedDate = `${submissionDate.split(",")[0]} - ${
          submissionDate.split(",")[1]
        }, ${submissionDate.split(",")[2]}`;

        return formattedDate;
      }
    }

    return "";
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

  const renderLinkContent = () => {
    return (
      <>
        <FormItem
          className="mb-2"
          label="Paste the content link [Image/Video]"
          desc={
            <div>
              <span className="text-primary-6000">Supported platforms:</span>{" "}
              Instagram, TikTok, YouTube, Facebook, Twitter & LinkedIn
            </div>
          }
        >
          <div className="flex">
            <span className="inline-flex items-center px-4 text-sm font-semibold border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-primary-6000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </span>
            <Input id="link" className="!rounded-l-none" type="text" />
          </div>
        </FormItem>

        <div className="mt-5 space-x-3">
          <ButtonPrimary
            sizeClass="px-5 py-2"
            onClick={handleDeliverableComplete}
            type="button"
          >
            {loading ? "Delivering..." : "Deliver"}
          </ButtonPrimary>
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => setShowLinkModal(false)}
            type="button"
          >
            Close
          </ButtonSecondary>
        </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div>
        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="max-w-sm">
              <div className="max-w-sm p-4 border-2 border-dashed shadow-lg border-neutral-300 dark:border-neutral-6000 bg-gray-50 rounded-xl dark:bg-gray-800">
                <AiOutlineVideoCameraAdd className="mb-2 text-gray-500 w-14 h-14 dark:text-gray-400" />

                <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                  Videos
                </h5>

                <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                  .mp4, .mov, and .mkv
                </p>

                <ButtonPrimary
                  sizeClass="px-5 py-2 sm:py-1.5 md:py-1.5 lg:py-1.5 xl:py-1.5"
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                >
                  Upload file
                </ButtonPrimary>
              </div>
            </div>

            <div className="max-w-sm">
              <div className="max-w-sm p-4 border-2 border-dashed shadow-lg border-neutral-300 dark:border-neutral-6000 bg-gray-50 rounded-xl dark:bg-gray-800">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="mb-2 text-gray-500 w-14 h-14 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
                  <path d="m8 11-3 4h11l-4-6-3 4z"></path>
                  <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                </svg>

                <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                  Images
                </h5>

                <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                  .png, .jpg, and .jpeg
                </p>

                {/**
                    <ButtonPrimary
                      sizeClass="px-5 py-1.5"
                      type="button"
                      onClick={() => setShowImageModal(true)}
                    >
                      Upload file
                    </ButtonPrimary>
                    */}
                <Badge
                  className="flex items-center justify-center px-2 py-2 mt-1 text-center rounded-md"
                  color="green"
                  name="Coming soon"
                />
              </div>
            </div>

            <div className="max-w-sm">
              <div className="max-w-sm p-4 border-2 border-dashed shadow-lg border-neutral-300 dark:border-neutral-6000 bg-gray-50 rounded-xl dark:bg-gray-800">
                <TiDocumentAdd className="mb-2 text-gray-500 w-14 h-14 dark:text-gray-400" />

                <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                  Documents
                </h5>

                <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                  .doc, .docx, .pdf, and .txt
                </p>

                {/**
                    <ButtonPrimary
                      sizeClass="px-5 py-1.5"
                      type="button"
                      onClick={() => setShowImageModal(true)}
                    >
                      Upload file
                    </ButtonPrimary>
                    */}
                <Badge
                  className="flex items-center justify-center px-2 py-2 mt-1 text-center rounded-md"
                  color="green"
                  name="Coming soon"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => setShowModal(false)}
            type="button"
          >
            Close
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderImageContent = () => {
    return (
      <form action="">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Upload image
        </h3>

        <div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            All image formats supported
          </span>
          <div className="mt-2">
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
              <div className="relative flex items-center justify-center w-32 h-24 overflow-hidden rounded-2xl">
                <video
                  src={videoFile ? URL.createObjectURL(videoFile) : ""}
                  alt="Uploaded image"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                  <AiOutlineVideoCameraAdd size={30} />
                  <span className="mt-1 text-xs">Upload</span>
                  <p className="mt-1 text-xs">Max size: 200MB</p>
                </div>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onInput={handleVideoInputChange}
                />
              </div>
            </div>
            {submitted && (
              <p className="mt-1 text-xs text-green-500">{submitted}</p>
            )}
            {errorVideoMessage && (
              <p className="mt-1 text-xs text-red-500">{errorVideoMessage}</p>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <div className="mt-5 space-x-3">
          <ButtonPrimary
            sizeClass="px-5 py-2"
            onClick={handleDeliverableComplete}
            type="button"
          >
            {loading ? "Delivering..." : "Deliver"}
          </ButtonPrimary>
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => setShowImageModal(false)}
            type="button"
          >
            Close
          </ButtonSecondary>
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-primary-6000 dark:text-white">
                Upload Progress:
              </span>
              <span className="text-sm font-medium text-primary-6000 dark:text-white">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex items-center mt-4">
            <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
            <span className="ml-2 text-sm">
              {`Delivering content: "${datatable.deliverableBooked}" to ${datatable.businessName}`}
            </span>
          </div>
        )}
      </form>
    );
  };

  const renderVideoContent = () => {
    return (
      <form action="">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Upload video
        </h3>

        <div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            All video formats supported
          </span>
          <div className="mt-2">
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
              <div className="relative flex items-center justify-center w-32 h-24 overflow-hidden rounded-2xl">
                <video
                  src={videoFile ? URL.createObjectURL(videoFile) : ""}
                  alt="Uploaded video"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                  <AiOutlineVideoCameraAdd size={30} />
                  <span className="mt-1 text-xs">Upload</span>
                  <p className="mt-1 text-xs">Max size: 200MB</p>
                </div>
                <input
                  type="file"
                  id="file"
                  accept="video/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onInput={handleVideoInputChange}
                />
              </div>
            </div>
            {submitted && (
              <p className="mt-1 text-xs text-green-500">{submitted}</p>
            )}
            {errorVideoMessage && (
              <p className="mt-1 text-xs text-red-500">{errorVideoMessage}</p>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <div className="mt-5 space-x-3">
          <ButtonPrimary
            sizeClass="px-5 py-2"
            onClick={handleDeliverableComplete}
            type="button"
          >
            {loading ? "Delivering..." : "Deliver"}
          </ButtonPrimary>
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => setShowVideoModal(false)}
            type="button"
          >
            Close
          </ButtonSecondary>
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-primary-6000 dark:text-white">
                Upload Progress:
              </span>
              <span className="text-sm font-medium text-primary-6000 dark:text-white">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex items-center mt-4">
            <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
            <span className="ml-2 text-sm">
              {`Delivering content: "${datatable.deliverableBooked}" to ${datatable.businessName}`}
            </span>
          </div>
        )}
      </form>
    );
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-SubmitDeliverable mb-20 ${className}`}
          data-nc-id="SubmitDeliverable"
        >
          <Helmet>
            <title>Content Delivery</title>
          </Helmet>

          {/* HEADER */}
          <div className="mt-20">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Content Delivery
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

                <span className="text-sm">
                  Learn how to Deliver your Content to Brands
                </span>
              </p>

              <div className="mt-6">
                <Link to="/dashboard">
                  <ButtonSecondary sizeClass="py-2 px-5" className="flex-1">
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.5 12H3.67004"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Back</span>
                  </ButtonSecondary>
                </Link>
                <div className="relative mt-4 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 w-32 lg:w-44">
                        <NcImage
                          src={brandProfile.logo}
                          containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="mt-2 text-sm text-gray-500">Brand Name:</p>
                      <h2 className="text-2xl font-normal">{newBrand}</h2>
                    </div>

                    <div className="mb-8">
                      <p className="mt-2 text-sm text-gray-500">Description:</p>
                      <h2 className="text-base font-normal">
                        {brandProfile.desc}
                      </h2>
                      <p className="mt-4 text-sm text-gray-500 capitalize">
                        <p className="text-gray-500 capitalize">
                          Industry: {brandProfile.industry}
                        </p>
                      </p>
                      <p className="mt-4 text-sm text-gray-500">
                        Website:{" "}
                        <a
                          href={`https://${
                            brandProfile.website ||
                            "No website available for this brand"
                          }`}
                          target="_blank"
                          className={`${
                            brandProfile.website !== ""
                              ? "underline text-primary-6000"
                              : ""
                          }`}
                        >
                          {brandProfile.website}
                        </a>
                      </p>
                    </div>

                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Deliverable
                        </time>
                        <h3 className="mb-4 text-lg font-normal text-gray-900 dark:text-white">
                          {newDeliverable}
                        </h3>
                      </li>

                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Amount
                        </time>
                        <h3 className="text-lg font-normal text-gray-900 dark:text-white">
                          NGN{" "}
                          <span className="">{newAmount.toLocaleString()}</span>
                        </h3>
                      </li>

                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Status
                        </time>
                        <h3 className="text-lg font-normal text-gray-900 dark:text-white">
                          {datatable?.bookingStatus ? (
                            <div className="flex items-center">
                              <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                              Active
                            </div>
                          ) : datatable?.bookingStatus === false ? (
                            <div className="flex items-center">
                              <span className="mr-2">Completed</span>
                              <BsCheck2Square size={18} />
                            </div>
                          ) : (
                            <div>{""}</div>
                          )}
                        </h3>
                      </li>

                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Timeframe
                        </time>
                        <h3 className="text-lg font-normal text-gray-900 dark:text-white">
                          {datatable?.timeframe}
                        </h3>
                      </li>

                      <li className="mb-8 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Delivery date
                        </time>
                        <h3 className="text-lg font-normal text-gray-900 dark:text-white">
                          {calculateSubmissionTime(
                            datatable?.timeframe,
                            datatable?.dateCreated
                          )}
                        </h3>
                      </li>

                      <li className="mb-16 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Contact brand
                        </time>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white"></h3>
                        <ButtonPrimary
                          onClick={handleChatLogic}
                          sizeClass="px-5 py-2"
                        >
                          <span className="font-light">Send a message</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                          </svg>
                        </ButtonPrimary>
                      </li>
                    </ol>

                    <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Published:</span> This is
                      live/published content.{" "}
                      <span className="text-primary-6000">{newBrand}</span> will
                      be able to see how well the content is doing
                      [metrics/engagement] and download detailed reports at
                      their convenience.
                    </p>

                    <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Unpublished:</span> This
                      is content that{" "}
                      <span className="text-primary-6000">{newBrand}</span>{" "}
                      receives as a downloadable file and can use it on their own
                      pages.
                    </p>

                    <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                    <div className="flex flex-col mt-4 mb-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row md:space-x-4 xl:space-x-4 lg:space-x-4">
                      {datatable?.timeframe &&
                      datatable?.bookingStatus === true ? (
                        <>
                          <ButtonPrimary
                            disabled={loading}
                            onClick={() => setShowLinkModal(true)}
                            sizeClass="py-2 px-6"
                            className="mt-2"
                          >
                            <span className="font-normal">
                              Deliver published
                            </span>
                            <span className="ml-2">
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
                                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                />
                              </svg>
                            </span>
                          </ButtonPrimary>

                          <ButtonSecondary
                            disabled={loading}
                            onClick={() => setShowModal(true)}
                            sizeClass="py-2 px-6"
                            className="mt-2"
                          >
                            <span className="font-normal">
                              Deliver unpublished
                            </span>
                            <span className="ml-2">
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
                                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                              </svg>
                            </span>
                          </ButtonSecondary>
                        </>
                      ) : datatable?.bookingStatus === false ? (
                        <span className="mt-2 text-base font-normal">
                          This content has been delivered to{" "}
                          <span className="font-semibold text-primary-6000">
                            {datatable?.businessName}
                          </span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
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

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showLinkModal}
            renderContent={renderLinkContent}
            contentExtraClass="max-w-md"
            onCloseModal={() => setShowLinkModal(false)}
            modalTitle="Deliver Published Content"
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showVideoModal}
            renderContent={renderVideoContent}
            contentExtraClass="max-w-md"
            onCloseModal={() => setShowVideoModal(false)}
            modalTitle="Unpublished Video"
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showImageModal}
            renderContent={renderImageContent}
            contentExtraClass="max-w-md"
            onCloseModal={() => setShowImageModal(false)}
            modalTitle="Unpublished Image"
          />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showModal}
            renderContent={renderContent}
            contentExtraClass="max-w-lg"
            onCloseModal={() => setShowModal(false)}
            modalTitle="Deliver Unpublished Content"
          />
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </div>
  );
};

export default SubmitDeliverable;