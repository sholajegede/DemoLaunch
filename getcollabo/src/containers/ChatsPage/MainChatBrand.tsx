// @ts-nocheck
import React, { FC, useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "context/AuthContext";
import { BrandProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import { useHistory } from "react-router-dom";
import Logo from "shared/Logo/Logo";
import AvatarDropdown from "components/Header/AvatarDropdown";
import NotifyDropdown from "components/Header/NotifyDropdown";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import BrandChat from "./BrandChat";
import BrandConversation from "components/Conversation/BrandConversation";
import { io } from "socket.io-client";

export interface MainChatBrandProps {
  className?: string;
}

const MainChatBrand: FC<MainChatBrandProps> = ({ className = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const { brand } = useContext(AuthContext);

  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();
  const history = useHistory();

  //
  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/brand/${brand._id}`);
      setBrandProfile(response.data);
    };
    fetchBrandProfile();
  }, [brand]);
  //

  //
  useEffect(() => {
    newRequest
      .get(`/chat/${brand?._id}`)
      .then((response) => {
        if (response.data) {
          setChats(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [brand]);
  //

  //
  useEffect(() => {
    socket.current = io("https://getcollabo-socket.onrender.com");
    socket.current.emit("new-chat-user", brand?._id);
    socket.current.on("get-chat-users", (chatUsers: any) => {
      setOnlineUsers(chatUsers);
    });
  }, [brand]);
  //

  const handleChatClick = (chat: any) => {
    history.push(`/message/${chat._id}`);
  };

  const checkOnlineStatus = (chat: any) => {
    if (!chat) {
      return false;
    }
    const chatMember = chat.members.find(
      (member: any) => member !== brand?._id
    );
    const online = onlineUsers.find((chatUser) => chatUser.id === chatMember);
    return online ? true : false;
  };

  return (
    <>
      {brandProfile.verified === false ? (
        history.push("/verify-email/brand")
      ) : (
        <div
          className={`nc-MainChatBrand overflow-hidden relative ${className}`}
          data-nc-id="MainChatBrand"
        >
          <Helmet>
            <title>Messages</title>

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

          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <Logo />
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ml-3">
                    <div className="flex items-center space-x-1 xl:space-x-3">
                      <SwitchDarkMode />
                      <NotifyDropdown />
                      <AvatarDropdown />

                      <button
                        className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center sm:hidden md:hidden xl:hidden 2xl:hidden"
                        onClick={handleSidebarToggle}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-72 xl:w-96 h-screen pt-20 transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
          >
            <div className="h-full mt-2 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <div className="flex-col col-span-1 gap-4 lg:flex lg:col-span-2">
                <div className="flex flex-col gap-4 bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 h-auto min-h-[85vh] border-2 border-gray-300 dark:border-gray-700">
                  <h2 className="text-xl font-bold">Messages</h2>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2 conversation">
                      {Array.isArray(chats) && chats.length > 0 ? (
                        chats
                          .slice()
                          .reverse()
                          .map((chat) => (
                            <div
                              key={chat._id}
                              onClick={() => handleChatClick(chat)}
                              className="hover:bg-gray-300 hover:cursor-pointer"
                            >
                              <BrandConversation
                                data={chat}
                                currentUserId={brand?._id}
                                online={checkOnlineStatus(chat)}
                              />
                            </div>
                          )).sort((chatA, chatB) => (chatB.props.online ? 1 : -1))
                      ) : (
                        <p>No conversations started</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="ml-0 sm:ml-72 mb-4 mt-4">
            <BrandChat />
          </div>
        </div>
      )}
    </>
  );
};

export default MainChatBrand;