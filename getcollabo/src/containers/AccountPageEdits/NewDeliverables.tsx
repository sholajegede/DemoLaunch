// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useReducer } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Tab } from "@headlessui/react";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Login from "containers/Onboard/Login";
import { deliverableReducer, INITIAL_STATE } from "reducers/deliverableReducer";
import { v4 as uuidv4 } from "uuid";
import { BiAddToQueue } from "react-icons/bi";
import { InfluencerProfileData } from "routers/types";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import Label from "components/Label/Label";

export interface NewDeliverablesProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const NewDeliverables: FC<NewDeliverablesProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [state, dispatch] = useReducer(deliverableReducer, INITIAL_STATE);

  const [error, setError] = useState(null);

  const { dispatch: authDispatch, influencer } = useContext(
    InfluencerAuthContext
  ); // rename dispatch to authDispatch

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});
  const [deliverables, setDeliverables] = useState(
    influencerProfile.deliverable || []
  );

  //New Deliverables
  const [newDescription, setNewDescription] = useState("");

  const [newRate, setNewRate] = useState("");

  const [newDeliveryTime, setNewDeliveryTime] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editDeliverableId, setEditDeliverableId] = useState("");

  const [fetchedDeliverable, setFetchedDeliverable] = useState({});

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleRateChange = (event) => {
    setNewRate(event.target.value);
  };

  const handleDeliveryTimeChange = (event) => {
    setNewDeliveryTime(event.target.value);
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
    if (influencerProfile.deliverable) {
      setDeliverables(influencerProfile.deliverable);
    }
  }, [influencerProfile.deliverable]);

  const [loading, setLoading] = useState(false);

  const [addLoading, setAddLoading] = useState(false);

  const history = useHistory();

  const handleAddDeliverable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddLoading(true);
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const rateInput = document.getElementById("rate") as HTMLInputElement;
    const deliveryTimeInput = document.getElementById(
      "deliveryTime"
    ) as HTMLInputElement;

    const description = descriptionInput.value;
    const rate = Number(rateInput.value);
    const deliveryTime = deliveryTimeInput.value;

    if (!description || isNaN(rate) || !deliveryTime) {
      toast.error("Please fill in all the required fields", {
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

    const newDeliverable = {
      _id: uuidv4(),
      description,
      rate,
      deliveryTime,
    };
    dispatch({ type: "ADD_DELIVERABLE", payload: newDeliverable });
    setAddLoading(false);

    // reset form values
    descriptionInput.value = "";
    rateInput.value = "";
    deliveryTimeInput.value = "";
  };

  const handleRemoveDeliverable = (deliverableId) => {
    dispatch({ type: "REMOVE_DELIVERABLE", payload: deliverableId });
    toast.success("Deliverable removed", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDeleteDeliverable = async (deliverableId) => {
    try {
      await newRequest.delete(
        `/influencer/delete/${influencer._id}/deliverables/${deliverableId}`
      );
      toast.success("Deliverable deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDeliverables(
        deliverables.filter((deliverable) => deliverable._id !== deliverableId)
      );
    } catch (error) {
      setError("Error deleting deliverable");
    }
  };

  const handleEditDeliverable = async (deliverableId, e) => {
    e.preventDefault();

    try {
      const editDeliverable = {
        description: newDescription,
        rate: newRate,
        deliveryTime: newDeliveryTime,
      };

      const res = await newRequest.put(
        `/influencer/edit/${influencer._id}/deliverables/${deliverableId}`,
        editDeliverable
      );

      setNewDescription("");
      setNewRate("");
      setNewDeliveryTime("");

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
      toast.error("Unable to update deliverable", {
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

  const passingDeliverable = state.deliverable.map((deliverable) => ({
    description: deliverable.description,
    rate: deliverable.rate,
    deliveryTime: deliverable.deliveryTime,
  }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "UPDATE_START" });

    try {
      const updateInfluencer = {
        deliverable: passingDeliverable,
      };

      const res = await newRequest.put(
        `/influencer/deliverables/${influencer._id}`,
        updateInfluencer
      );
      authDispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      dispatch({ type: "REMOVE_ALL_DELIVERABLES" });
      setLoading(false);
      toast.success("👍 Deliverables updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push("/edit-deliverables");
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

  const handleBackLogic = async () => {
    const previousLocation = localStorage.getItem("previousLocation");

    if (previousLocation) {
      localStorage.removeItem("previousLocation");
      history.push(previousLocation);
    } else {
      history.push("/deliverables");
    }
  };

  useEffect(() => {
    if (influencerProfile.deliverable) {
      const fetchDeliverable = async () => {
        const response = await newRequest.get(
          `/influencer/deliverable/${influencer.username}/${editDeliverableId}`
        );
        setFetchedDeliverable(response.data);
      };
      fetchDeliverable();
    }
  }, [editDeliverableId, influencerProfile.deliverable]);

  const renderContent = () => {
    if (editDeliverableId) {
      return (
        <div className="mb-4">
          <form>
            <FormItem>
              <Label className="text-base">Deliverable</Label>

              <Input
                type="text"
                placeholder={fetchedDeliverable?.description}
                onChange={handleDescriptionChange}
              />
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-base">Rate</Label>
              <Input
                type="number"
                min="5000"
                placeholder={fetchedDeliverable?.rate?.toLocaleString()}
                onChange={handleRateChange}
              />
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-base">Timeframe</Label>
              <Input
                type="text"
                placeholder={fetchedDeliverable?.deliveryTime}
                onChange={handleDeliveryTimeChange}
              />
            </FormItem>

            <div className="mt-5 space-x-3">
              <ButtonPrimary
                sizeClass="px-5 py-2"
                type="button"
                onClick={(e) => handleEditDeliverable(editDeliverableId, e)}
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
          className={`nc-NewDeliverables ${className}`}
          data-nc-id="NewDeliverables"
        >
          <Helmet>
            <title>Edit Deliverables</title>
          </Helmet>
          <div className="py-16 mt-4 mb-24 space-y-16 sm:mb-0 xl:mb-0 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Update Deliverables
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                </div>
              </Tab.Group>

              <div className="space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                <div>
                  <h3 className="mt-6 text-lg font-semibold sm:text-2xl">
                    All deliverables
                  </h3>
                </div>

                {deliverables?.length > 0 && (
                  <div>
                    {deliverables.map((deliverable) => (
                      <div
                        key={deliverable._id}
                        className="mb-2 border border-gray-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <ul className="px-4 py-3 sm:px-6">
                          <li className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                Deliverable: {deliverable?.description}
                              </div>

                              <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                <p className="mr-1">Rate:</p>
                                <TbCurrencyNaira size={18} />
                                {deliverable?.rate?.toLocaleString()}
                              </div>

                              <div>
                                <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                  <p className="mr-1">Timeframe:</p>
                                  <AiOutlineFieldTime size={17} />
                                  {deliverable?.deliveryTime}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                setShowModal(true);
                                setEditDeliverableId(deliverable._id);
                              }}
                              className="xl:hidden p-1 mr-2.5 xl:mr-8 sm:mr-4 md:mr-4 lg:mr-8 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                              className="hidden mr-4 xl:block"
                              onClick={(e) => {
                                setShowModal(true);
                                setEditDeliverableId(deliverable._id);
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
                                handleDeleteDeliverable(deliverable._id)
                              }
                              className="p-1 text-gray-400 rounded-md xl:hidden hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                              className="hidden xl:block"
                              onClick={() =>
                                handleDeleteDeliverable(deliverable._id)
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
                )}
              </div>

              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(e);
                  }
                }}
              >
                <div className="mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">
                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
                  <div>
                    <h3 className="text-lg font-semibold sm:text-2xl">
                      Add deliverables
                    </h3>
                  </div>

                  <form
                    action=""
                    onSubmit={handleAddDeliverable}
                    className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-2.5"
                  >
                    {/* ---- */}
                    <FormItem
                      label="Deliverable"
                      desc={
                        <div>
                          <span className="text-green-500">E.g: </span>1
                          Instastory and TikTok Promotions
                        </div>
                      }
                    >
                      <div className="mt-1.5 flex">
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
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </span>
                        <Input
                          type="text"
                          id="description"
                          className="!rounded-l-none"
                        />
                      </div>
                    </FormItem>

                    {/* ---- */}
                    <FormItem
                      label="Rate"
                      desc={
                        <div>
                          Min. Rate:
                          <span className="ml-2 text-green-500">NGN 5,000</span>
                        </div>
                      }
                    >
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                          <TbCurrencyNaira size={22} />
                        </span>
                        <Input
                          id="rate"
                          type="number"
                          className="!rounded-l-none"
                          placeholder="5000"
                          min="5000"
                        />
                      </div>
                    </FormItem>

                    {/* ---- */}
                    <FormItem
                      label="TimeFrame"
                      desc={
                        <div>
                          <span className="text-green-500">E.g: </span>1 day, 2
                          days, 3 days...1 week, 2 weeks, etc
                        </div>
                      }
                    >
                      <div className="mt-1.5 flex">
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
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <Input
                          id="deliveryTime"
                          type="text"
                          className="!rounded-l-none"
                        />
                      </div>
                    </FormItem>

                    <div>
                      <button
                        disabled={addLoading}
                        type="submit"
                        className="inline-flex py-2 mt-8 mb-10 ml-2"
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
                          ? "Adding your deliverable..."
                          : "Click to add deliverable"}
                      </button>
                    </div>
                  </form>

                  {state?.deliverable?.length > 0 && (
                    <div className="divide-y divide-gray-200">
                      {state.deliverable.map((deliverable) => (
                        <div
                          key={deliverable._id}
                          className="mb-2 border border-gray-200 rounded-md shadow-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        >
                          <ul className="px-4 py-3 sm:px-6">
                            <li className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                  Deliverable: {deliverable?.description}
                                </div>

                                <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                  <p className="mr-1">Rate:</p>
                                  <TbCurrencyNaira size={18} />
                                  {deliverable?.rate?.toLocaleString()}
                                </div>
                                <div>
                                  <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                    <p className="mr-1">Timeframe:</p>
                                    <AiOutlineFieldTime size={17} />
                                    {deliverable?.deliveryTime}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveDeliverable(deliverable._id)
                                }
                                className="p-1 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                      {loading
                        ? "Updating your deliverables..."
                        : "Update deliverables"}
                    </ButtonPrimary>
                    <ButtonSecondary
                      className="flex-1"
                      onClick={handleBackLogic}
                    >
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

export default NewDeliverables;