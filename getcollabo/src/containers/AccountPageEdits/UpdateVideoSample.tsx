// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useReducer } from "react";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import { useHistory } from "react-router-dom";
import uploadVideo from "utils/uploadVideo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Login from "containers/Onboard/Login";
import { Link } from "react-router-dom";
import { videoSampleReducer, INITIAL_STATE } from "reducers/videoSampleReducer";
import { v4 as uuidv4 } from "uuid";
import { BiAddToQueue } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { InfluencerProfileData } from "routers/types";
import CardNFTVideo from "./CardNFTVideo";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import Label from "components/Label/Label";

export interface UpdateVideoSampleProps {
  className?: string;
}

const UpdateVideoSample: FC<UpdateVideoSampleProps> = ({ className = "" }) => {
  const [state, dispatch] = useReducer(videoSampleReducer, INITIAL_STATE);
  const [videoFile, setVideoFile] = useState(null);

  //New Codes
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoTitle, setVideoTitle] = useState("");

  const [linkTitle, setLinkTitle] = useState("");

  const [videoLink, setVideoLink] = useState("");
  //

  const [error, setError] = useState(null);

  const { dispatch: authDispatch, influencer } = useContext(
    InfluencerAuthContext
  );

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});
  const [videoSamples, setVideoSamples] = useState(
    influencerProfile.videoSample || []
  );

  //New Samples
  const [addNewVideoLink, setAddNewVideoLink] = useState("");

  const [newTitle, setNewTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editVideoSampleId, setEditVideoSampleId] = useState("");

  const [fetchedVideoSample, setFetchedVideoSample] = useState({});

  const handleChangeVideoLink = (event) => {
    setAddNewVideoLink(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value);
  };
  //

  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer?._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);

  useEffect(() => {
    if (influencerProfile.videoSample) {
      setVideoSamples(influencerProfile.videoSample);
    }
  }, [influencerProfile.videoSample]);

  const [loading, setLoading] = useState(false);

  const [addLoading, setAddLoading] = useState(false);

  const [errorVideoMessage, setErrorVideoMessage] = useState("");

  const history = useHistory();

  const handleVideoInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size; // in bytes
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes

    if (fileSize > maxSize) {
      setErrorVideoMessage("File size exceeds 200 MB limit.");
      event.target.value = null; // reset input value
      setVideoFile(null); // reset video file
    } else {
      setVideoFile(file);
      setErrorVideoMessage("");
    }
  };

  const handleVideoTitleChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "";
    setVideoTitle(fileName);
  };

  const handleNewVideoTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleNewLinkTitleChange = (event) => {
    setLinkTitle(event.target.value);
  };

  const handleNewVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleAddVideoSample = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setAddLoading(true);

    if (!videoFile && !videoLink) {
      toast.error("Please add a link or upload a video file", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setAddLoading(false);
      return;
    }

    const videoUrl = await uploadVideo(videoFile, setUploadProgress);
    const titleInput = document.getElementById("title") as HTMLInputElement;

    const video = videoUrl || videoLink;
    const title = titleInput.value || linkTitle.value;

    const newVideoSample = {
      _id: uuidv4(),
      video,
      title,
    };
    dispatch({ type: "ADD_VIDEO_SAMPLE", payload: newVideoSample });
    setAddLoading(false);

    setVideoFile(null);
    setVideoTitle("");
    setLinkTitle("");
    setVideoLink("");
    titleInput.value = "";
    linkTitle.value = "";
  };

  const handleRemoveVideoSample = (videoSampleId) => {
    dispatch({ type: "REMOVE_VIDEO_SAMPLE", payload: videoSampleId });
  };

  const handleDeleteVideoSample = async (videoSampleId) => {
    try {
      await newRequest.delete(
        `/influencer/sampleDelete/${influencer._id}/videoSamples/${videoSampleId}`
      );
      toast.success("Sample deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setVideoSamples(
        videoSamples.filter((videoSample) => videoSample._id !== videoSampleId)
      );
    } catch (error) {
      setError("Error deleting video sample");
    }
  };

  const handleEditVideoSample = async (videoSampleId, e) => {
    e.preventDefault();

    try {
      const editVideoSample = {
        video: addNewVideoLink,
        title: newTitle,
      };

      const res = await newRequest.put(
        `/influencer/editSample/${influencer._id}/sample/${videoSampleId}`,
        editVideoSample
      );

      setAddNewVideoLink("");
      setNewTitle("");

      const responseData = res.data.message;

      const response = await newRequest.get(
        `/influencer/find/${influencer?._id}`
      );
      setInfluencerProfile(response.data);
      setShowModal(false);
      toast.success(responseData, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Unable to update sample", {
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
  };

  const passingVideoSample = state.videoSample?.map((videoSample) => ({
    video: videoSample.video,
    title: videoSample.title,
  }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "UPDATE_START" });

    try {
      const updateInfluencer = {
        videoSample: passingVideoSample,
      };

      const res = await newRequest.put(
        `/influencer/videoSample/${influencer._id}`,
        updateInfluencer
      );
      authDispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      dispatch({ type: "REMOVE_ALL_VIDEO_SAMPLES" });
      setLoading(false);
      toast.success("👍 Samples updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push("/videos");
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

  useEffect(() => {
    if (influencerProfile.videoSample) {
      const fetchSample = async () => {
        const response = await newRequest.get(
          `/influencer/videoSample/${influencer.username}/${editVideoSampleId}`
        );
        setFetchedVideoSample(response.data);
      };
      fetchSample();
    }
  }, [editVideoSampleId, influencerProfile.videoSample]);

  const renderContent = () => {
    if (editVideoSampleId) {
      return (
        <div className="mb-4">
          <form>
            <FormItem>
              <Label className="text-base">Video Link</Label>

              <Input
                type="text"
                placeholder={fetchedVideoSample?.video}
                onChange={handleChangeVideoLink}
              />
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-base">Title</Label>
              <Input
                type="text"
                placeholder={fetchedVideoSample?.title}
                onChange={handleChangeTitle}
              />
            </FormItem>

            <div className="mt-5 space-x-3">
              <ButtonPrimary
                sizeClass="px-5 py-2"
                type="button"
                onClick={(e) => handleEditVideoSample(editVideoSampleId, e)}
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
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>

                <span className="mr-2">Update</span>
              </ButtonPrimary>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-UpdateVideoSample ${className}`}
          data-nc-id="UpdateVideoSample"
        >
          <Helmet>
            <title>Update Sample Video</title>
          </Helmet>
          <div className="py-16 mt-4">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Sample Deliverables
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                </div>
              </Tab.Group>
              <span className="block mt-5 mb-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                Set new samples [image/video], edit or delete existing ones.
              </span>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="mt-8 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                <div>
                  <h3 className="mt-6 mb-4 text-2xl font-semibold">
                    Your samples
                  </h3>
                </div>

                {videoSamples?.length > 0 && (
                  <div className="border border-gray-200 shadow-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-2xl">
                    <div className="flex overflow-x-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full">
                      {videoSamples.map((videoSample) => (
                        <div
                          key={videoSample._id}
                          className="flex-shrink-0 h-full pt-4 pl-4 pr-4"
                        >
                          <CardNFTVideo url={videoSample} />

                          <ul className="px-2 py-3">
                            <li className="flex items-center justify-between pb-4 pl-4 pr-40 xl:pb-2 xl:pl-0 xl:pr-2">
                              <button
                                onClick={(e) => {
                                  setShowModal(true);
                                  setEditVideoSampleId(videoSample._id);
                                }}
                                className="text-gray-400 rounded-md xl:hidden hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                              <ButtonPrimary
                                sizeClass="py-1.5 px-5"
                                className="hidden mr-4 rounded-md xl:block"
                                onClick={(e) => {
                                  setShowModal(true);
                                  setEditVideoSampleId(videoSample._id);
                                }}
                              >
                                <span className="inline-flex pt-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                  <span>Edit</span>
                                </span>
                              </ButtonPrimary>
                              <button
                                onClick={() =>
                                  handleDeleteVideoSample(videoSample._id)
                                }
                                className="text-gray-400 rounded-md xl:hidden hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 stroke-red-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              <ButtonSecondary
                                sizeClass="py-1.5 px-5"
                                className="hidden mr-2 rounded-md xl:block"
                                onClick={() =>
                                  handleDeleteVideoSample(videoSample._id)
                                }
                              >
                                <span className="inline-flex pt-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2 stroke-red-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                  <span className="text-red-500">Delete</span>
                                </span>
                              </ButtonSecondary>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-8"></div>

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
                  <div>
                    <h3 className="text-lg font-semibold sm:text-2xl">
                      Upload new samples
                    </h3>
                    <span className="block mt-4 mb-4 text-sm xl:text-base lg:text-base md:text-sm text-neutral-500 dark:text-neutral-400">
                      You can add a new sample by copying and pasting a link to
                      your image/video content from any of your social media
                      channels. Or you can upload [video only] directly from
                      your device.
                    </span>
                  </div>

                  <form
                    action=""
                    onSubmit={handleAddVideoSample}
                    className="gap-5 sm:gap-2.5"
                  >
                    {/* ---- */}
                    <div className="mt-8 mb-8">
                      <div className="grid sm:grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-2 xl:grid-cols-2">
                        <div className="">
                          <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                            <FormItem
                              label="Paste a link [Image/Video]"
                              desc={
                                <div>
                                  <span className="font-medium text-primary-6000">
                                    Supported platforms:
                                  </span>{" "}
                                  Instagram, TikTok, YouTube, Facebook, Twitter
                                  & LinkedIn
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
                                <Input
                                  id="link"
                                  className="!rounded-l-none"
                                  type="text"
                                  value={videoLink}
                                  onChange={handleNewVideoLinkChange}
                                />
                              </div>
                            </FormItem>

                            <FormItem className="mt-10" label="Add a title">
                              <div className="flex">
                                <span className="inline-flex items-center px-4 text-sm font-medium border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                  Title
                                </span>
                                <Input
                                  id="title"
                                  className="!rounded-l-none"
                                  type="text"
                                  value={linkTitle}
                                  onChange={handleNewLinkTitleChange}
                                />
                              </div>
                            </FormItem>
                          </div>
                        </div>

                        <div className="">
                          <div className="h-full p-6 border border-gray-200 shadow-lg bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                            <FormItem label="Upload video">
                              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                All video file types supported
                              </span>
                              <div className="mt-2">
                                <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
                                  <div className="relative flex items-center justify-center w-32 overflow-hidden h-28 rounded-2xl">
                                    <video
                                      src={
                                        videoFile
                                          ? URL.createObjectURL(videoFile)
                                          : ""
                                      }
                                      alt="Uploaded video"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                                      <AiOutlineVideoCameraAdd size={30} />
                                      <span className="mt-1 text-xs">
                                        Upload Video
                                      </span>
                                      <p className="mt-1 text-xs">
                                        Max size: 200MB
                                      </p>
                                    </div>
                                    <input
                                      type="file"
                                      id="video"
                                      accept="video/*"
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                      onInput={handleVideoInputChange}
                                      onChange={handleVideoTitleChange}
                                    />
                                  </div>
                                </div>
                                {errorVideoMessage && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {errorVideoMessage}
                                  </p>
                                )}
                              </div>
                            </FormItem>

                            <FormItem
                              className="mt-10"
                              label="Add/Edit video title"
                            >
                              <div className="flex">
                                <span className="inline-flex items-center px-4 text-sm font-medium border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                                  Title
                                </span>
                                <Input
                                  id="title"
                                  className="!rounded-l-none"
                                  type="text"
                                  value={videoTitle}
                                  onChange={handleNewVideoTitleChange}
                                />
                              </div>
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={addLoading}
                        type="submit"
                        className="inline-flex mb-3 ml-2"
                      >
                        {addLoading ? (
                          <svg
                            className="mr-2"
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
                              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                            />
                          </svg>
                        ) : (
                          <BiAddToQueue
                            className="mr-2 fill-green-500"
                            size={25}
                          />
                        )}
                        {addLoading
                          ? "Uploading your sample..."
                          : "Click to add new sample"}
                      </button>
                    </div>

                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mb-10">
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
                  </form>

                  {state?.videoSample?.length > 0 && (
                    <div className="divide-y divide-gray-200">
                      {state.videoSample.map((videoSample) => (
                        <div
                          key={videoSample._id}
                          className="mb-2 border border-gray-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        >
                          <ul className="px-4 py-3 sm:px-6">
                            <li className="flex items-center justify-between">
                              <div className="flex-1">
                                {videoSample.video.includes(
                                  "res.cloudinary.com"
                                ) ? (
                                  <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                    Video Link:{" "}
                                    {videoSample.video?.slice(34, 58)}
                                  </div>
                                ) : (
                                  <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                    Video Link:{" "}
                                    {videoSample.video?.slice(0, 35)}
                                  </div>
                                )}

                                <div>
                                  <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                    <p className="mr-1">Title:</p>
                                    {videoSample.title}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveVideoSample(videoSample._id)
                                }
                                className="p-1 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <MdDeleteForever
                                  className="fill-red-500"
                                  size={24}
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ---- */}

                  <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="flex-1"
                      disabled={loading}
                      type="button"
                      onClick={handleUpdate}
                    >
                      {loading ? "Updating..." : "Update"}
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
                        Updating your awesome rate card...give us a few seconds.
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

          <ToastContainer className="text-sm" />

          <NcModal
            renderTrigger={() => null}
            isOpenProp={showModal}
            renderContent={renderContent}
            contentExtraClass="max-w-xl"
            onCloseModal={() => setShowModal(false)}
            modalTitle="Edit & Update"
          />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default UpdateVideoSample;