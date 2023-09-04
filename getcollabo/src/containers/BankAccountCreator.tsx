// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import { InfluencerProfileData } from "routers/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Bank {
  code: string;
  name: string;
}

interface AccountVerificationResult {
  data: {
    account_name: string;
    account_number: string;
  };
}

interface BankAccountCreatorProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const BankAccountCreator: FC<BankAccountCreatorProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [verificationResult, setVerificationResult] =
    useState<AccountVerificationResult | null>(null);

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>(banks);

  const [filteredBank, setFilteredBank] = useState<Bank[]>([]);

  const { influencer, loading, dispatch } = useContext(InfluencerAuthContext);

  const history = useHistory();

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
    // Fetch list of banks from backend
    newRequest
      .get("/influencer/banks")
      .then((response) => {
        setBanks(response.data);
        setFilteredBanks(response.data);
      })
      .catch((error) => {
        toast.error("Error getting bank lists", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  useEffect(() => {
    // Filter banks based on the search query
    const filtered = banks.filter((bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBank(filtered);

    const bankCode = filtered.map((bank) => bank.code);
    setSelectedBank(bankCode?.[0]);
  }, [searchQuery, banks]);

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleVerifyAccount = async (e) => {
    e.preventDefault();

    if (!selectedBank || !accountNumber) {
      toast.error("Please type in your account number and bank", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await newRequest.get<AccountVerificationResult>(
        `/influencer/verify-account?account_number=${encodeURIComponent(
          accountNumber
        )}&account_bank=${encodeURIComponent(selectedBank)}`
      );
      setVerificationResult(response.data);
      toast.success("Account verified successfully", {
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
      toast.error("Your account number and bank could not be verified", {
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

  const newBankOwnerName = verificationResult?.data.account_name || "";
  const newBankAccountNumber = verificationResult?.data.account_number || "";
  const bank = selectedBank
    ? banks.find((bank) => bank.code === selectedBank)?.name
    : "";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newBankOwnerName || !newBankAccountNumber || !bank) {
      toast.error("You need to verify your account before you can make an update", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    dispatch({ type: "UPDATE_START" });

    try {
      const updateBankInfo = {
        bankAccountName: newBankOwnerName,
        bankAccountNumber: newBankAccountNumber,
        bank: bank,
      };

      const res = await newRequest.put(
        `/influencer/bank/${influencer._id}`,
        updateBankInfo
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setVerificationResult(null);
      history.push(`/edit-bank/${influencer._id}`);
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div>
      <div className={`nc-BankAccount ${className}`} data-nc-id="BankAccount">
        <Helmet>
          <title>Payment - Creator</title>
        </Helmet>
        <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
          <main>
            <Tab.Group>
              <div className="flex flex-col justify-between lg:flex-row ">
                <Tab.List className="flex mb-4 space-x-0 overflow-x-auto sm:space-x-2">
                  <Tab>
                    {() => (
                      <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                        Edit Payment Details [
                        <span className="text-green-500">NGN</span>]
                      </div>
                    )}
                  </Tab>
                </Tab.List>
              </div>
            </Tab.Group>

            <span className="block mb-3 text-sm text-neutral-500 dark:text-neutral-400">
              To update your payment information, please follow these steps:
              <ul className="mt-6 mb-4">
                <li className="mt-2">
                  (1.) Type in your account number
                </li>
                <li className="mt-2">
                  (2.) Search for your bank
                </li>
                <li className="mt-2">
                  (3.) Click on "Verify" to verify your account
                </li>
              </ul>
              <span>Once your account has been verified, click on "Update" and your payment details would be saved.</span>
              <div className="mt-4">
                <span>Creators are credited 24hrs after an invoice or deliverable has been paid for.</span>
              </div>
            </span>
            
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div className="max-w-4xl mx-auto mt-8 space-y-2">
              {/* Bank details */}

              <div className="mb-12">
                <div className="inline-flex space-x-2">
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
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                    />
                  </svg>
                  <Label className="text-xl">Current details</Label>
                </div>

                <div className="mt-2">
                  <div className="mb-2 border border-gray-200 rounded-md shadow bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <ul className="px-4 py-3 sm:px-6">
                      <li className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                            Bank Name: {influencerProfile.bank}
                          </div>

                          <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                            Account Name: {influencerProfile.bankAccountName}
                          </div>

                          <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                            Account Number:{" "}
                            {influencerProfile.bankAccountNumber}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label>Account Number</Label>
                  <div className="mt-1.5 flex">
                    <Input
                      placeholder="0123456789"
                      type="text"
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                    />
                  </div>
                </div>

                <div>
                  <Label>Search</Label>
                  <div className="mt-1.5 flex">
                    <Input
                      placeholder="Type to find your bank..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Bank */}
                <div>
                  <Label>Bank</Label>
                  <div className="mt-1.5 flex">
                    <select
                      className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                      onChange={handleBankChange}
                    >
                      {filteredBank.map((bank, index) => (
                        <option key={`${bank.code}-${index}`} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <ButtonPrimary
                  onClick={(e) => handleVerifyAccount(e)}
                >
                  Verify
                </ButtonPrimary>
              </div>

              {/* ==== */}
              <div className="block text-center text-neutral-700 dark:text-neutral-300">
                <form>
                  {verificationResult && verificationResult.data && (
                    <div>
                      <p>
                        Account Name: {verificationResult.data.account_name}
                      </p>
                      <p>
                        Account Number: {verificationResult.data.account_number}
                      </p>
                      {selectedBank ? (
                        <p key={selectedBank.id}>
                          Bank:{" "}
                          {
                            banks.find((bank) => bank.code === selectedBank)
                              ?.name
                          }
                        </p>
                      ) : null}
                    </div>
                  )}

                  {/* Update and Back buttons */}
                  <div className="flex flex-col pt-2 mt-6 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="flex-1"
                      disabled={loading}
                      type="button"
                      onClick={handleUpdate}
                    >
                      Update
                    </ButtonPrimary>
                    <ButtonSecondary href={"/payments"} className="flex-1">
                      Back
                    </ButtonSecondary>
                  </div>
                </form>
              </div>
            </div>
          </main>

          <ToastContainer className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default BankAccountCreator;