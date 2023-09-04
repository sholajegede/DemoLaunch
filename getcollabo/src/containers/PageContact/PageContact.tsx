import React, { FC, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import newRequest from "utils/newRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "💌 EMAIL US",
    desc: "support@getcollabo.io",
  },
  {
  /**
  {
    title: "☎ CALL US",
    desc: "Coming soon...",
  },
  {
    title: "📍 DROP BY THE OFFICE",
    desc: "Address would be added soon...",
  },
 */
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserMessage, setNewUserMessage] = useState("");

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleNameChange = (event: any) => {
    setNewUserName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setNewUserEmail(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setNewUserMessage(event.target.value);
  };

  const sendEmail = async () => {
    if (!newUserEmail || !newUserMessage) {
      toast.error("Please fill email and message", {
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

    if (!newUserName && !influencer.username) {
      toast.error("Please fill in your username", {
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
      userName: newUserName || influencer.username,
      userEmail: newUserEmail,
      userMessage: newUserMessage,
    };

    setNewUserName("");
    setNewUserEmail("");
    setNewUserMessage("");

    try {
      const response = await newRequest.post(
        "/contact/support",
        newRefundRequest
      );

      if (response.status === 200) {
        toast.success(
          "💌 Your support request has been sent. You'll get a feedback from us in 24 hours!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
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
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Contact Us</title>

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta
          property="og:description"
          content="Whether you have questions, encounter technical issues, or require general assistance, this is the go-to resource to find answers and solutions."
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
          content="Whether you have questions, encounter technical issues, or require general assistance, this is the go-to resource to find answers and solutions."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/newlink/image/upload/v1687711176/Screenshot_180_mhhry6.png"
        />
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact Us
        </h2>
        <div className="container mx-auto max-w-7xl">
          <div className="grid flex-shrink-0 grid-cols-1 gap-12 md:grid-cols-2 ">
            <div className="max-w-sm">
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
              <div className="mt-8">
                <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                  🌏 OUR SOCIALS
                </h3>
                <ul className="flex mt-3 space-x-8 justify-left items-left">
                  <li>
                    <a
                      href="https://www.twitter.com/getcollabo"
                      title="Twitter"
                      className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                    >
                      <RiTwitterFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.instagram.com/getcollabo"
                      title="Instagram"
                      className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                    >
                      <RiInstagramFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.linkedin.com/company/getcollabo"
                      title="LinkedIn"
                      className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                    >
                      <RiLinkedinFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.tiktok.com/@getcollabo"
                      title="TikTok"
                      className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                    >
                      <SiTiktok className="w-5 h-6 dark:fill-white fill-bg-neutral-900" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.facebook.com/getcollabo"
                      title="Facebook"
                      className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                    >
                      <RiFacebookFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="hidden mt-16 xl:block">
                <span className="xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
                  You can also explore our FAQs for quick answers to common
                  questions.{" "}
                  <Link
                    className="text-green-600 underline hover:no-underline"
                    to="/faqs"
                  >
                    Click here.
                  </Link>
                </span>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <Label>Name</Label>

                  <Input
                    placeholder="Enter your name"
                    type="text"
                    disabled={!!influencer}
                    className="mt-1 capitalize"
                    name="user_name"
                    value={influencer ? influencer.username : newUserName}
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
                  <Label>Message</Label>

                  <Textarea
                    name="message"
                    placeholder="What would you like to tell us?"
                    className="mt-1"
                    rows={6}
                    value={newUserMessage}
                    onChange={handleMessageChange}
                  />
                </label>
                <div>
                  <ButtonPrimary onClick={() => sendEmail()} type="submit">
                    Request support
                  </ButtonPrimary>
                </div>
              </div>
            </div>

            <div className="block xl:hidden">
              <span className="xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
                You can also explore our FAQs for quick answers to common
                questions.{" "}
                <Link
                  className="text-green-600 underline hover:no-underline"
                  to="/faqs"
                >
                  Click here.
                </Link>
              </span>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default PageContact;