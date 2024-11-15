import React, { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import styles from "./ChatWidget.module.css";
import ChatFriends from "./ChatPage/ChatFriends";
import ChatChating from "./ChatPage/ChatChating";
import ChatSetting from "./ChatPage/ChatSetting";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatRoomList from "./ChatPage/ChatRoomList";
import api from "../../api/axios";

const ChatWidget = ({ nc, loginId, recipientId, projectId, apiKey, isChatOpen, toggleChatWindow, openFromButton, channel, channels, openChatWindow, handleChatChange}) => {
  const [activeTab, setActiveTab] = useState("friends");
  const [messages, setMessages] = useState([]);
  const[totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    if ((isChatOpen && openFromButton)) {
      setActiveTab("chatContent");
    } else {
      setActiveTab("friends");
    }
  }, [isChatOpen]);

  
  const changeActiveTab = () => {
    setActiveTab("chatContent");
  }

  const getMessages = async (channelId) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const response = await nc.getMessages(filter, sort, option);
      setMessages(response.edges);
      console.log(response.edges);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    console.log("Updated channels:", channels);
  }, [channels]);  

  useEffect(() => {
    if(activeTab=="chat"){
      handleChatChange(activeTab);
    }
  }, [activeTab]);  

  useEffect(() => {
    if (channel) {
      console.log(channel);
      getMessages(channel.id);
    }
  }, [channel])


  const exitChatRoom = () => {
    setActiveTab("chats");
  };


  const ClickFooterTab = (option) => {
    setActiveTab(option);
  };

  const getTotalUnread = async() => {
    try{
      const response = await api.get(`chat/getTotalUnread/${loginId}`);
      console.log(response.data);
      setTotalUnread(response.data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalUnread();
  },[channel,channels])


  return (
    <div className={styles.chatWidgetContainer}>
      {/* <button className={styles.chatButton} >
        {isChatOpen ? <IoClose size={24} color="white" onClick={() => {
          toggleChatWindow(false);
        }} /> : <AiOutlineMessage size={24} color="white"
          onClick={() => {
            toggleChatWindow(true);
          }} />}
      </button> */}

      <button
        className={styles.chatButton}
        onClick={() => {
          // isChatOpen이 true일 경우 false로, false일 경우 true로 명시적으로 전달
          if (isChatOpen) {
            toggleChatWindow(false);  // 채팅창을 닫는 경우
          } else {
            toggleChatWindow(true);   // 채팅창을 여는 경우
          }
        }}
      >
        {isChatOpen ? (
          <IoClose size={24} color="white" />
        ) : (
          <>
          <AiOutlineMessage size={24} color="white" />{totalUnread}</>
        )}
      </button>

      {isChatOpen && (
        <div className={styles.chatWindow} >
          <div className={styles.chatBody}>
            {activeTab === "friends" && <ChatFriends loginId={loginId} projectId={projectId} apiKey={apiKey} nc={nc} />}
            {activeTab === "chatContent" && (
              <ChatChating
                recipientId={channel ? null : recipientId}
                // recipientId={recipientId}
                loginId={loginId}
                exitChatRoom={exitChatRoom}
                nc={nc}
                projectId={projectId}
                apiKey={apiKey}
                messages={channel ? messages : null}
                channel={channel}
              />
            )}
            {activeTab === "chats" && <ChatRoomList openChatWindow={openChatWindow} loginId={loginId} nc={nc} changeActiveTab={changeActiveTab} channels={channels} />}
            {activeTab === "settings" && <ChatSetting />}
          </div>

          {activeTab !== "chatContent" && (
            <div className={styles.chatFooterTabs}>
              <button
                className={`${styles.tabButton} ${activeTab === "friends" && styles.activeTab}`}
                onClick={() => ClickFooterTab("friends")}
              >
                친구
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === "chats" && styles.activeTab}`}
                onClick={() => ClickFooterTab("chats")}
              >
                대화
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === "settings" && styles.activeTab}`}
                onClick={() => ClickFooterTab("settings")}
              >
                설정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
