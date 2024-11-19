import React, { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import styles from "./ChatWidget.module.css";
import ChatFriends from "./ChatPage/ChatFriends";
import ChatChating from "./ChatPage/ChatChating";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatRoomList from "./ChatPage/ChatRoomList";
import api from "../../api/axios";

const ChatWidget = ({ nc, loginId, recipientId, projectId, apiKey, isChatOpen, toggleChatWindow, openFromButton, channel, channels, openChatWindow, handleChatChange}) => {
  const [activeTab, setActiveTab] = useState("friends");
  const [messages, setMessages] = useState([]);
  const[totalUnread, setTotalUnread] = useState(0);
  const [state, setState] = useState(null);


  useEffect(() => {
    if ((isChatOpen && openFromButton)) {
      setActiveTab("chatContent");
    } else {
      setActiveTab("friends");
    }
    if(!isChatOpen){
      setActiveTab(null);
    }
  }, [isChatOpen,openFromButton]);

  
  const changeActiveTab = (state) => {
    setActiveTab("chatContent");
    setState(state);
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
    if(activeTab!=="friends"){
      handleChatChange(activeTab);
    }
  }, [activeTab]);  

  useEffect(() => {
    if (channel) {
      console.log(channel);
      getMessages(channel.id);
    }
    toggleChatWindow(true); 
  }, [channel])


  const exitChatRoom = () => {
    if(state =="chats"){
      setActiveTab("chats");
    }else{
      setActiveTab("friends");
    }
    toggleChatWindow(true); 
  };


  const ClickFooterTab = (option) => {
    setActiveTab(option);
    toggleChatWindow(true); 
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
        style={{ position: "relative" }}
      >
        {isChatOpen ? (
          <IoClose size={24} color="white" />
        ) : (
          <>
          <AiOutlineMessage size={24} color="white" />
          {
            totalUnread>0 &&
          
          <div style={{
            position: "absolute", // 부모(button)를 기준으로 배치
            top: "-5px", // 버튼 위로 올리기
            right: "-5px", // 버튼 오른쪽으로 밀기
            backgroundColor: "red", // 배경색
            color: "white", // 텍스트 색
            borderRadius: "50%", // 원형 모양
            padding: "4px 4px", // 내부 여백
            fontSize: "12px", // 글자 크기
            fontWeight: "bold", // 글자 굵기
            width:'25px',
            height:'25px',
            zIndex: 2000, // 겹치는 요소 우선순위
          }}>
            {/* {totalUnread>0 && totalUnread} */}
            {totalUnread}
          </div>
          }
          </>
        )}
      </button>

      {isChatOpen && (
        <div className={styles.chatWindow} >
          <div className={styles.chatBody}>
            {activeTab === "friends" && <ChatFriends loginId={loginId} projectId={projectId} apiKey={apiKey} nc={nc} openChatWindow={openChatWindow} changeActiveTab={changeActiveTab} channels={channels} />}
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
            {activeTab === "chats" && <ChatRoomList openChatWindow={openChatWindow} loginId={loginId} nc={nc} changeActiveTab={changeActiveTab} channels={channels}/>}
            {/* {activeTab === "settings" && <ChatSetting />} */}
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
              {/* <button
                className={`${styles.tabButton} ${activeTab === "settings" && styles.activeTab}`}
                onClick={() => ClickFooterTab("settings")}
              >
                설정
              </button> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
