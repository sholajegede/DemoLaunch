// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import TimeCountDown from "./TimeCountDown";
import Reviews from "./Reviews";
import AccordionInfo from "./AccordionInfo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useParams, useHistory } from "react-router-dom";
import { InfluencerData } from "routers/types";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import NcModal from "shared/NcModal/NcModal";
import FormItem from "components/FormItem";
import Textarea from "shared/Textarea/Textarea";
import Label from "components/Label/Label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "utils/upload";
import { CheckIcon } from "@heroicons/react/solid";

export interface InfluencerDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const InfluencerDetailPage: FC<InfluencerDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { username } = useParams();

  const { brand } = useContext(AuthContext);

  const [influencer, setInfluencer] = useState<InfluencerData>({});

  const [copy, setCopy] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showOffModal, setShowOffModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [newQ1, setNewQ1] = useState("");

  const [newQ2, setNewQ2] = useState("");

  const [newQ3, setNewQ3] = useState("");

  const [newQ4, setNewQ4] = useState("");

  const [newQ5, setNewQ5] = useState("");

  const [newQ6, setNewQ6] = useState("");

  const [newQ7, setNewQ7] = useState("");

  const [proposalCreated, setProposalCreated] = useState(false);

  const [existingProposalCreated, setExistingProposalCreated] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const response = await newRequest.get(`/influencer/get/${username}`);
        if (response.data) {
          setInfluencer(response.data);
        }
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

    fetchInfluencer();
  }, [username]);

  useEffect(() => {
    const checkExistingProposal = async () => {
      try {
        const response = await newRequest.get(
          `/proposals/check/${influencer?._id}/${brand?._id}`
        );
        const proposalExists = response.data.proposalExists;
        setExistingProposalCreated(proposalExists);
      } catch (error) {
        console.error("Error checking existing proposal:", error);
      }
    };

    checkExistingProposal();
  }, [influencer, brand]);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(Date.now());

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

  const handleLoginLogic = async () => {
    history.push("/login-brand");
    localStorage.setItem("previousLocation", `book/${influencer.username}`);
  };

  const headerName = influencer?.username
    ? influencer.username.charAt(0).toUpperCase() +
      influencer.username.slice(1).toLowerCase()
    : "Creator";

  const handleCreateProposal = async (e) => {
    e.preventDefault();

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

    try {
      const newProposal = {
        influencerId: influencer._id,
        brandId: brand._id,
        username: influencer.username,
        businessName: brand.businessName,
        creatorImg: influencer.img,
        brandLogo: brand.logo,
        influencerEmail: influencer.email,
        brandEmail: brand.email,
        q1: newQ1,
        q2: newQ2,
        q3: newQ3,
        q4: newQ4,
        q5: newQ5,
        q6: newQ6,
        q7: newQ7,
        status: "received",
        date: currentDate,
        update: false,
      };

      const res = await newRequest.post("/proposals/create", newProposal);
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

      setProposalCreated(true);
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
        toast.error("Unable to create proposal", {
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

  //NEW OFF BRAND
  const [newBrand, setNewBrand] = useState("");
  const [newBrandEmail, setNewBrandEmail] = useState("");
  const [file, setFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [brandNotif, setBrandNotif] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size;
    const maxSize = 10 * 1024 * 1024;

    if (fileSize > maxSize) {
      setErrorMessage("File size exceeds 10MB limit.");
      event.target.value = null;
      setFile(null);
    } else {
      setFile(file);
      setErrorMessage("");
    }
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrand(event.target.value);
    setBrandNotif(event.target.value);
  };

  const handleBrandEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBrandEmail(event.target.value);
  };

  const handleCreateOffProposal = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newBrand) {
      errors.brandName = "Please provide the name of your brand/business.";
    }
    if (!newBrandEmail) {
      errors.brandEmail = "Please provide a business email address.";
    }
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

    const url = await upload(file);

    try {
      const newProposal = {
        influencerId: influencer._id,
        username: influencer.username,
        businessName: newBrand,
        creatorImg: influencer.img,
        brandLogo: url || "",
        influencerEmail: influencer.email,
        brandEmail: newBrandEmail,
        q1: newQ1,
        q2: newQ2,
        q3: newQ3,
        q4: newQ4,
        q5: newQ5,
        q6: newQ6,
        q7: newQ7,
        status: "received",
        date: currentDate,
        update: false,
      };

      const res = await newRequest.post("/proposals/off-create", newProposal);
      setNewBrand("");
      setNewBrandEmail();
      setFile(null);
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

      setProposalCreated(true);
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
        toast.error("Unable to create proposal", {
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

  const brandFeatures: UserItem[] = [
    {
      features: [
        "Access to top creators",
        "High-quality deliverables",
        "Fast and secure booking",
        "Multiple ways to make payments",
        "Seamless collaboration management",
        "Content tracking and analytics",
      ],
    },
  ];

  const renderOffContent = () => {
    if (proposalCreated === true) {
      return (
        <div>
          <p className="mt-1 mb-3 text-sm sm:text-base lg:text-base">
            Hi <span className="font-semibold capitalize">{brandNotif}</span>👋
          </p>
          <p className="mb-3 text-sm sm:text-base lg:text-base">
            Your proposal has been sent to{" "}
            <span className="capitalize">{influencer.username}.</span> You're
            off to a great start with this Collaboration!🎉
          </p>

          <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700"></div>

          <p className="mt-3 mb-6 text-sm sm:text-base lg:text-base">
            Want to get the full experience of GetCollabo? Sign up to unlock all
            these benefits for your brand.
          </p>

          <nav className="mt-6 mb-8 space-y-4">
            {brandFeatures[0]?.features && brandFeatures[0].features.length > 0
              ? brandFeatures[0].features.map((item, index) => (
                  <li className="flex items-center" key={index}>
                    <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                      <CheckIcon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </li>
                ))
              : null}
          </nav>

          <Link to="/create-brand">
            <ButtonPrimary sizeClass="py-2 px-8" className="text-base">
              Signup for free
            </ButtonPrimary>
          </Link>
        </div>
      );
    }

    return (
      <div
        className="overflow-y-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full"
        style={{ maxHeight: "510px", overflowY: "auto" }}
      >
        <form action="" className="mb-4 ml-1 mr-4">
          <FormItem>
            <Label className="text-lg">
              Business name <span className="text-red-500">*</span>
            </Label>
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
                placeholder="What's the name of your brand?"
                rows={1.5}
                value={newBrand}
                onChange={handleBrandChange}
              />
            </div>
            {formErrors.brandName && (
              <div className="text-xs text-red-500">{formErrors.brandName}</div>
            )}
          </FormItem>

          <FormItem className="mt-4">
            <Label className="text-lg">
              Business email <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-envelope"></i>
              </span>
              <Input
                type="email"
                id="email"
                name="email"
                className="!rounded-l-none"
                placeholder="What's your brand's email?"
                rows={1.5}
                value={newBrandEmail}
                onChange={handleBrandEmailChange}
              />
            </div>
            {formErrors.brandEmail && (
              <div className="text-xs text-red-500">
                {formErrors.brandEmail}
              </div>
            )}
          </FormItem>

          <FormItem className="mt-4">
            <Label className="text-lg">Business logo</Label>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-300">
              SVG, PNG, or JPG
            </p>
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
              <div className="relative flex items-center justify-center w-32 h-24 overflow-hidden rounded-2xl">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : `<svg
                    className="w-full h-full"
                    viewBox="0 0 197 193"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M145.828 48.9822C134.953 48.9822 126.105 57.8301 126.105 68.7051C126.105 79.5801 134.953 88.428 145.828 88.428C156.703 88.428 165.551 79.5805 165.551 68.7051C165.551 57.8293 156.704 48.9822 145.828 48.9822ZM145.828 80.7741C139.173 80.7741 133.759 75.3602 133.759 68.7051C133.759 62.0501 139.173 56.6361 145.828 56.6361C152.483 56.6361 157.897 62.0501 157.897 68.7051C157.897 75.3594 152.483 80.7741 145.828 80.7741Z"
                      fill="currentColor"
                    />
                    <path
                      d="M145.963 171.49C145.867 171.256 145.748 171.034 145.611 170.828C145.473 170.617 145.312 170.422 145.136 170.246C144.96 170.07 144.765 169.909 144.554 169.771C144.348 169.634 144.126 169.515 143.892 169.419C143.663 169.324 143.422 169.247 143.177 169.201C142.683 169.102 142.178 169.102 141.684 169.201C141.439 169.247 141.198 169.324 140.969 169.419C140.735 169.515 140.513 169.634 140.306 169.771C140.096 169.909 139.901 170.07 139.725 170.246C139.549 170.422 139.388 170.617 139.25 170.828C139.112 171.034 138.994 171.256 138.898 171.49C138.802 171.719 138.726 171.96 138.68 172.205C138.63 172.45 138.603 172.703 138.603 172.952C138.603 173.2 138.63 173.453 138.68 173.698C138.726 173.943 138.802 174.184 138.898 174.413C138.994 174.647 139.112 174.869 139.25 175.075C139.388 175.286 139.549 175.481 139.725 175.657C139.812 175.745 139.905 175.829 140.001 175.908C140.099 175.987 140.201 176.063 140.306 176.132C140.513 176.269 140.735 176.388 140.969 176.484C141.198 176.579 141.439 176.656 141.684 176.702C141.929 176.752 142.182 176.778 142.43 176.778C142.679 176.778 142.932 176.752 143.177 176.702C143.422 176.656 143.663 176.579 143.892 176.484C144.126 176.388 144.348 176.269 144.554 176.132C144.66 176.062 144.762 175.987 144.859 175.908C144.956 175.829 145.048 175.745 145.136 175.657C145.312 175.481 145.473 175.286 145.611 175.075C145.748 174.869 145.867 174.647 145.963 174.413C146.058 174.184 146.135 173.943 146.185 173.698C146.234 173.453 146.257 173.2 146.257 172.952C146.257 172.703 146.234 172.45 146.185 172.205C146.135 171.96 146.058 171.719 145.963 171.49Z"
                      fill="currentColor"
                    />
                    <path
                      d="M85.7341 20.0459C85.6384 19.8163 85.5198 19.5943 85.382 19.3838C85.2442 19.1772 85.0835 18.9782 84.9075 18.8021C84.7314 18.6261 84.5363 18.4653 84.3258 18.3276C84.1191 18.1898 83.8972 18.0712 83.6637 17.9755C83.4341 17.8798 83.193 17.8071 82.9481 17.7574C82.4544 17.6579 81.9492 17.6579 81.4556 17.7574C81.2106 17.8071 80.9695 17.8798 80.7361 17.9755C80.5065 18.0712 80.2845 18.1898 80.0779 18.3276C79.8674 18.4653 79.6722 18.6261 79.4962 18.8021C79.3201 18.9782 79.1594 19.1772 79.0178 19.3838C78.88 19.5943 78.7652 19.8163 78.6696 20.0459C78.5739 20.2755 78.4973 20.5166 78.4514 20.7615C78.4017 21.0103 78.3749 21.259 78.3749 21.5116C78.3749 21.7603 78.4017 22.0091 78.4514 22.2579C78.4973 22.5028 78.5739 22.7439 78.6696 22.9735C78.7652 23.2031 78.88 23.4251 79.0178 23.6356C79.1594 23.8422 79.3201 24.0412 79.4962 24.2172C79.6722 24.3933 79.8674 24.554 80.0779 24.6918C80.2845 24.8296 80.5065 24.9482 80.7361 25.0439C80.9695 25.1395 81.2106 25.2123 81.4556 25.262C81.7005 25.3118 81.9531 25.3385 82.2018 25.3385C82.4506 25.3385 82.7032 25.3118 82.9481 25.262C83.193 25.2123 83.4341 25.1395 83.6637 25.0439C83.8972 24.9482 84.1191 24.8296 84.3258 24.6918C84.5363 24.554 84.7314 24.3933 84.9075 24.2172C85.0835 24.0412 85.2442 23.8422 85.382 23.6356C85.5198 23.4251 85.6384 23.2031 85.7341 22.9735C85.8298 22.7439 85.9063 22.5028 85.9522 22.2579C86.002 22.0091 86.0288 21.7603 86.0288 21.5116C86.0288 21.259 86.002 21.0103 85.9522 20.7615C85.9063 20.5166 85.8298 20.2755 85.7341 20.0459Z"
                      fill="currentColor"
                    />
                    <path
                      d="M175.008 17.6988C172.714 7.99787 163.987 0.755371 153.594 0.755371H33.522C15.2866 0.754988 0.450684 15.5909 0.450684 33.8263V153.899C0.450684 165.824 9.98628 175.557 21.8326 175.891C24.1272 185.592 32.8542 192.835 43.2467 192.835H174.382C186.517 192.835 196.39 182.962 196.39 170.826V141.949V39.6911C196.39 27.7663 186.855 18.0329 175.008 17.6988ZM188.736 170.827C188.736 178.742 182.297 185.182 174.382 185.182H43.2467C37.1197 185.182 31.8799 181.322 29.8236 175.908C29.2232 174.327 28.8918 172.615 28.8918 170.827V168.254V150.524L72.7964 76.0808C74.1332 73.8144 76.517 72.4911 79.1323 72.5332C81.7633 72.5783 84.0851 73.9844 85.3434 76.2955L104.247 111.007L131.725 161.462C132.419 162.737 133.733 163.459 135.089 163.459C135.708 163.459 136.335 163.309 136.916 162.993C138.772 161.982 139.458 159.657 138.447 157.801L129.53 141.428C133.445 141.608 137.296 140.341 140.362 137.797L157.572 123.52C160.332 121.23 164.408 121.331 167.051 123.755L167.95 124.578L175.604 131.594L188.736 143.632V170.827ZM188.736 133.249L175.603 121.21L167.95 115.382C162.963 113.297 157.033 114.022 152.685 117.629L135.475 131.906C133.582 133.476 131.111 134.111 128.695 133.646C126.28 133.183 124.22 131.677 123.043 129.517L110.969 107.345L104.226 94.9648V94.9644L92.0655 72.6342C89.4716 67.8716 84.6856 64.9727 79.2632 64.8801C73.8423 64.7951 68.9588 67.521 66.2037 72.1922L28.8914 135.457V39.6911C28.8914 31.7758 35.331 25.3362 43.2463 25.3362H66.8937C69.0074 25.3362 70.7207 23.6229 70.7207 21.5093C70.7207 19.3957 69.0074 17.6823 66.8937 17.6823H43.2463C31.1106 17.6823 21.2375 27.5555 21.2375 39.6911V149.479V168.198C13.8924 167.575 8.10458 161.402 8.10458 153.899V33.8263C8.10458 19.8109 19.507 8.40888 33.522 8.40888H153.594C159.721 8.40888 164.961 12.2684 167.017 17.6827H97.5093C95.3957 17.6827 93.6824 19.396 93.6824 21.5097C93.6824 23.6233 95.3957 25.3366 97.5093 25.3366H167.949L175.603 25.3925C182.949 26.0147 188.736 32.1876 188.736 39.6911V133.249Z"
                      fill="currentColor"
                    />
                  </svg>`
                  }
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-1 text-xs">Upload image</span>
                  <p className="mt-1 text-xs">Max size: 10MB</p>
                </div>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onInput={handleFileInputChange}
                />
              </div>
            </div>
            {errorMessage && (
              <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
            )}
          </FormItem>

          <FormItem className="mt-6">
            <Label className="text-lg">Overview:</Label>
            <Textarea
              rows={2}
              className="mb-1.5 mt-1"
              placeholder="Briefly describe your brand"
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
              placeholder="What products/services do you offer?"
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
              placeholder="How much money do you have to spend on this project?"
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
              placeholder="What do you want to achieve with this project?"
              id="q4"
              value={newQ4}
              onChange={handleQ4Change}
            />
            <Textarea
              rows={2}
              className="mb-2"
              placeholder="Do you have any examples of other content you like and want mine to be similar to? (Please paste a link)"
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
              placeholder="When do you need the content done by?"
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
              placeholder="Is there anything else important you want to tell me or any special things you want me to know?"
              id="q7"
              value={newQ7}
              onChange={handleQ7Change}
            />
          </FormItem>

          <div className="mt-5 space-x-3">
            <ButtonPrimary
              sizeClass="px-5 py-2"
              type="button"
              onClick={handleCreateOffProposal}
            >
              <span className="mr-2">
                {loading ? "Sending proposal..." : "Send"}
              </span>
              <span>
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>
            </ButtonPrimary>
            <ButtonSecondary
              sizeClass="px-5 py-2"
              onClick={() => setShowOffModal(false)}
              type="button"
            >
              Close
            </ButtonSecondary>
          </div>
        </form>

        <div className="mt-8 mb-2 ml-1 mr-4">
          <p className="text-sm">Do you have a brand account on GetCollabo?</p>
          <p className="mt-1.5 mb-3 text-sm">
            <span className="font-semibold text-green-500">Benefit:</span> View
            and manage all your proposals in one place.
          </p>
          <div className="flex flex-col mt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <ButtonSecondary
              onClick={handleLoginLogic}
              sizeClass="py-2.5"
              className="flex-1"
            >
              <span className="mr-2">Login</span>
              <span>
                <svg
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
              </span>
            </ButtonSecondary>

            <ButtonPrimary
              href={"/create-brand"}
              sizeClass="py-2.5"
              className="flex-1"
            >
              <span className="mr-2">Signup</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
              </span>
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (proposalCreated === true) {
      return (
        <div>
          <p className="mt-1 mb-3 text-sm sm:text-base lg:text-base">
            Hey{" "}
            <span className="font-semibold capitalize">
              {brand.businessName}
            </span>
            !👋
          </p>
          <p className="mb-6 text-sm sm:text-base lg:text-base">
            Your proposal has been sent to{" "}
            <span className="capitalize">{influencer.username}.</span> You're
            off to a great start with this Collaboration!🎉
          </p>
          <Link to="/created/proposals">
            <ButtonPrimary sizeClass="py-2 px-8" className="text-base">
              View all proposals
            </ButtonPrimary>
          </Link>
        </div>
      );
    }

    if (existingProposalCreated === true) {
      return (
        <div>
          <p className="mt-1 mb-3 text-sm sm:text-base lg:text-base">
            Hey{" "}
            <span className="font-semibold capitalize">
              {brand.businessName}
            </span>
            !👋
          </p>
          <p className="mb-6 text-sm sm:text-base lg:text-base">
            You have an existing proposal with:{" "}
            <span className="capitalize">{influencer.username}.</span> This is
            great news!🎉
          </p>
          <Link to="/created/proposals">
            <ButtonPrimary sizeClass="py-2 px-8" className="text-base">
              View all proposals
            </ButtonPrimary>
          </Link>
        </div>
      );
    }

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
              placeholder="Briefly describe your brand"
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
              placeholder="What products/services do you offer?"
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
              placeholder="How much money do you have to spend on this project?"
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
              placeholder="What do you want to achieve with this project?"
              id="q4"
              value={newQ4}
              onChange={handleQ4Change}
            />
            <Textarea
              rows={2}
              className="mb-2"
              placeholder="Do you have any examples of other content you like and want mine to be similar to? (Please paste a link)"
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
              placeholder="When do you need the content done by?"
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
              placeholder="Is there anything else important you want to tell me or any special things you want me to know?"
              id="q7"
              value={newQ7}
              onChange={handleQ7Change}
            />
          </FormItem>

          <div className="mt-5 space-x-3">
            <ButtonPrimary
              sizeClass="px-5 py-2"
              type="button"
              onClick={handleCreateProposal}
            >
              <span className="mr-2">
                {loading ? "Sending proposal..." : "Send"}
              </span>
              <span>
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>
            </ButtonPrimary>
            <ButtonSecondary
              sizeClass="px-5 py-2"
              onClick={() => setShowOffModal(false)}
              type="button"
            >
              Close
            </ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div>
        {brand ? (
          <div
            className={`nc-NftDetailPage ${className}`}
            data-nc-id="NftDetailPage"
          >
            <Helmet>
              <title>Book {headerName}</title>
              <meta name="title" content={`Book ${headerName}`} />
              <meta
                name="description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta name="image" content={influencer.img} />

              {/*-- Open Graph / Facebook --*/}
              <meta property="og:title" content={`Book ${headerName}`} />
              <meta
                property="og:description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta
                property="og:url"
                content="https://getcollabo.io/book/teetat"
              />
              <meta property="og:image" content={influencer.img} />

              {/*-- Twitter --*/}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@getcollabo" />
              <meta name="twitter:title" content={`Book ${headerName}`} />
              <meta
                name="twitter:description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta
                name="twitter:url"
                content="https://getcollabo.io/book/teetat"
              />
              <meta name="twitter:image" content={influencer.img} />
            </Helmet>
            {/* MAIn */}
            <main className="container flex mt-11 ">
              <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
                {/* CONTENT */}
                <div className="space-y-8 lg:space-y-10">
                  {/* HEADING */}
                  <div className="relative">
                    <NcImage
                      src={`${influencer?.img}?auto`}
                      className="object-cover"
                      containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                    />
                  </div>

                  {influencer && <AccordionInfo dataProp={influencer} />}
                </div>

                {/* SIDEBAR */}
                <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {/* ---------- 1 ----------  */}
                    <div className="space-y-5 pb-9">
                      <div className="flex items-center justify-between">
                        <Badge name="Active" color="green" />
                        <CopyToClipboard
                          text={`https://getcollabo.io/book/${influencer?.username}`}
                          onCopy={() => setCopy(true)}
                        >
                          <div className="flex items-center space-x-2 text-sm">
                            {!copy ? (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Copy profile link">
                                  Copy profile link
                                </p>
                              </>
                            ) : (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Link copied">Link copied</p>
                              </>
                            )}
                          </div>
                        </CopyToClipboard>
                      </div>
                      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        {influencer?.displayName}
                      </h2>

                      {/* ---------- 4 ----------  */}
                      <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center ">
                          <img
                            src={influencer?.img}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full"
                          />
                          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                            <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                              <span>{influencer?.username}</span>
                              {/**
                               *  <VerifyIcon />
                               */}
                            </span>
                            <span className="mt-1 text-sm capitalize">
                              {influencer?.industry} Creator
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---------- 6 ----------  */}
                    {influencer && (
                      <div className="py-9">
                        <TimeCountDown dataProp={influencer} />
                      </div>
                    )}

                    {/* ---------- 7 ----------  */}
                    {/* PRICE */}
                    <div className="pt-9 pb-9">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                            Min. Book Rate
                          </span>
                          {influencer?.deliverable &&
                            influencer?.deliverable.length > 0 && (
                              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                                NGN{" "}
                                <span className="ml-1">
                                  {influencer.deliverable
                                    .reduce(
                                      (min, item) =>
                                        item.rate < min ? item.rate : min,
                                      Number.MAX_SAFE_INTEGER
                                    )
                                    .toLocaleString()}
                                </span>
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <ButtonPrimary
                          onClick={() => setShowModal(true)}
                          className="flex-1"
                        >
                          <BiMessageSquareDetail className="w-[24px] h-[24px]" />
                          <span className="ml-2.5">Send a proposal</span>
                        </ButtonPrimary>
                        <a
                          href={`mailto:${influencer.email}?subject=I'd%20love%20to%20collaborate%20with%20you`}
                        >
                          <ButtonSecondary>
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
                                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                              />
                            </svg>
                            <span className="ml-2.5">
                              Email {influencer.username || "this creator"}
                            </span>
                          </ButtonSecondary>
                        </a>
                      </div>
                      <p className="mt-2.5 text-xs text-gray-500 dark:text-gray-400">
                        Proposals are a faster way to collaborate with{" "}
                        <span className="capitalize">
                          {influencer.username || "this creator"}
                        </span>
                      </p>
                    </div>

                    {/* ---------- 9 ----------  */}
                    <div className="pt-9">
                      {influencer && <Reviews reviewsProp={influencer} />}
                    </div>
                  </div>
                </div>
              </div>

              <NcModal
                renderTrigger={() => null}
                isOpenProp={showModal}
                renderContent={renderContent}
                contentExtraClass="max-w-xl"
                onCloseModal={() => setShowModal(false)}
                modalTitle="Booking Proposal"
              />
            </main>

            <ToastContainer className="text-sm" />

            {/* OTHER SECTION */}
            {!isPreviewMode && (
              <div className="container py-24 lg:py-32">
                {/* SECTION 1 */}
                <div className="relative py-24 lg:py-28">
                  <BackgroundSection />
                  <SectionSubscribe2 />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`nc-NftDetailPage ${className}`}
            data-nc-id="NftDetailPage"
          >
            <Helmet>
              <title>Book {headerName}</title>
              <meta name="title" content={`Book ${headerName}`} />
              <meta
                name="description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta name="image" content={influencer.img} />

              {/*-- Open Graph / Facebook --*/}
              <meta property="og:title" content={`Book ${headerName}`} />
              <meta
                property="og:description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta
                property="og:url"
                content="https://getcollabo.io/book/teetat"
              />
              <meta property="og:image" content={influencer.img} />

              {/*-- Twitter --*/}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@getcollabo" />
              <meta name="twitter:title" content={`Book ${headerName}`} />
              <meta
                name="twitter:description"
                content={`${headerName} now accepts bookings using GetCollabo`}
              />
              <meta
                name="twitter:url"
                content="https://getcollabo.io/book/teetat"
              />
              <meta name="twitter:image" content={influencer.img} />
            </Helmet>

            {/* MAIn */}
            <main className="container flex mt-11 ">
              <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
                {/* CONTENT */}
                <div className="space-y-8 lg:space-y-10">
                  {/* HEADING */}
                  <div className="relative">
                    <NcImage
                      src={influencer?.img}
                      className="object-cover"
                      containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                    />
                  </div>

                  {influencer && <AccordionInfo dataProp={influencer} />}
                </div>

                {/* SIDEBAR */}
                <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {/* ---------- 1 ----------  */}
                    <div className="space-y-5 pb-9">
                      <div className="flex items-center justify-between">
                        <Badge name="Active" color="green" />
                        <CopyToClipboard
                          text={`https://getcollabo.io/book/${influencer?.username}`}
                          onCopy={() => setCopy(true)}
                        >
                          <div className="flex items-center space-x-2 text-sm">
                            {!copy ? (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Copy profile link">
                                  Copy profile link
                                </p>
                              </>
                            ) : (
                              <>
                                <IoCopy size={22} />
                                <p title="Link copied">Link copied</p>
                              </>
                            )}
                          </div>
                        </CopyToClipboard>
                      </div>
                      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        {influencer?.displayName}
                      </h2>

                      {/* ---------- 4 ----------  */}
                      <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center ">
                          <img
                            src={influencer?.img}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full"
                          />
                          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                            <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                              <span>{influencer?.username}</span>
                              {/**
                               *  <VerifyIcon />
                               */}
                            </span>
                            <span className="mt-1 text-sm capitalize">
                              {influencer?.industry} Creator
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---------- 6 ----------  */}
                    {influencer && (
                      <div className="py-9">
                        <TimeCountDown dataProp={influencer} />
                      </div>
                    )}

                    {/* ---------- 7 ----------  */}
                    {/* PRICE */}
                    <div className="pt-9 pb-9">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                            Min. Book Rate
                          </span>
                          {influencer?.deliverable &&
                            influencer?.deliverable.length > 0 && (
                              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                                NGN{" "}
                                <span className="ml-1">
                                  {influencer.deliverable
                                    .reduce(
                                      (min, item) =>
                                        item.rate < min ? item.rate : min,
                                      Number.MAX_SAFE_INTEGER
                                    )
                                    .toLocaleString()}
                                </span>
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <ButtonPrimary
                          onClick={() => setShowOffModal(true)}
                          className="flex-1"
                        >
                          <BiMessageSquareDetail className="w-[24px] h-[24px]" />
                          <span className="ml-2.5">Send a proposal</span>
                        </ButtonPrimary>
                        <a
                          href={`mailto:${influencer.email}?subject=I'd%20love%20to%20collaborate%20with%20you`}
                        >
                          <ButtonSecondary>
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
                                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                              />
                            </svg>
                            <span className="ml-2.5">
                              Email {influencer.username || "this creator"}
                            </span>
                          </ButtonSecondary>
                        </a>
                      </div>
                      <p className="mt-2.5 text-xs text-gray-500 dark:text-gray-400">
                        Proposals are a faster way to collaborate with{" "}
                        <span className="capitalize">
                          {influencer.username || "this creator"}
                        </span>
                      </p>
                    </div>

                    {/* ---------- 9 ----------  */}
                    <div className="pt-9">
                      {influencer && <Reviews reviewsProp={influencer} />}
                    </div>
                  </div>
                </div>
              </div>

              <NcModal
                renderTrigger={() => null}
                isOpenProp={showOffModal}
                renderContent={renderOffContent}
                contentExtraClass="max-w-xl"
                onCloseModal={() => setShowOffModal(false)}
                modalTitle="Booking Proposal"
              />
            </main>

            <ToastContainer className="text-sm" />

            {/* OTHER SECTION */}
            {!isPreviewMode && (
              <div className="container py-24 lg:py-32">
                {/* SECTION 1 */}
                <div className="relative py-24 lg:py-28">
                  <BackgroundSection />
                  <SectionSubscribe2 />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InfluencerDetailPage;