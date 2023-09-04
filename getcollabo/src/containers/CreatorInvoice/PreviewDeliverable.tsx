// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import newRequest from "utils/newRequest";
import NcImage from "shared/NcImage/NcImage";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";
import { TbCurrencyNaira } from "react-icons/tb";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface PreviewDeliverableProps {
  className?: string;
}

const PreviewDeliverable: FC<PreviewDeliverableProps> = ({
  className = "",
}) => {
  const { username, deliverableId } = useParams<{
    username: string;
    deliverableId: string;
  }>();

  const { influencer } = useContext(InfluencerAuthContext);

  const [fetchedDeliverable, setFetchedDeliverable] = useState({});

  const [copy, setCopy] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchDeliverable = async () => {
      const response = await newRequest.get(
        `/influencer/deliverable/${username}/${deliverableId}`
      );
      setFetchedDeliverable(response.data);
    };
    fetchDeliverable();
  }, [username, deliverableId]);

  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedNumber.replace(/\.?0+$/, "");
  };

  const deliverableRate = fetchedDeliverable.rate;

  const formatDeliverableAmount = (deliverableRate = 0) => {
    return formatNumber(deliverableRate);
  };

  const formattedDeliverableAmount = formatDeliverableAmount(deliverableRate);

  const deleteDeliverable = async () => {
    try {
      await newRequest.delete(
        `/influencer/delete/${influencer._id}/deliverables/${deliverableId}`
      );
      toast.success("😢 Your deliverable is being deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        history.push("/deliverables");
      }, 5000);
    } catch (error) {
      console.error(error);
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
  };

  return (
    <>
      <div
        className={`nc-PreviewDeliverable ${className}`}
        data-nc-id="PreviewDeliverable"
      >
        <Helmet>
          <title>Preview Deliverable</title>
        </Helmet>

        <div className="max-w-3xl mx-auto mt-24 space-y-5">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Deliverable Preview
            </h2>
          </div>

          <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Link to="/deliverables">
                <ButtonSecondary type="button" sizeClass="py-2 px-5">
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

          <div className="absolute z-20 right-3 top-40 sm:right-3 xl:right-64">
            <Link to={`/invoiceNew/${deliverableId}`}>
              <ButtonPrimary type="button" sizeClass="py-2 px-5" className="flex-1 w-full">
                Generate invoice
              </ButtonPrimary>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get paid by brands with an invoice, even if they're not on GetCollabo
          </p>

          <div className="space-y-2">
            <div className="px-8 py-6 border-2 shadow-xl rounded-2xl">
              <div className="flex flex-col mb-6 space-y-2 sm:space-y-0 sm:space-x-3">
                <FormItem label="Deliverable Link">
                  <div className="relative">
                    <CopyToClipboard
                      text={`https://getcollabo.io/deliverable/${username}/${deliverableId}`}
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
                            <p title="Copy deliverable" className="text-sm">
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
                    <Input
                      type="text"
                      disabled
                      className="w-full pr-10 mb-2 bg-transparent"
                      placeholder={`getcollabo.io/deliverable/${username}/${deliverableId}`}
                    />
                  </div>
                </FormItem>
              </div>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="flex justify-between mt-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Creator</h2>
                  <p className="capitalize text-neutral-500 dark:text-neutral-400">
                    {influencer.username}
                  </p>
                </div>
                <div>
                  <NcImage
                    alt="Creator Image"
                    className="object-cover w-20 h-20 rounded-lg"
                    src={influencer.img}
                  />
                </div>
              </div>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="flex justify-between mb-2">
                <div className="mt-6 text-sm">
                  <h3 className="mb-2 text-lg font-medium">Details</h3>

                  <ul className="mb-4 list-disc text-neutral-500 dark:text-neutral-400">
                    <li className="flex items-center mb-1.5">
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
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <p className="">
                        Deliverable: {fetchedDeliverable.description}
                      </p>
                    </li>
                    <li className="flex items-center mb-1.5">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="">
                        Timeframe: {fetchedDeliverable.deliveryTime}
                      </p>
                    </li>
                    <li className="flex items-center">
                      <TbCurrencyNaira
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      <p>
                        Booking Rate: <span>{formattedDeliverableAmount}</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="mt-40">
                  <h3 className="text-lg font-medium">Payment Due:</h3>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    NGN {formattedDeliverableAmount}
                  </p>
                </div>
              </div>

              <div className="mt-16 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  All payments are insured by GetCollabo
                </p>
              </div>
            </div>

            <div className="flex flex-col pt-4 mt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <ButtonSecondary
                onClick={() => deleteDeliverable()}
                sizeClass="py-2 px-5"
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>

                <span className="text-red-500">Delete deliverable</span>
              </ButtonSecondary>
            </div>
          </div>
        </div>

        <ToastContainer className="text-sm" />
      </div>
    </>
  );
};

export default PreviewDeliverable;