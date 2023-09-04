// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import NcModal from "shared/NcModal/NcModal";
import { Tab } from "@headlessui/react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { Link } from "react-router-dom";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdPostAdd } from "react-icons/md";
import Badge from "shared/Badge/Badge";
import Pagination from "components/DatatablePagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface InfluencerInvoiceProps {
  className?: string;
}

const InfluencerInvoice: FC<InfluencerInvoiceProps> = ({ className = "" }) => {
  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const { influencer } = useContext(InfluencerAuthContext);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const [invoices, setInvoices] = useState([]);

  //
  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);
  //

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await newRequest.get(`/invoice/get/${influencer._id}`);
      setInvoices(response.data);
    };
    fetchInvoices();
  }, [influencer]);

  useEffect(() => {
    const newNotif = localStorage.getItem("invoiceData");

    localStorage.removeItem("invoiceData");

    if (newNotif) {
      toast.success(newNotif, {
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
    localStorage.removeItem("invoiceData");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const data = invoices;
  const totalItems = data?.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const theData = invoices.reverse();

  const paginatedData = theData
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-InfluencerInvoice  ${className}`}
          data-nc-id="InfluencerInvoice"
        >
          <Helmet>
            <title>Invoices</title>
          </Helmet>

          <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                    <Tab>
                      {() => (
                        <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                          Invoices
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

                <span className="text-sm">Take a tour of Invoices</span>
              </p>
              <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
                <div className="w-full mt-2">
                  <div className="relative w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                      <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                          <label className="sr-only">Search</label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="simple-search"
                              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Search"
                              required=""
                            />
                          </div>
                        </form>
                      </div>
                      <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                        <Link
                          to="/invoice"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-3xl disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
                        >
                          <MdPostAdd size={18} className="mr-1.5" />
                          <span className="text-sm">Create an invoice</span>
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Id
                            </th>
                            <th scope="col" className="px-10 py-3">
                              Brand
                            </th>

                            <th scope="col" className="px-10 py-3">
                              Status
                            </th>

                            <th scope="col" className="px-10 py-3">
                              Amount
                            </th>

                            <th scope="col" className="px-10 py-3">
                              Created
                            </th>

                            <th scope="col" className="px-10 py-3">
                              {""}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {paginatedData &&
                            paginatedData
                              .map((index: any, i: any) => (
                                <tr
                                  key={index.toString() + "-" + i}
                                  className="bg-white border-b dark:bg-slate-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <th scope="row" className="px-4 py-3">
                                    <span className="font-semibold">
                                      {index.paperId}
                                    </span>
                                  </th>

                                  <td scope="row" className="px-10 py-4">
                                    <span className="font-semibold">
                                      {index.brandName}
                                    </span>
                                  </td>

                                  <td className="px-10 py-4">
                                    {index.status ? (
                                      <div className="flex items-center">
                                        <Badge
                                          className="flex items-center justify-center text-center rounded"
                                          color="green"
                                          name="Paid"
                                        />
                                      </div>
                                    ) : index.status === false ? (
                                      <div className="flex items-center">
                                        <Badge
                                          className="flex items-center justify-center text-center rounded"
                                          color="yellow"
                                          name="Pending"
                                        />
                                      </div>
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>

                                  <td scope="row" className="px-10 py-4">
                                    <span className="inline-flex mt-2">
                                      <TbCurrencyNaira className="w-[19px] h-[19px]" />
                                      {index.rate?.toLocaleString()}
                                    </span>
                                  </td>

                                  <td className="px-10 py-4">
                                    <span>{index.date}</span>
                                  </td>

                                  <td className="px-10 py-4">
                                    {index ? (
                                      <>
                                        <Link to={`/preview/${index._id}`}>
                                          <ButtonSecondary sizeClass="py-2 px-5">
                                            <span className="mr-2">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                              </svg>
                                            </span>
                                            <span className="text-sm">
                                              View
                                            </span>
                                          </ButtonSecondary>
                                        </Link>
                                      </>
                                    ) : (
                                      <div>{""}</div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>

                    <Pagination
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </section>
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
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </div>
  );
};

export default InfluencerInvoice;