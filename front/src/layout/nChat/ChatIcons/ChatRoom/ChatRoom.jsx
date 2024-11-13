import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import ChatLoginUserInfo from "../../ChatLoginUserInfo";

const ChatRoom = ({ channel, openChatWindow, changeActiveTab, nc, loginId }) => {
  const [userInfo, setUserInfo] = useState();
  const projectId = 'ebd01e35-1e25-4f95-a0c3-3f26ebe44438';
  const apiKey = '050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47';
  const [unread, setUnread] = useState([]);

  const getChatUserInfo = async () => {
    try {
      const response = await api.get(
        `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${channel.members}`,
        {
          headers: {
            'accept': 'application/json',
            'x-project-id': projectId,
            'x-api-key': apiKey
          }
        }
      );
      console.log('Login user info fetched:', response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching login user info:', error.response ? error.response.data : error.message);
    }
  };

  const getMessages = async() => {
    const filter = { channel_id: channel.id };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };
    try{
      const messages = await nc.getMessages(filter, sort, option);
      console.log(messages);
      markReadAndGetUnread(messages.edges,channel.id)
    }catch(error){
      console.error(error);
    }
  }

  const markReadAndGetUnread = async (messages, channelId) => {
    for (const message of messages) {
      try {
        // 각 메시지에 대해 마크 읽기 처리
        await nc.markRead(channelId, {
          user_id: message.node.sender.id,
          message_id: message.node.message_id,
          sort_id: message.node.sort_id
        });
        // console.log(`Marked message ${message.message_id} as read.`);
      } catch (error) {
        console.error(`Error marking message ${message.message_id} as read:`, error);
      }
    }
    
      try {
        const unread = await nc.unreadCount(channelId);
        setUnread(unread);
        console.log(`Unread count for channel ${channelId}:`, unread);
      } catch (error) {
        console.error(`Error getting unread count for channel ${channelId}:`, error);
      }
  };


  useEffect(() => {
    getMessages();
  }, [channel])

  const setTime = (createdAt) => {
    const messageTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const diffInMs = currentTime - messageTime;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  // 예시 사용
  const timeDisplay = setTime(channel.last_message.created_at);
  console.log(timeDisplay);  // 결과에 따라 "몇 분 전", "몇 시간 전", "몇 일 전"으로 출력


  useEffect(() => {
    console.log(channel);
    getChatUserInfo();
  }, [channel])


  const openChatRoom = () => {
    openChatWindow(null, channel);
    changeActiveTab();
  }

  return (

    <div
      onClick={openChatRoom} 
      style={{
        border: "1px solid #ccc",   // Light grey border
        borderRadius: "8px",         // Rounded corners
        padding: "10px",             // Padding inside the box
        marginBottom: "8px",         // Spacing between items
        cursor: "pointer",            // Pointer cursor on hover
        margin: "10px"
      }}
    >
        <ChatLoginUserInfo userInfo={userInfo} timeDisplay={timeDisplay} msg={channel.last_message.content} unread={unread.user_id!==loginId ? unread:null }/>
        
    </div>

  );
};

export default ChatRoom;
