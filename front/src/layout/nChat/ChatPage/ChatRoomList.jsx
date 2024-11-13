import React, { useEffect, useState } from "react";
import styles from "../ChatWidget.module.css";
import ChatRoom from "../ChatIcons/ChatRoom/ChatRoom";

const ChatRoomList = ({ openChatWindow, loginId, nc, changeActiveTab }) => {
  const [channels, setChannels] = useState([]);

  const getChannels = async () => {
    const filter = { state: true, members: loginId };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };

    try {
      const channels = await nc.getChannels(filter, sort, option);
      console.log(channels.edges);

      // 모든 채널을 순회하면서 멤버를 필터링하고 업데이트
      const updatedChannels = channels.edges.map(channel => {
        const filteredMembers = channel.node.members.filter(member => member !== loginId);
        const membersString = filteredMembers.join(", "); // 배열을 하나의 문자열로 변환

        return {
          ...channel.node,  // 기존 채널 정보 그대로 가져오기
          members: membersString // 필터링된 멤버 문자열로 교체
        };
      });

      setChannels(updatedChannels);  // 모든 채널 데이터 업데이트
      console.log("Updated Channels Data:", updatedChannels); // 결과 출력
    } catch (error) {
      console.error("Error message:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, [loginId]);

  return (
    <div>
      <div className={styles.chatHeader}>
        <h4>채팅</h4>
      </div>
      <div>
        {channels && channels.map((channel) => (
          <ChatRoom
            key={channel.id}  // 채널마다 고유의 key 값을 넣어줘야 합니다.
            channel={channel}
            openChatWindow={openChatWindow}
            changeActiveTab={changeActiveTab}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
