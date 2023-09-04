// @ts-nocheck
import React, { FC, useContext, useState, useEffect, useRef } from "react";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import { Tab } from "@headlessui/react";
import InfluencerConversation from "components/Conversation/InfluencerConversation";
import InfluencerChatBox from "components/ChatBox/InfluencerChatBox";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface InfluencerChatProps {
  className?: string;
}

const InfluencerChat: FC<InfluencerChatProps> = ({ className = "" }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [chats, setChats] = useState([]);
  const { influencer } = useContext(InfluencerAuthContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const socket = useRef();

  const history = useHistory();

  useEffect(() => {
    newRequest
      .get(`/chat/getChat/${chatId}`)
      .then((response) => {
        if (response.data) {
          setCurrentChat(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, [chatId]);

  useEffect(() => {
    newRequest
      .get(`/chat/${influencer?._id}`)
      .then((response) => {
        if (response.data) {
          setChats(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [influencer]);

  useEffect(() => {
    socket.current = io("https://getcollabo-socket.onrender.com");
    socket.current.emit("new-chat-user", influencer?._id);
    socket.current.on("get-chat-users", (chatUsers: any) => {
      setOnlineUsers(chatUsers);
    });
  }, [influencer]);
  //

  // Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  //

  // Receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data: any) => {
      setReceiveMessage(data);
    });
  }, []);
  //

  const checkOnlineStatus = (chat: any) => {
    if (!chat) {
      return false;
    }
    const chatMember = chat.members.find(
      (member: any) => member !== influencer?._id
    );
    const online = onlineUsers.find((chatUser) => chatUser.id === chatMember);
    return online ? true : false;
  };

  const handleChatClick = (chat: any) => {
    history.push(`/convo/${chat._id}`);
  };

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
    <>
      {influencer ? (
        <div
          className={`nc-InfluencerChat ${className}`}
          data-nc-id="InfluencerChat"
        >
          <Helmet>
            <title>Convo</title>
          </Helmet>

          <div className="pt-2 mt-20">
            <main>
              <div className="flex-col hidden sm:hidden xl:block md:hidden lg:block">
                <Tab.Group>
                  <div className="flex flex-col justify-between lg:flex-row ">
                    <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                      <Tab>
                        {() => (
                          <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                            Messages
                          </div>
                        )}
                      </Tab>
                    </Tab.List>
                  </div>
                </Tab.Group>

                <p
                  onClick={() => setShowDemoModal(true)}
                  className="inline-flex mt-4 mb-4 text-primary-6000"
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

                  <span className="text-sm">Take a tour of Messages</span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                {/* Left Side */}
                <div className="flex-col hidden col-span-1 gap-4 sm:hidden xl:block md:hidden lg:block lg:col-span-2">
                  <div className="flex flex-col gap-4 bg-cardColor rounded-xl p-4 h-auto min-h-[72vh] xl:min-h-[72.5vh] border-2 border-gray-300 dark:border-gray-700">
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
                                <InfluencerConversation
                                  data={chat}
                                  currentUserId={influencer?._id}
                                  online={checkOnlineStatus(chat)}
                                />
                              </div>
                            ))
                        ) : (
                          <p>
                            Hi{" "}
                            <span className="capitalize">
                              {influencer.username}
                            </span>
                            👋, you have started no conversation
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col col-span-1 gap-4 lg:col-span-3">
                  <div className="relative flex-1 min-h-0">
                    <InfluencerChatBox
                      chat={currentChat}
                      currentUser={influencer?._id}
                      setSendMessage={setSendMessage}
                      receiveMessage={receiveMessage}
                      online={checkOnlineStatus(currentChat)}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>

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
    </>
  );
};

export default InfluencerChat;