import React, { useEffect, useState } from "react";
import styles from "../ChatWidget.module.css";
import ChatRoom from "../ChatIcons/ChatRoom/ChatRoom";

const ChatRoomList = ({ openChatWindow, loginId, nc, changeActiveTab, channels }) => {

  useEffect(() => {
    console.log(channels);
  }, []);

  return (
    <div>
      <div className={styles.chatHeader}>
        <h4>채팅</h4>
      </div>
      <div className={styles.chatContent}>
        {channels && channels.map((channel) => (
          <ChatRoom
            key={channel.id}  // 채널마다 고유의 key 값을 넣어줘야 합니다.
            channel={channel}
            openChatWindow={openChatWindow}
            changeActiveTab={changeActiveTab}
            // nc={nc}
            loginId={loginId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
