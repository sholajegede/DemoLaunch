// @ts-nocheck
import React, { FC, useContext, useState, useEffect, useRef } from "react";
import BrandLogin from "containers/PageLogin/BrandLogin";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import BrandChatBox from "components/ChatBox/BrandChatBox";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";

export interface BrandChatProps {
  className?: string;
}

const BrandChat: FC<BrandChatProps> = ({ className = "" }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { brand } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

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

  //
  useEffect(() => {
    socket.current = io("https://getcollabo-socket.onrender.com");
    socket.current.emit("new-chat-user", brand?._id);
    socket.current.on("get-chat-users", (chatUsers: any) => {
      setOnlineUsers(chatUsers);
    });
  }, [brand]);
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
    const chatMember = chat.members.find((member: any) => member !== brand?._id);
    const online = onlineUsers.find((chatUser) => chatUser.id === chatMember);
    return online ? true : false;
  };

  return (
    <>
      {brand ? (
        <div
          className={`nc-BrandChat container ${className}`}
          data-nc-id="Chat"
        >
          <Helmet>
            <title>Messages</title>
          </Helmet>

          <BrandChatBox
            chat={currentChat}
            currentUser={brand?._id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            online={checkOnlineStatus(currentChat)}
          />
          
        </div>
      ) : (
        <BrandLogin />
      )}
    </>
  );
};

export default BrandChat;