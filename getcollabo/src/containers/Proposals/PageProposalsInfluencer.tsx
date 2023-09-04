// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab } from "@headlessui/react";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";

export interface PageProposalsInfluencerProps {
  className?: string;
}
export interface UserItem {
  name: string;
}

const received: UserItem[] = [
  {
    name: "Received",
  },
];

const accepted: UserItem[] = [
  {
    name: "Accepted",
  },
];

const rejected: UserItem[] = [
  {
    name: "Rejected",
  },
];

const PageProposalsInfluencer: FC<PageProposalsInfluencerProps> = ({
  className = "",
}) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [proposals, setProposals] = useState([]);
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [rejectedProposals, setRejectedProposals] = useState([]);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [error, setError] = useState({});

  const [singleProposal, setSingleProposal] = useState({});

  const [isProposalDeleted, setIsProposalDeleted] = useState(false);

  const [proposalAccepted, setProposalAccepted] = useState(false);

  const [proposalRejected, setProposalRejected] = useState(false);

  const history = useHistory();

  const [textAreaValue, setTextAreaValue] = useState("");

  const [selectedUser, setSelectedUser] = useState("received");

  const [tabActive, setTabActive] = React.useState("Received");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [influencer, proposals]);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await newRequest.get(
        `/proposals/find/${influencer._id}`
      );
      setProposals(response.data);
    };
    fetchProposals();
  }, [influencer._id]);

  useEffect(() => {
    const categorizedProposals = proposals.reduce(
      (categories, proposal) => {
        const status = proposal.status;

        if (status === "received") {
          categories.received.push(proposal);
        } else if (status === "accepted") {
          categories.accepted.push(proposal);
        } else if (status === "rejected") {
          categories.rejected.push(proposal);
        }

        return categories;
      },
      {
        received: [],
        accepted: [],
        rejected: [],
      }
    );

    setReceivedProposals(categorizedProposals.received);
    setAcceptedProposals(categorizedProposals.accepted);
    setRejectedProposals(categorizedProposals.rejected);
  }, [proposals]);

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const handleViewProposal = async (proposalId: any) => {
    try {
      setSingleProposal({});

      setTimeout(async () => {
        const response = await newRequest.get(`/proposals/${proposalId}`);

        setSingleProposal(response.data);
        setShowModal(true);
      }, 0);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (isProposalDeleted === true) {
      const fetchUpdatedProposal = async () => {
        try {
          const response = await newRequest.get(`/proposals/find/${influencer._id}`);
          
          if (response.data) {
            setProposals(response.data);
            setIsProposalDeleted(false);
          } else {
            history.push("/proposals");
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchUpdatedProposal();
    }
  }, [isProposalDeleted, influencer._id]);

  useEffect(() => {
    if (proposalAccepted === true) {
      const fetchUpdatedProposal = async () => {
        try {
          const response = await newRequest.get(
            `/proposals/find/${influencer._id}`
          );
          setProposals(response.data);
          setProposalAccepted(false);
        } catch (error) {
          setError(error);
        }
      };

      fetchUpdatedProposal();
    }
  }, [proposalAccepted, influencer._id]);

  useEffect(() => {
    if (proposalRejected === true) {
      const fetchUpdatedProposal = async () => {
        try {
          const response = await newRequest.get(
            `/proposals/find/${influencer._id}`
          );
          setProposals(response.data);
          setProposalRejected(false);
        } catch (error) {
          setError(error);
        }
      };

      fetchUpdatedProposal();
    }
  }, [proposalRejected, influencer._id]);

  const handleAcceptProposal = async (proposalId: any) => {
    try {
      const res = await newRequest.put(`/proposals/accept/${proposalId}`);

      const responseData = res.data.message;

      if (responseData) {
        await newRequest.post(`/proposals/sendAcceptedEmail/${proposalId}`);
      }

      toast.success("✅ Proposal accepted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setShowModal(false);
      setProposalAccepted(true);

      setSelectedUser("accepted");
      setTabActive("Accepted");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message;

      toast.error(errorMessage, {
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

  const handleRejectProposal = async (
    proposalId: any,
    textAreaValue: string,
    brandName: string
  ) => {
    try {
      if (!textAreaValue) {
        setError({
          message: "You have to give a reason for rejecting this proposal.",
        });
        return;
      }

      const reason = textAreaValue;

      const res = await newRequest.put(`/proposals/reject/${proposalId}`);

      const responseData = res.data.message;

      if (responseData) {
        await newRequest.post(
          `/proposals/sendRejectedEmail/${proposalId}/${reason}`
        );
      }

      toast.success("❌ Proposal rejected!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setShowModal(false);
      setProposalRejected(true);

      setSelectedUser("rejected");
      setTabActive("Rejected");

      setShowDeleteModal(false);
    } catch (error) {
      toast.error(`${brandName} included a wrong email to this proposal`, {
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

  const handleStartConvo = async () => {
    try {
      if (singleProposal.brandId) {
        const response = await newRequest.get(`/chat/find/${singleProposal.brandId}/${influencer._id}`);
        const existingChat = response.data;

        if (existingChat) {
          const chatId = existingChat._id;
          history.push(`/convo/${chatId}`);
        } else {
          const chat = {
            senderId: influencer._id,
            receiverId: singleProposal.brandId,
          };
          const chatRes = await newRequest.post("/chat", chat);
          const createdChat = chatRes.data;

          if (createdChat) {
            const chatId = createdChat._id;
            history.push(`/convo/${chatId}`);
          }
        }
      } else {
        const message = await newRequest.post(`/proposals/sendChatMail/${singleProposal._id}`);
        const messageData = message.data.message;

        toast.success(`✅ ${messageData}`, {
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
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message;

      toast.error(errorMessage, {
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

  const handleDeleteProposal = async (proposalId: any) => {
    try {
      const res = await newRequest.delete(`/proposals/delete/${proposalId}`);

      const responseData = res.data.message;

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

      setShowModal(false);
      setIsProposalDeleted(true);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message;

      toast.error(errorMessage, {
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

  const renderContent = () => {
    if (singleProposal) {
      return (
        <div
          className="overflow-y-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <div className="fixed right-12">
            <button
              title="Delete proposal"
              onClick={() => handleDeleteProposal(singleProposal._id)}
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
          </div>
          <form action="" className="mb-4 ml-1 mr-6">
            <FormItem>
              <Label className="text-lg">Brand:</Label>
              <span className="block mt-1 text-sm capitalize text-neutral-500 dark:text-neutral-400">
                {singleProposal.businessName}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Overview:</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q1}
              </span>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q2}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Budget:</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q3}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Project Details:</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q4}
              </span>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q5}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Timeline:</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q6}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Additional Notes:</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {singleProposal.q7}
              </span>
            </FormItem>

            {singleProposal.status == "rejected" ? (
              <div className="mt-5 text-red-500">
                <p>You rejected this proposal</p>
              </div>
            ) : singleProposal.status == "accepted" ? (
              <>
                <div className="mt-5 text-green-500">
                  <p>You accepted this proposal</p>
                </div>
                <div className="mt-3">
                  <ButtonPrimary
                    sizeClass="px-5 py-2"
                    type="button"
                    onClick={() => handleStartConvo()}
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
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <span>Send a message</span>
                  </ButtonPrimary>
                </div>
              </>
            ) : (
              <div className="mt-5 space-x-3">
                <ButtonPrimary
                  sizeClass="px-5 py-2"
                  type="button"
                  onClick={() => handleAcceptProposal(singleProposal._id)}
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
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>

                  <span>Accept</span>
                </ButtonPrimary>
                <ButtonSecondary
                  sizeClass="px-5 py-2"
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>

                  <span className="text-red-500">Reject</span>
                </ButtonSecondary>
              </div>
            )}
            <ToastContainer className="text-sm" />
          </form>
        </div>
      );
    }
  };

  const renderDeleteContent = () => {
    return (
      <form action="#">
        <span className="text-sm">
          Are you sure you want to reject this Proposal? You cannot undo this
          action.
        </span>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            Reason
          </h4>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Please provide any additional information or context that will help{" "}
            <span className="font-bold">{singleProposal.businessName}</span> to
            understand and handle the situation.
          </span>
          <Textarea
            placeholder="..."
            className="mt-3"
            rows={4}
            value={textAreaValue}
            onChange={(e) => {
              const inputValue = e.target.value;
              const sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic characters
              setTextAreaValue(sanitizedValue);
            }}
          />
          {error && (
            <span className="block mt-1 text-sm font-medium text-red-500">
              {error.message}
            </span>
          )}
        </div>

        <div className="mt-4 space-x-3">
          <ButtonPrimary
            sizeClass="px-5 py-2"
            type="button"
            onClick={() =>
              handleRejectProposal(
                singleProposal._id,
                textAreaValue,
                singleProposal.businessName
              )
            }
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

            <span>Yes, reject</span>
          </ButtonPrimary>
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowDeleteModal(false);
              setShowModal(false);
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <span>Close</span>
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderReceived = () => {
    return (
      <div className="mt-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
        {receivedProposals && receivedProposals.length > 0 ? (
          <div className="space-y-3.5">
            {receivedProposals
              .slice()
              .reverse()
              .map((proposal) => (
                <div
                  key={proposal._id}
                  className="relative flex justify-between p-2 space-x-2 transition-shadow border border-gray-200 shadow-lg dark:border-gray-700 bg-gray-50 dark:shadow rounded-3xl dark:bg-neutral-800 hover:shadow-xl dark:hover:shadow-xl"
                >
                  <div
                    onClick={() => handleViewProposal(proposal._id)}
                    className="flex flex-grow space-x-4"
                  >
                    <div className="relative w-16 sm:w-24">
                      <NcImage
                        containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                        src={proposal.brandLogo}
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-grow">
                      <h2 className={`block font-medium sm:text-lg`}>
                        {proposal.businessName}
                      </h2>
                      <div className=" flex items-center pt-3 mt-1.5">
                        <div className="">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {proposal.update === true ? "Updated:" : "Created:"}{" "}
                            <span className="text-green-500">
                              {proposal.update === true
                                ? proposal.updateDate
                                : proposal.date}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <ButtonPrimary
                        sizeClass="px-5 sm:px-10 lg:px-10 xl:px-10 py-2 flex-1"
                        onClick={() => handleViewProposal(proposal._id)}
                      >
                        Open
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-32 mb-40">
            <div className="pb-4">
              <span className="flex items-center justify-center mb-2 text-6xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-neutral-400 dark:text-neutral-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">
                Hi <span className="capitalize">{influencer.username}</span>,
                your new proposals stay here
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAccepted = () => {
    return (
      <div className="mt-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
        {acceptedProposals && acceptedProposals.length > 0 ? (
          <div className="space-y-3.5">
            {acceptedProposals
              .slice()
              .reverse()
              .map((proposal) => (
                <div
                  key={proposal._id}
                  className="relative flex justify-between p-2 space-x-2 transition-shadow border border-gray-200 shadow-lg dark:border-gray-700 bg-gray-50 dark:shadow rounded-3xl dark:bg-neutral-800 hover:shadow-xl dark:hover:shadow-xl"
                >
                  <div
                    onClick={() => handleViewProposal(proposal._id)}
                    className="flex flex-grow space-x-4"
                  >
                    <div className="relative w-16 sm:w-24">
                      <NcImage
                        containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                        src={proposal.brandLogo}
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-grow">
                      <h2 className={`block font-medium sm:text-lg`}>
                        {proposal.businessName}
                      </h2>
                      <div className=" flex items-center pt-3 mt-1.5">
                        <div className="">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {proposal.update === true ? "Updated:" : "Created:"}{" "}
                            <span className="text-green-500">
                              {proposal.update === true
                                ? proposal.updateDate
                                : proposal.date}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <ButtonPrimary
                        sizeClass="px-5 sm:px-10 lg:px-10 xl:px-10 py-2 flex-1"
                        onClick={() => handleViewProposal(proposal._id)}
                      >
                        Open
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-32 mb-40">
            <div className="pb-4">
              <span className="flex items-center justify-center mb-2 text-6xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 stroke-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">
                Hi <span className="capitalize">{influencer.username}</span>,
                your accepted proposals stay here
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRejected = () => {
    return (
      <div className="mt-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
        {rejectedProposals && rejectedProposals.length > 0 ? (
          <div className="space-y-3.5">
            {rejectedProposals
              .slice()
              .reverse()
              .map((proposal) => (
                <div
                  key={proposal._id}
                  className="relative flex justify-between p-2 space-x-2 transition-shadow border border-gray-200 shadow-lg dark:border-gray-700 bg-gray-50 dark:shadow rounded-3xl dark:bg-neutral-800 hover:shadow-xl dark:hover:shadow-xl"
                >
                  <div
                    onClick={() => handleViewProposal(proposal._id)}
                    className="flex flex-grow space-x-4"
                  >
                    <div className="relative w-16 sm:w-24">
                      <NcImage
                        containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                        src={proposal.brandLogo}
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-grow">
                      <h2 className={`block font-medium sm:text-lg`}>
                        {proposal.businessName}
                      </h2>
                      <div className=" flex items-center pt-3 mt-1.5">
                        <div className="">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {proposal.update === true ? "Updated:" : "Created:"}{" "}
                            <span className="text-green-500">
                              {proposal.update === true
                                ? proposal.updateDate
                                : proposal.date}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <ButtonPrimary
                        sizeClass="px-5 sm:px-10 lg:px-10 xl:px-10 py-2 flex-1"
                        onClick={() => handleViewProposal(proposal._id)}
                      >
                        Open
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-32 mb-40">
            <div className="pb-4">
              <span className="flex items-center justify-center mb-2 text-6xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 stroke-red-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">
                Hi <span className="capitalize">{influencer.username}</span>,
                your rejected proposals stay here
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-PageProposalsInfluencer overflow-hidden relative ${className}`}
      data-nc-id="PageProposalsInfluencer"
    >
      <Helmet>
        <title>Proposals </title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="We exist to create a sense of possibility that anyone, anywhere at anytime can become a creator and be successful. We provide creators with user-friendly tools to make their collaborative experiences seamless."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711180/Screenshot_179_iv4ers.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="We exist to create a sense of possibility that anyone, anywhere at anytime can become a creator and be successful. We provide creators with user-friendly tools to make their collaborative experiences seamless."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711180/Screenshot_179_iv4ers.png"
        />
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Proposals
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

            <span className="text-sm">Take a tour of Proposals</span>
          </p>

          <Tab.Group>
            <Tab.List className="flex mt-4 mb-2 space-x-0 overflow-x-auto sm:space-x-2">
              <Nav
                className="flex-shrink-0 p-1 rounded-full shadow-lg text-neutral-50 dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-100"
                containerClassName="mb-2 text-sm md:text-base"
              >
                {[
                  {
                    name: "Received",
                    user: "received",
                    icon: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                    `,
                  },
                  {
                    name: "Accepted",
                    user: "accepted",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                    </svg>
                    `,
                  },
                  {
                    name: "Rejected",
                    user: "rejected",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </NavItem2>
                ))}
              </Nav>
            </Tab.List>
          </Tab.Group>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="pb-64 mt-2">
            {selectedUser === "received"
              ? received.map((item, index) => renderReceived(item, index))
              : selectedUser === "accepted"
              ? renderAccepted()
              : renderRejected()}
          </div>
        </main>
      </div>

      <ToastContainer className="text-sm" />

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
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-xl"
        onCloseModal={() => setShowModal(false)}
        modalTitle={`${singleProposal.businessName}'s Proposal`}
      />

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showDeleteModal}
        renderContent={renderDeleteContent}
        contentExtraClass="max-w-xs sm:max-w-sm xl:max-w-sm lg:max-w-sm"
        onCloseModal={() => setShowDeleteModal(false)}
        modalTitle="Reject Proposal"
      />
    </div>
  );
};

export default PageProposalsInfluencer;