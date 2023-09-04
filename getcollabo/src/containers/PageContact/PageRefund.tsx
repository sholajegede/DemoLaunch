import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import newRequest from "utils/newRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface PageRefundProps {
  className?: string;
}

const info = [
  {
    title: "💌 EMAIL US",
    desc: "support@getcollabo.io",
  },
];

const PageRefund: FC<PageRefundProps> = ({ className = "" }) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPlan, setNewUserPlan] = useState("");
  const [newUserReason, setNewUserReason] = useState("");

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleNameChange = (event: any) => {
    setNewUserName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setNewUserEmail(event.target.value);
  };

  const handlePlanChange = (event: any) => {
    setNewUserPlan(event.target.value);
  };

  const handleReasonChange = (event: any) => {
    setNewUserReason(event.target.value);
  };

  const sendEmail = async () => {
    if (!newUserName || !newUserEmail || !newUserPlan || !newUserReason) {
      toast.error("Please fill in all fields", {
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

    if (!emailRegex.test(newUserEmail)) {
      toast.error("Please enter a valid email address", {
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

    const newRefundRequest = {
      userName: newUserName,
      userEmail: newUserEmail,
      userPlan: newUserPlan,
      userReason: newUserReason,
    };
    
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPlan("");
    setNewUserReason("");

    try {
      const response = await newRequest.post(
        "/contact/refund",
        newRefundRequest
      );

      if (response.status === 200) {
        toast.success("📝 Your request has been sent!", {
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
        toast.error("An error occurred while sending the message", {
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
      toast.error("An error occurred while sending the message", {
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
    <div
      className={`nc-PageRefund pl-4 pr-4 sm:pl-10 sm:pr-10 xl:pl-40 xl:pr-40 overflow-hidden ${className}`}
      data-nc-id="PageRefund"
    >
      <Helmet>
        <title>Request Refund</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="This page is for when you want to request a refund on your plan to GetCollabo."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_180_mhhry6.png"
        />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta
          name="twitter:description"
          content="This page is for when you want to request a refund on your plan to GetCollabo."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_180_mhhry6.png"
        />
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <div className="pt-10 md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl xl:text-5xl lg:text-4xl md:leading-tight dark:text-white">
              Refund
            </h2>
            <p className="mt-1 text-gray-600 md:block dark:text-gray-400">
              To request a refund, you can send us an email or fill out this
              form.
            </p>
          </div>
        </div>
        <div className="mt-20">
          <div className="grid flex-shrink-0 grid-cols-1 gap-6 md:grid-cols-2">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <Label>Username</Label>

                  <Input
                    placeholder="Enter your username on GetCollabo"
                    type="text"
                    className="mt-1"
                    name="user_name"
                    value={newUserName}
                    onChange={handleNameChange}
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    name="user_email"
                    value={newUserEmail}
                    onChange={handleEmailChange}
                  />
                </label>
                <label className="block">
                  <Label>Current plan</Label>

                  <select
                    value={newUserPlan}
                    onChange={handlePlanChange}
                    name="plan"
                    style={{ width: "100%" }}
                    className="block w-full px-4 py-3 mt-1 text-sm font-normal bg-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl"
                  >
                    <option>-- Select --</option>
                    <option value="Monthly Plan">Monthly plan</option>
                    <option value="Yearly Plan">Yearly plan</option>
                  </select>
                </label>
                <label className="block">
                  <Label>Please give us a reason</Label>

                  <Textarea
                    name="message"
                    placeholder={`What's your reason for requesting a refund for this ${newUserPlan}?`}
                    className="mt-1"
                    rows={6}
                    value={newUserReason}
                    onChange={handleReasonChange}
                  />
                </label>

                <div>
                  <ButtonPrimary onClick={() => sendEmail()} type="submit">
                    Request refund
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default PageRefund;