// @ts-nocheck
import React, { FC, useEffect, useContext, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import { Tab } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormItem from "components/FormItem";
import Textarea from "shared/Textarea/Textarea";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TbCurrencyNaira } from "react-icons/tb";
import NcModal from "shared/NcModal/NcModal";
import InputPreview from "shared/Input/InputPreview";

export interface DeliverableInvoiceProps {
  className?: string;
}

const DeliverableInvoice: FC<DeliverableInvoiceProps> = ({
  className = "",
}) => {
  const { deliverableId } = useParams<{ deliverableId: string }>();

  const [loading, setLoading] = useState(false);

  const { influencer } = useContext(InfluencerAuthContext);

  const [newBrand, setNewBrand] = useState("");
  const [newBrandEmail, setNewBrandEmail] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newInvoiceId, setNewInvoiceId] = useState("");

  const [copy, setCopy] = useState(false);

  const [fetchedDeliverable, setFetchedDeliverable] = useState({});

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchDeliverable = async () => {
      const response = await newRequest.get(
        `/influencer/deliverable/${influencer.username}/${deliverableId}`
      );
      setFetchedDeliverable(response.data);
    };
    fetchDeliverable();
  }, [deliverableId]);

  useEffect(() => {
    if (newBrand && newBrandEmail) {
      const popupTimeout = setTimeout(() => {
        setShowPopup(true);
      }, 100000);
      return () => clearTimeout(popupTimeout);
    }
  }, [newBrandEmail]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrand(event.target.value);
  };

  const handleBrandEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBrandEmail(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNewNotes(event.target.value);
  };

  const rateNumber = parseFloat(fetchedDeliverable.rate);

  const totalAmount = rateNumber;

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatTotalAmount = (totalAmount = 0) => {
    return formatNumber(totalAmount);
  };

  const formattedAmount = formatTotalAmount(totalAmount);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(Date.now());

  const generateNumericId = () => {
    const min = 1000; // Minimum 6-digit number
    const max = 9999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const numericId = generateNumericId();

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newBrand || !newBrandEmail) {
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
      setLoading(false);
      return;
    }

    try {
      const newInvoice = {
        influencerId: influencer._id,
        paperId: numericId,
        username: influencer.username,
        businessName: newBrand,
        brandEmail: newBrandEmail,
        influencerEmail: influencer.email,
        influencerImg: influencer.img,
        description: fetchedDeliverable.description,
        deliveryTime: fetchedDeliverable.deliveryTime,
        rate: fetchedDeliverable.rate,
        notes: newNotes,
        date: currentDate,
        status: false,
      };

      const res = await newRequest.post("/invoice/create", newInvoice);
      setNewBrand("");
      setNewBrandEmail("");
      setNewNotes("");
      setLoading(false);
      const invoiceId = res.data.invoiceId;
      setNewInvoiceId(invoiceId);
      toast.success("👍 Invoice created successfully!", {
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
      setLoading(false);
      if (error.response) {
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

  const [submissionTime, setSubmissionTime] = useState("");

  useEffect(() => {
    if (fetchedDeliverable && fetchedDeliverable.deliveryTime) {
      setSubmissionTime(
        calculateSubmissionTime(fetchedDeliverable.deliveryTime)
      );
    }
  }, [fetchedDeliverable]);

  const calculateSubmissionTime = (timeframe) => {
    // Assuming the input format is "X days", "X weeks", or "X months"
    const timeRegex =
      /^(\d+)\s+(dy|dys|day|days|wk|wks|week|weeks|mn|mns|month|months)$/i;
    const match = timeframe.match(timeRegex);
    if (match) {
      const [, count, unit] = match;
      const currentDate = new Date();
      if (unit.match(/d(ay)?s?/i)) {
        currentDate.setDate(currentDate.getDate() + parseInt(count));
      } else if (unit.match(/w(eek)?s?/i)) {
        currentDate.setDate(currentDate.getDate() + parseInt(count) * 7);
      } else if (unit.match(/m(onth)?s?/i)) {
        currentDate.setMonth(currentDate.getMonth() + parseInt(count));
      }
      const submissionDate = currentDate.toDateString();
      return submissionDate;
    }
    return "";
  };

  const renderPopupContent = () => {
    return (
      <div>
        <p className="mt-1 text-sm sm:text-base lg:text-base">
          Hey{" "}
          <span className="font-semibold capitalize text-primary-6000">
            {influencer.username}!
          </span>
          👋
        </p>
        <p className="mt-4 mb-3 text-sm sm:text-base lg:text-base">
          Just a quick heads up, you wouldn't be able to edit this invoice once
          it has been created.
        </p>

        <p className="mt-2 mb-3 text-sm sm:text-base lg:text-base">Cool?</p>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowPopup(false);
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>

            <span>Sure, I understand</span>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-DeliverableInvoice ${className}`}
        data-nc-id="DeliverableInvoice"
      >
        <Helmet>
          <title>Deliverable Invoice</title>
        </Helmet>
        <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
          <main>
            <Tab.Group>
              <div className="flex flex-col justify-between lg:flex-row ">
                <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                  <Tab>
                    {() => (
                      <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                        New Invoice
                      </div>
                    )}
                  </Tab>
                </Tab.List>
              </div>
            </Tab.Group>
            <span className="block mt-5 mb-3 text-base text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
              Create a new booking invoice
            </span>
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <div className="mt-8 space-y-5 sm:space-y-6 md:sm:space-y-8">
              <label className="block">
                <Label>Brand <span className="text-red-500">*</span></Label>
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </span>
                  <Input
                    type="text"
                    id="brand"
                    name="brand"
                    className="!rounded-l-none"
                    placeholder="Enter the brand's name"
                    rows={1.5}
                    value={newBrand}
                    onChange={handleBrandChange}
                  />
                </div>
              </label>

              <label className="block">
                <Label>Brand Email <span className="text-red-500">*</span></Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="!rounded-l-none"
                    placeholder="Enter their business email address"
                    rows={1.5}
                    value={newBrandEmail}
                    onChange={handleBrandEmailChange}
                  />
                </div>
              </label>

              <label className="block">
                <Label>Deliverable</Label>
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
                    disabled
                    type="text"
                    name="deliverable"
                    className="!rounded-l-none"
                    rows={1.5}
                    value={fetchedDeliverable.description}
                  />
                </div>
              </label>

              <label className="block mt-6">
                <Label>Booking Rate</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <TbCurrencyNaira size={22} />
                  </span>
                  <Input
                    disabled
                    type="text"
                    name="rate"
                    className="!rounded-l-none"
                    rows={1}
                    value={formattedAmount}
                  />
                </div>
              </label>

              <label className="block">
                <Label>Timeframe</Label>
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
                    disabled
                    type="text"
                    className="!rounded-l-none"
                    rows={1.5}
                    name="deliveryTime"
                    value={fetchedDeliverable.deliveryTime}
                  />
                </div>
              </label>

              {/* ---- */}
              {submissionTime && (
                <FormItem
                  label="Delivery Date"
                  desc={
                    <span>
                      Would be displayed on your dashboard once the invoice has
                      been paid
                    </span>
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </span>
                    <Input
                      disabled
                      type="text"
                      className="!rounded-l-none"
                      value={submissionTime}
                    />
                  </div>
                </FormItem>
              )}

              <label className="block mt-6">
                <Label>Other Notes</Label>
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                  <Textarea
                    id="notes"
                    name="notes"
                    className="!rounded-l-none"
                    placeholder="Type other notes you would like the brand to read..."
                    rows={4}
                    value={newNotes}
                    onChange={handleNotesChange}
                  />
                </div>
              </label>

              <label className="block mt-6">
                <Label className="text-xl">
                  Payment Due:{" "}
                  <span className="text-green-500">{`NGN ${
                    formattedAmount || "0"
                  }`}</span>
                </Label>
              </label>

              <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <ButtonPrimary
                  disabled={loading}
                  type="button"
                  onClick={handleCreateInvoice}
                  className=""
                >
                  {loading ? "Creating your invoice..." : "Create invoice"}
                </ButtonPrimary>
                <Link to={`/view/${influencer.username}/${deliverableId}`}>
                  <ButtonSecondary type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    <span className="ml-2">Back</span>
                  </ButtonSecondary>
                </Link>
              </div>
              <ToastContainer className="text-sm" />

              <div className="px-8 py-6 border border-gray-200 shadow-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-2xl">
                <div className="flex flex-col mb-6 space-y-2 sm:space-y-0 sm:space-x-3">
                  <FormItem label="Invoice Link">
                    <div className="relative">
                      <CopyToClipboard
                        text={`https://getcollabo.io/pay/${
                          influencer.username
                        }/${newInvoiceId || "**********"}`}
                        onCopy={() => {
                          setCopy(true);
                        }}
                      >
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 z-10 flex items-center px-3 text-white border-2 bg-primary-6000 dark:bg-primary-6000 border-primary-6000 rounded-2xl focus:outline-none"
                        >
                          {!copy ? (
                            <>
                              <IoCopyOutline className="mr-1.5" size={18} />
                              <p title="Copy booking link" className="text-sm">
                                Copy
                              </p>
                            </>
                          ) : (
                            <>
                              <IoCopy className="mr-1.5" size={18} />
                              <p title="Link copied" className="text-sm">
                                Link copied
                              </p>
                            </>
                          )}
                        </button>
                      </CopyToClipboard>
                      <InputPreview
                        type="text"
                        disabled
                        className="w-full pr-10 mb-2 bg-transparent"
                        placeholder={`getcollabo.io/pay/${
                          influencer.username
                        }/${newInvoiceId || "**********"}`}
                      />
                    </div>
                  </FormItem>
                </div>

                {newInvoiceId ? (
                  <Link to={`/preview/${newInvoiceId}`}>
                    <ButtonSecondary sizeClass="px-6 py-2" className="mb-4">
                      Preview Invoice
                    </ButtonSecondary>
                  </Link>
                ) : null}

                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                <div className="mt-10 text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    All invoices & payments are insured by GetCollabo
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>

        <NcModal
          renderTrigger={() => null}
          isOpenProp={showPopup}
          renderContent={renderPopupContent}
          contentExtraClass="max-w-md"
          onCloseModal={() => setShowPopup(false)}
          modalTitle="🔔 Notification"
        />
      </div>
    </>
  );
};

export default DeliverableInvoice;