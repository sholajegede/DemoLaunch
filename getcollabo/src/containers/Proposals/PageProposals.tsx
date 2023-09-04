// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdArrowBackIosNew } from "react-icons/md";

export interface PageProposalsProps {
  className?: string;
}

const PageProposals: FC<PageProposalsProps> = ({ className = "" }) => {
  const { brand } = useContext(AuthContext);

  const [proposals, setProposals] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [loading, setLoading] = useState(false);

  const [singleProposal, setSingleProposal] = useState({});

  const [isProposalDeleted, setIsProposalDeleted] = useState(false);

  const history = useHistory();

  const [newQ1, setNewQ1] = useState("");

  const [newQ2, setNewQ2] = useState("");

  const [newQ3, setNewQ3] = useState("");

  const [newQ4, setNewQ4] = useState("");

  const [newQ5, setNewQ5] = useState("");

  const [newQ6, setNewQ6] = useState("");

  const [newQ7, setNewQ7] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brand]);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await newRequest.get(`/proposals/get/${brand.businessName}`);
      setProposals(response.data);
    };
    fetchProposals();
  }, []);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await newRequest.get(`/proposals/get/${brand.businessName}`);
      setProposals(response.data);
      history.push("/created/proposals");
    };
    fetchProposals();
  }, [isProposalDeleted === true]);

  const handleQ1Change = (event) => {
    setNewQ1(event.target.value);
  };

  const handleQ2Change = (event) => {
    setNewQ2(event.target.value);
  };

  const handleQ3Change = (event) => {
    setNewQ3(event.target.value);
  };

  const handleQ4Change = (event) => {
    setNewQ4(event.target.value);
  };

  const handleQ5Change = (event) => {
    setNewQ5(event.target.value);
  };

  const handleQ6Change = (event) => {
    setNewQ6(event.target.value);
  };

  const handleQ7Change = (event) => {
    setNewQ7(event.target.value);
  };

  const handleResendProposal = async (email, brandName, creatorName) => {
    try {
      const requestData = {
        email,
        brandName,
        creatorName,
      };

      const res = await newRequest.post("/proposals/resend", requestData);

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

  const handleViewProposal = async (proposalId) => {
    try {
      setSingleProposal({});

      setTimeout(async () => {
        const response = await newRequest.get(`/proposals/${proposalId}`);

        setSingleProposal(response.data);
        setShowModal(true);
      }, 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isUpdating === false) {
      const fetchUpdatedProposal = async () => {
        try {
          const response = await newRequest.get(
            `/proposals/${singleProposal._id}`
          );
          setSingleProposal(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUpdatedProposal();
    }
  }, [isUpdating, singleProposal._id]);

  const handleUpdateProposal = async (proposalId, e) => {
    e.preventDefault();

    try {
      const errors = {};
      if (!newQ1) {
        errors.q1 = "Please provide an overview of your brand.";
      }
      if (!newQ2) {
        errors.q2 = "Please provide the products/services you offer.";
      }
      if (!newQ3) {
        errors.q3 = "Please provide the budget for this project.";
      }
      if (!newQ6) {
        errors.q6 = "Please provide the timeline for this project.";
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setLoading(true);

      const updateProposal = {
        q1: newQ1,
        q2: newQ2,
        q3: newQ3,
        q4: newQ4,
        q5: newQ5,
        q6: newQ6,
        q7: newQ7,
        update: true,
        updateDate: currentDate,
      };

      const res = await newRequest.put(
        `/proposals/update/${proposalId}`,
        updateProposal
      );

      setNewQ1("");
      setNewQ2("");
      setNewQ3("");
      setNewQ4("");
      setNewQ5("");
      setNewQ6("");
      setNewQ7("");
      setLoading(false);

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

      setIsUpdating(false);
      setShowModal(false);
    } catch (error) {
      setLoading(false);
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

  const handleDeleteProposal = async (proposalId) => {
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
      setShowDeleteModal(false);
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

  const renderContent = () => {
    if (singleProposal && !isUpdating) {
      return (
        <div
          className="overflow-y-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <form action="" className="mb-4 ml-1 mr-6">
            <FormItem>
              <Label className="text-lg">Creator:</Label>
              <span className="block mt-1 text-base capitalize text-neutral-500 dark:text-neutral-400">
                {singleProposal.username}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Overview:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q1}
              </span>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q2}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Budget:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q3}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Project Details:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q4}
              </span>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q5}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Timeline:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q6}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Additional Notes:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {singleProposal.q7}
              </span>
            </FormItem>

            <div className="mt-5 space-x-3">
              <ButtonPrimary
                sizeClass="px-5 py-2"
                type="button"
                onClick={() => setIsUpdating(true)}
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <span className="mr-2">Edit</span>
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
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span className="text-red-500">Delete</span>
              </ButtonSecondary>
            </div>
            <ToastContainer className="text-sm" />
          </form>
        </div>
      );
    }

    if (isUpdating) {
      return (
        <div
          className="overflow-y-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <form action="" className="mb-4 ml-1 mr-6">
            <FormItem>
              <Label className="text-lg">Brand:</Label>
              <span className="block mt-1 text-base text-neutral-500 dark:text-neutral-400">
                {brand.businessName}
              </span>
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Overview:</Label>
              <Textarea
                rows={2}
                className="mb-1.5 mt-1"
                placeholder={singleProposal.q1}
                id="q1"
                value={newQ1}
                onChange={handleQ1Change}
              />
              {formErrors.q1 && (
                <div className="text-xs text-red-500">{formErrors.q1}</div>
              )}
              <Textarea
                rows={2}
                className="mb-2"
                placeholder={singleProposal.q2}
                id="q2"
                value={newQ2}
                onChange={handleQ2Change}
              />
              {formErrors.q2 && (
                <div className="text-xs text-red-500">{formErrors.q2}</div>
              )}
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Budget:</Label>
              <Textarea
                rows={2}
                className="mt-1 mb-2"
                placeholder={singleProposal.q3}
                id="q3"
                value={newQ3}
                onChange={handleQ3Change}
              />
              {formErrors.q3 && (
                <div className="text-xs text-red-500">{formErrors.q3}</div>
              )}
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Project Details:</Label>
              <Textarea
                rows={2}
                className="mb-1.5 mt-1"
                placeholder={singleProposal.q4}
                id="q4"
                value={newQ4}
                onChange={handleQ4Change}
              />
              <Textarea
                rows={2}
                className="mb-2"
                placeholder={singleProposal.q5}
                id="q5"
                value={newQ5}
                onChange={handleQ5Change}
              />
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Timeline:</Label>
              <Textarea
                rows={2}
                className="mt-1 mb-2"
                placeholder={singleProposal.q6}
                id="q6"
                value={newQ6}
                onChange={handleQ6Change}
              />
              {formErrors.q6 && (
                <div className="text-xs text-red-500">{formErrors.q6}</div>
              )}
            </FormItem>

            <FormItem className="mt-6">
              <Label className="text-lg">Additional Notes:</Label>
              <Textarea
                rows={2}
                className="mt-1 mb-2"
                placeholder={singleProposal.q7}
                id="q7"
                value={newQ7}
                onChange={handleQ7Change}
              />
            </FormItem>

            <div className="mt-5 space-x-3">
              <ButtonPrimary
                sizeClass="px-5 py-2"
                type="button"
                onClick={(e) => handleUpdateProposal(singleProposal._id, e)}
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
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>

                <span>{loading ? "Updating..." : "Update"}</span>
              </ButtonPrimary>
              <ButtonSecondary
                sizeClass="px-5 py-2"
                onClick={() => setIsUpdating(false)}
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>

                <span>Back</span>
              </ButtonSecondary>
            </div>
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
          Are you sure you want to delete this Proposal? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary
            sizeClass="px-5 py-2"
            type="button"
            onClick={() => handleDeleteProposal(singleProposal._id)}
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <span>Yes, delete</span>
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
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <span>Close</span>
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  return (
    <div
      className={`nc-PageProposals overflow-hidden relative ${className}`}
      data-nc-id="PageProposals"
    >
      <Helmet>
        <title>Proposals</title>

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
      <header className="max-w-2xl mx-auto my-10 text-center">
        <h2 className="flex items-center text-4xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Proposals
        </h2>
      </header>

      <div className="container py-2 mb-20 space-y-8 lg:py-4">
        <div className="space-x-4">
          <Link to="/brand">
            <ButtonSecondary sizeClass="py-1.5 px-4">
              <MdArrowBackIosNew className="mr-1" size={18} />
              <span className="mr-2">Back</span>
            </ButtonSecondary>
          </Link>
          <Link to="/search">
            <ButtonPrimary sizeClass="py-1.5 px-4">
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
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                />
              </svg>

              <span className="ml-1">Collaborate</span>
            </ButtonPrimary>
          </Link>
        </div>
        {proposals && proposals.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-6">
            {proposals.slice().reverse().map((proposal) => (
              <div key={proposal._id} className="max-w-sm">
                <div className="w-full max-w-sm bg-white border-2 border-gray-200 shadow rounded-3xl dark:bg-slate-800 dark:border-slate-800">
                  <div className="flex flex-col items-center pb-10">
                    <NcImage
                      containerClassName="rounded-xl overflow-hidden"
                      className="object-cover mt-8 mb-3 shadow h-28 w-28 rounded-xl"
                      src={proposal.creatorImg}
                      alt="creator-image"
                    />
                    <h5 className="mb-1 text-lg font-medium text-gray-900 capitalize dark:text-white">
                      {proposal.username}
                    </h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {proposal.update === true ? "Updated:" : "Created:"}{" "}
                      <span className="text-green-500">
                        {proposal.update === true
                          ? proposal.updateDate
                          : proposal.date}
                      </span>
                    </span>
                    <div className="flex mt-6 space-x-3">
                      <ButtonPrimary
                        sizeClass="px-5 py-2 rounded-xl"
                        onClick={() =>
                          handleResendProposal(
                            proposal.influencerEmail,
                            proposal.businessName,
                            proposal.username
                          )
                        }
                      >
                        Resend
                      </ButtonPrimary>
                      <ButtonSecondary
                        sizeClass="px-5 py-2 rounded-xl"
                        onClick={() => handleViewProposal(proposal._id)}
                      >
                        View
                      </ButtonSecondary>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-6">
            <p className="items-center justify-center">
              You have no proposals available
            </p>
          </div>
        )}
      </div>
      <ToastContainer className="text-sm" />

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-xl"
        onCloseModal={() => setShowModal(false)}
        modalTitle={isUpdating ? "Update Proposal" : "Proposal"}
      />

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showDeleteModal}
        renderContent={renderDeleteContent}
        contentExtraClass="max-w-xs sm:max-w-sm xl:max-w-sm lg:max-w-sm"
        onCloseModal={() => setShowDeleteModal(false)}
        modalTitle="Delete Proposal"
      />
    </div>
  );
};

export default PageProposals;