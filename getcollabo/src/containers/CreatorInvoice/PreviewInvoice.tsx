// @ts-nocheck
import React, { FC, useContext, useEffect, useState, useRef } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { Link, useParams, useHistory } from "react-router-dom";
import newRequest from "utils/newRequest";
import NcImage from "shared/NcImage/NcImage";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";
import Badge from "shared/Badge/Badge";
import { TbCurrencyNaira } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SwitchDarkModeInvoice from "shared/SwitchDarkMode/SwitchDarkModeInvoice";

export interface PreviewInvoiceProps {
  className?: string;
}

const PreviewInvoice: FC<PreviewInvoiceProps> = ({ className = "" }) => {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const { influencer } = useContext(InfluencerAuthContext);

  const [fetchedInvoice, setFetchedInvoice] = useState({});

  const [copy, setCopy] = useState(false);

  const history = useHistory();

  const pdfRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await newRequest.get(`/invoice/find/${invoiceId}`);
      setFetchedInvoice(response.data);
    };
    fetchInvoice();
  }, [invoiceId]);

  const formatNumber = (number: number) => {
    const formattedNumber = number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedNumber.replace(/\.?0+$/, "");
  };

  const invoicePrice = fetchedInvoice.rate;

  const formatInvoiceAmount = (invoicePrice = 0) => {
    return formatNumber(invoicePrice);
  };

  const formattedInvoiceAmount = formatInvoiceAmount(invoicePrice);

  const deleteInvoice = async () => {
    try {
      const res = await newRequest.delete(
        `/invoice/delete/${influencer._id}/${invoiceId}`
      );

      const sendData = res.data.message;
      toast.success("😢 Your invoice is being deleted", {
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
        history.push("/invoices");

        localStorage.setItem("invoiceData", `${sendData}`);
      }, 5000);
    } catch (error) {
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

  const downloadInvoice = async () => {
    const input = pdfRef.current;
    const dpi = 300;
    const scale = dpi / 96;

    const canvas = document.createElement("canvas");
    canvas.width = input.offsetWidth * scale;
    canvas.height = input.offsetHeight * scale;

    const context = canvas.getContext("2d");
    context.scale(scale, scale);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${influencer.username}'s invoice.pdf`);
    });
  };

  return (
    <>
      <div
        className={`nc-PreviewInvoice ${className}`}
        data-nc-id="PreviewInvoice"
      >
        <Helmet>
          <title>Preview Invoice</title>
        </Helmet>
        <div className="max-w-3xl mx-auto mt-24 space-y-6">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Invoice Preview
            </h2>
          </div>

          <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Link to="/invoices">
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

          <div className="absolute z-20 right-3 top-40 sm:right-3 xl:right-60 dark:hidden">
            <ButtonPrimary
              onClick={downloadInvoice}
              className="mb-2"
              sizeClass="py-2 px-5 mr-4"
            >
              <span className="mr-2">
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </span>

              <span>Download</span>
            </ButtonPrimary>
          </div>

          <p className="hidden text-sm text-gray-500 dark:block dark:text-gray-400">
            This invoice is downloadable in "light mode". Click on
            this icon [<SwitchDarkModeInvoice />] to set the page to light mode.
          </p>

          <div className="flex flex-col mb-6 space-y-2 sm:space-y-0 sm:space-x-3">
            <FormItem label="Payment Link">
              <div className="relative">
                <CopyToClipboard
                  text={`https://getcollabo.io/pay/${influencer.username}/${invoiceId}`}
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
                <Input
                  type="text"
                  disabled
                  className="w-full pr-10 mb-2 bg-transparent"
                  placeholder={`getcollabo.io/pay/${influencer.username}/${invoiceId}`}
                />
              </div>
            </FormItem>
          </div>

          <div className="space-y-2">
            <div className="px-8 py-6 border-2 shadow-xl rounded-2xl">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Invoice</h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Invoice #{fetchedInvoice.paperId}
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

              <div className="mb-8">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Brand</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.brandName}
                    </p>
                  </div>
                  <div className="mr-3">
                    <h3 className="text-lg font-medium">Creator</h3>
                    <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
                      {influencer.username}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Brand Email</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.brandEmail}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">Date Created</h3>
                    <p className="inline-flex text-sm text-neutral-500 dark:text-neutral-400">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>

                      <span className="mt-0.5">{fetchedInvoice.date}</span>
                    </p>
                  </div>
                  <div className="mr-3">
                    <h3 className="text-lg font-medium">Status</h3>
                    <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.status === true ? (
                        <Badge
                          className="flex items-center justify-center px-4 py-0.5 text-center rounded"
                          color="green"
                          name="Paid"
                        />
                      ) : (
                        <Badge
                          className="flex items-center justify-center px-4 py-0.5 text-center rounded"
                          color="yellow"
                          name="Pending"
                        />
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="flex justify-between mb-2">
                <div className="mt-6 text-sm">
                  <h3 className="mb-2 text-lg font-medium">Booking Details</h3>

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
                        Deliverable: {fetchedInvoice.description}
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
                        Timeframe: {fetchedInvoice.deliveryTime}
                      </p>
                    </li>
                    <li className="flex items-center">
                      <TbCurrencyNaira
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      <p>
                        Booking Rate: <span>{formattedInvoiceAmount}</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="mt-40">
                  <h3 className="text-lg font-medium">Payment Due:</h3>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    NGN {formattedInvoiceAmount}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-2 text-lg font-medium">Other Notes</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {fetchedInvoice.notes || "No notes"}
                </p>
              </div>

              <div className="mt-16 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  All invoices & payments are insured by GetCollabo
                </p>
              </div>
            </div>

            {/**DOWNLOADABLE INVOICE */}
            <div
              ref={pdfRef}
              className="hidden px-8 py-6 border-2 shadow-xl rounded-2xl"
            >
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Invoice</h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Invoice #{fetchedInvoice.paperId}
                  </p>
                </div>
                <div>
                  <img
                    className="object-cover w-full h-8 rounded-lg"
                    src={require("./ourLogo.png")}
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Brand</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.brandName}
                    </p>
                  </div>
                  <div className="mr-3">
                    <h3 className="text-lg font-medium">Creator</h3>
                    <p className="text-sm capitalize text-neutral-500 dark:text-neutral-400">
                      {influencer.username}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Brand Email</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.brandEmail}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">Date Created</h3>
                    <p className="inline-flex text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="mt-0.5">{fetchedInvoice.date}</span>
                    </p>
                  </div>
                  <div className="mr-5">
                    <h3 className="text-lg font-medium">Status</h3>
                    <p className="inline-flex text-sm capitalize text-neutral-500 dark:text-neutral-400">
                      {fetchedInvoice.status === true ? (
                        <span className="font-medium text-green-400">Paid</span>
                      ) : (
                        <span className="font-medium text-yellow-400">
                          Pending
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="flex justify-between mb-2">
                <div className="mt-6 text-sm">
                  <h3 className="mb-2 text-lg font-medium">Booking Details</h3>

                  <ul className="mb-4 list-disc text-neutral-500 dark:text-neutral-400">
                    <li className="flex items-center mb-1.5">
                      <p className="">
                        Deliverable: {fetchedInvoice.description}
                      </p>
                    </li>
                    <li className="flex items-center mb-1.5">
                      <p className="">
                        Timeframe: {fetchedInvoice.deliveryTime}
                      </p>
                    </li>
                    <li className="flex items-center">
                      <p>
                        Booking Rate: <span>{formattedInvoiceAmount}</span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="mt-40">
                  <h3 className="text-lg font-medium">Payment Due:</h3>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    NGN {formattedInvoiceAmount}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-2 text-lg font-medium">Other Notes</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {fetchedInvoice.notes || "No notes"}
                </p>
              </div>

              <div className="mt-16 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  All invoices & payments are insured by GetCollabo
                </p>
              </div>
            </div>

            <div className="flex flex-col pt-4 mt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <ButtonSecondary
                onClick={() => deleteInvoice()}
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

                <span className="text-red-500">Delete invoice</span>
              </ButtonSecondary>
            </div>
          </div>
        </div>

        <ToastContainer className="text-sm" />
      </div>
    </>
  );
};

export default PreviewInvoice;