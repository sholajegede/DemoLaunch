// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useRef } from "react";
import newRequest from "utils/newRequest";
import { BrandData } from "routers/types";
import { format } from "timeago.js";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Textarea from "shared/Textarea/Textarea";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Linkify from "react-linkify";
import upload from "utils/upload";
import uploadChatVideo from "utils/uploadChatVideo";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import NcModal from "shared/NcModal/NcModal";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Chat {
  _id: string;
}

export interface Message {
  senderId: string;
  receiverName: string;
  receiverEmail: string;
  text: string;
  chatId: string;
  image: string;
  video: string;
  senderName: string;
  senderImage: string;
}

export interface InfluencerChatBoxProps {
  className?: string;
  chat?: Chat;
  currentUser?: string;
  setSendMessage?: any;
  receiveMessage?: any;
  online?: boolean;
}

const InfluencerChatBox: FC<InfluencerChatBoxProps> = ({
  className = "",
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  online,
}) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const { chatId } = useParams<{ chatId: string }>();

  const [brandData, setBrandData] = useState<BrandData>({});
  const [error, setError] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [newImageMessage, setNewImageMessage] = useState("");
  const [newVideoMessage, setNewVideoMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPlay, setIsPlay] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);

  const textareaRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [newMessage]);

  useEffect(() => {
    if (chat !== null) {
      const brandId = chat.members.find((id: string) => id !== currentUser);
      newRequest
        .get(`/brand/${brandId}`)
        .then((response) => {
          if (response.data) {
            setBrandData(response.data);
          }
        })
        .catch((err) => setError(err));
    }
  }, [chat, currentUser]);

  useEffect(() => {
    if (chatId) {
      newRequest
        .get(`/message/${chatId}`)
        .then((response) => {
          if (response.data) {
            setMessages(response.data);
          }
        })
        .catch((err) => setError(err));
    }
  }, [chatId]);

  // Always scroll to  the most recent message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = event.target.files;
    setFile(file);

    try {
      const [url, previewUrl] = await Promise.all([
        upload(file),
        generatePreview(file),
      ]);
      setNewImageMessage(url);
      setPreviewUrl(previewUrl);
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

  const generatePreview = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        resolve(url);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = event.target.files;
    setVideoFile(file);

    try {
      const url = await uploadChatVideo(file);
      setNewVideoMessage(url);
      setIsPlay(true);
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

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newMessage.trim() && !file && !videoFile) {
      return;
    }

    const message: Message = {
      senderId: currentUser,
      receiverName: brandData.businessName,
      receiverEmail: brandData.email,
      senderName: influencer.username,
      senderImage: influencer.img,
      text: newMessage,
      chatId: chatId,
    };

    if (file) {
      try {
        message.image = newImageMessage;
        setNewImageMessage("");
        setPreviewUrl("");
        setFile(null);
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
        return;
      }
    }

    if (videoFile) {
      try {
        message.video = newVideoMessage;
        setNewVideoMessage("");
        setIsPlay(false);
        setVideoFile(null);
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
        return;
      }
    }

    // send message to socket server
    const receiverId = chat.members.find((id: string) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {
      const res = await newRequest.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
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

    if (!online) {
      try {
        const res = await newRequest.post("/message/notification", message);
        console.log(res);
        setNewMessage("");
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
    }
  };

  //
  useEffect(() => {
    if (
      receiveMessage !== null &&
      chat !== null &&
      receiveMessage.chatId === chatId
    ) {
      setMessages([...messages, receiveMessage]);
      toast.success("🔔 New Message!", {
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
  }, [receiveMessage, chat, chatId]);
  //

  const handleBackClick = () => {
    const previousLocation = localStorage.getItem("previousLocation");

    if (previousLocation) {
      localStorage.removeItem("previousLocation");
      history.push(previousLocation);
    } else {
      history.push("/chat");
    }
  };

  const renderContent = () => {
    const handleSendLink = (link) => {
      const message: Message = {
        senderId: currentUser,
        receiverName: brandData.businessName,
        receiverEmail: brandData.email,
        senderName: influencer.username,
        senderImage: influencer.img,
        text: link,
        chatId: chatId,
      };

      const receiverId = chat.members.find((id: string) => id !== currentUser);
      setSendMessage({ ...message, receiverId });

      try {
        const res = newRequest.post("/message", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
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

      if (!online) {
        try {
          const res = newRequest.post("/message/notification", message);
          console.log(res);
          setNewMessage("");
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
      }

      // Close the modal
      setShowModal(false);
    };

    return (
      <div className="pl-2 pr-6 overflow-y-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 scrollbar-thumb-gray-200 dark:scrollbar-track-neutral-800 scrollbar-track-gray-50 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-rounded-full max-h-[415px]">
        <span className="text-sm">
          These are the deliverables you offer. Click on any to send to:{" "}
          <span className="text-base font-semibold capitalize text-primary-6000">
            {brandData.businessName}
          </span>
        </span>

        <div className="mt-6 space-y-3 pb-[70px]">
          {!Array.isArray(influencer.deliverable)
            ? `No available deliverables offered by ${influencer.username}.`
            : influencer.deliverable && influencer.deliverable.length > 0
            ? influencer.deliverable.map(
                (item) =>
                  item._id &&
                  item.description &&
                  item.rate &&
                  item.deliveryTime && (
                    <div
                      key={item._id}
                      className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                      onClick={() =>
                        handleSendLink(
                          `https://getcollabo.io/deliverable/${influencer.username}/${item._id}`
                        )
                      }
                    >
                      <div className="flex items-center w-full">
                        <div className="inline-grid text-xs font-normal sm:ml-8 sm:text-sm">
                          <div>{item.description}</div>
                          <div className="inline mt-2">
                            <span className="mt-2 text-green-500">NGN</span>{" "}
                            <span className="">
                              {item.rate.toLocaleString()}
                            </span>
                            {" - "}
                            <span className="inline-flex">
                              {item.deliveryTime} delivery{" "}
                              <AiOutlineFieldTime className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )
            : null}
        </div>

        <div className="fixed bottom-0 z-10 flex-col w-full pt-4 pb-3 mt-4 space-x-3 bg-white border-t border-gray-300 dark:border-gray-700 dark:bg-neutral-800">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
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
      </div>
    );
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 min-h-screen sm:min-h-[610px] md:min-h-[920px] lg:min-h-[610px] xl:min-h-[610px] flex flex-col`}
      data-nc-id="InfluencerChatBox"
    >
      {chat && brandData && (
        <div className="fixed z-10 w-full pt-6 pb-2.5 bg-white border-b border-gray-300 top-16 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MdArrowBackIosNew onClick={handleBackClick} size={18} />
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={
                brandData.logo ||
                "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
              }
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {brandData.businessName || ""}
              </p>
              {online ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Offline
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex-col xs:w-[460px] sm:w-[460px] w-[355px] xl:w-[730px] md:w-[610px] lg:w-[730px] overflow-y-auto lg:pt-14 xl:pt-14 sm:pt-14 md:pt-14 pt-14 lg:pb-[134px] xl:pb-[134px] sm:pb-48 md:pb-[134px] pb-[186px] h-[calc(100vh - 200px)]">
        {messages
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((message) => (
            <div
              ref={scroll}
              key={message?._id}
              className={
                message?.senderId === currentUser
                  ? "flex justify-end mb-4"
                  : "flex justify-start mb-4"
              }
            >
              <div
                className={
                  message?.senderId === currentUser
                    ? "bg-primary-6000 text-white py-2 px-4 rounded-tr-none rounded-lg xl:max-w-xs lg:max-w-xs md:max-w-[350px] sm:max-w-[350px] max-w-[250px] relative overflow-hidden"
                    : "bg-gray-200 text-black py-2 px-4 rounded-tl-none rounded-lg xl:max-w-xs lg:max-w-xs md:max-w-[350px] sm:max-w-[350px] max-w-[250px] relative overflow-hidden"
                }
              >
                {message?.image &&
                  (message?.image.includes("res.cloudinary") ||
                    message?.image.includes("data:image")) && (
                    <NcImage
                      src={message.image}
                      alt="message image"
                      className="mb-2 rounded-lg"
                    />
                  )}
                {message?.video &&
                  (message?.video.includes("res.cloudinary") ||
                    message?.video.includes("data:image")) && (
                    <div style={{ wordWrap: "break-word" }}>
                      <video
                        className="z-0 flex object-cover w-full max-h-[300px] mb-2 overflow-hidden rounded-lg"
                        playsInline
                        loop
                        controls
                      >
                        <source src={message.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                {message?.text && (
                  <p className="text-sm" style={{ wordWrap: "break-word" }}>
                    <Linkify
                      componentDecorator={(
                        decoratedHref,
                        decoratedText,
                        key
                      ) => (
                        <a href={decoratedHref} key={key} className="underline">
                          {decoratedText}
                        </a>
                      )}
                    >
                      {message.text.replace(
                        /http:\/\/res\.cloudinary\.com\/newlink\/image\/upload\/.*$/g,
                        ""
                      )}
                    </Linkify>
                  </p>
                )}

                <div className="mt-2 text-xs text-gray-600">
                  <span
                    className={
                      message?.senderId === currentUser
                        ? "text-xs text-gray-200 block mt-1"
                        : "text-xs text-gray-600 block mt-1"
                    }
                  >
                    {format(message?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <section className="bg-white dark:bg-gray-900 fixed bottom-0 z-10 flex-col xs:w-[460px] sm:w-[460px] w-[355px] xl:w-[730px] md:w-[610px] lg:w-[730px]">
        {chat && (
          <form
            className="flex items-center px-4 py-3 border-t border-gray-300 dark:border-gray-700"
            onSubmit={handleSendMessage}
          >
            <div className="flex items-center flex-1 mr-3">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onInput={handleFileInputChange}
                />
                <BiImageAdd className="w-8 h-8 pr-2 text-gray-500 xl:w-10 xl:h-10" />
              </label>
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onInput={handleVideoInputChange}
                />
                <AiOutlineVideoCameraAdd className="w-8 h-8 pr-2 text-gray-500 xl:w-10 xl:h-10" />
              </label>

              <Textarea
                value={newMessage.replace(
                  /http:\/\/res\.cloudinary\.com\/newlink\/image\/upload\/.*$|data:image.*$/g,
                  ""
                )}
                onChange={handleChange}
                className="flex-1 h-10 resize-none min-h-10"
                placeholder="Type a message..."
                ref={textareaRef}
              />
            </div>

            <ButtonPrimary type="submit" sizeClass="px-4 py-2 sm:px-5">
              Send
            </ButtonPrimary>
          </form>
        )}

        {previewUrl ? (
          <div className="flex items-center flex-1 mr-3">
            <img
              src={previewUrl}
              alt="preview"
              className="w-20 h-20 mr-2 rounded-lg"
            />
          </div>
        ) : null}

        {newVideoMessage ? (
          <div className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-2xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0">
              {isPlay ? (
                <video
                  className="z-0 flex object-cover w-full h-full overflow-hidden rounded-2xl"
                  playsInline
                  loop
                  controls
                >
                  <source src={newVideoMessage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <div
                    onClick={() => setIsPlay(true)}
                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                  >
                    <NcPlayIcon />
                  </div>
                  <NcImage
                    containerClassName="absolute inset-0 rounded-2xl overflow-hidden z-0"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
                    alt="Creator video content"
                    src={previewUrl}
                  />
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col mt-4 mb-4 sm:flex-col lg:flex-row md:flex-row xl:flex-row sm:space-y-2.5 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
          <ButtonSecondary
            className="flex-1"
            onClick={() => setShowModal(true)}
          >
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <span className="ml-2.5">Send a Deliverable</span>
          </ButtonSecondary>

          <div className="mt-2 sm:hidden" />

          <ButtonPrimary
            href={`/chatInvoice/${brandData.businessName}`}
            className="flex-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 12H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2.5">Create an Invoice</span>
          </ButtonPrimary>
        </div>

        <NcModal
          renderTrigger={() => null}
          isOpenProp={showModal}
          renderContent={renderContent}
          contentExtraClass="max-w-xl"
          onCloseModal={() => setShowModal(false)}
          modalTitle="Your Deliverables"
        />
      </section>

      <ToastContainer className="text-sm" />
    </div>
  );
};

export default InfluencerChatBox;