import React, { useEffect, useState } from "react";
import styles from "../ChatWidget.module.css";
import ChatRoom from "../ChatIcons/ChatRoom/ChatRoom";

const ChatRoomList = ({ openChatWindow, loginId, nc, changeActiveTab, channels }) => {
  // const [channels, setChannels] = useState([]);

  // const getChannels = async () => {
  //   const filter = { state: true, members: loginId };
  //   const sort = { created_at: -1 };
  //   const option = { offset: 0, per_page: 100 };

  //   try {
  //     const channels = await nc.getChannels(filter, sort, option);
  //     console.log(channels.edges);
    
  //     // 모든 채널을 순회하면서 멤버를 필터링하고 업데이트
  //     const updatedChannels = channels.edges.map(channel => {
  //       const filteredMembers = channel.node.members.filter(member => member !== loginId);
  //       const membersString = filteredMembers.join(", "); // 배열을 하나의 문자열로 변환
    
  //       return {
  //         ...channel.node,  // 기존 채널 정보 그대로 가져오기
  //         members: membersString // 필터링된 멤버 문자열로 교체
  //       };
  //     });
    
  //     // 채널을 last_message.created_at 기준으로 정렬 (내림차순)
  //     const sortedChannels = updatedChannels.sort((a, b) => {
  //       const dateA = new Date(a.last_message.created_at); // Date 객체로 변환
  //       const dateB = new Date(b.last_message.created_at); // Date 객체로 변환
    
  //       return dateB - dateA; // 내림차순 정렬: 최신 메시지가 위로 오도록
  //     });
    
  //     setChannels(sortedChannels);  // 모든 채널 데이터 업데이트
  //     console.log("Updated Channels Data:", sortedChannels); // 결과 출력
  //   } catch (error) {
  //     console.error("Error message:", error);
  //   }
    
  // };

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
            nc={nc}
            loginId={loginId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
