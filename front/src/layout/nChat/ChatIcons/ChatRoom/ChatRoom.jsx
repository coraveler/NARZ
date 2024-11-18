import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import ChatLoginUserInfo from "../../ChatLoginUserInfo";
import NavDropdown from 'react-bootstrap/NavDropdown';

const ChatRoom = ({ channel, openChatWindow, changeActiveTab, loginId }) => {
  const [userInfo, setUserInfo] = useState();
  const projectId = 'ebd01e35-1e25-4f95-a0c3-3f26ebe44438';
  const apiKey = '050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47';
  const [display, setDisplay] = useState(null);

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
    getChatUserInfo();
    getExitChatRoomTime();
  }, [channel])

  const openChatRoom = () => {
    openChatWindow(null, channel);
    changeActiveTab("chats");
  }

  const saveExitChatRoomTime = async () => {
    const currentTime = new Date();
    const timeOffset = 9 * 60; // 한국 시간은 UTC+9
    const timeString = new Date(currentTime.getTime() + timeOffset * 60000).toISOString().replace('Z', '+09:00'); // 타임존을 +09:00로 수정
    const data = {
      loginId: loginId,
      createdAt: timeString,
      channelId: channel.id
    }
    console.log(data);
    try {
      const response = await api.post("/chat/saveExitChatRoomTime", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    getExitChatRoomTime();
  }

  const getExitChatRoomTime = async () => {
    try {
      const response = await api.get(`/chat/getExitChatRoomTime/${loginId}/${channel.id}`);
      console.log(response.data);
      if (response.data) {
        setDisplay(checkExitTime(response.data, channel.last_message.created_at));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const checkExitTime = (exit, lastMsg) => {
    console.log(exit);
    console.log(lastMsg);
    const exitDate = new Date(exit);
    const lastMsgDate = new Date(lastMsg);

    // exit이 lastMsg보다 더 최근일 경우
    if (exitDate > lastMsgDate) {
      return "none";
    } else {
      return null;
    }
  }

  return (

    <div
      onClick={openChatRoom}
      style={{
        display: display ? display :"flex",
        border: "1px solid #ccc",   // Light grey border
        borderRadius: "8px",         // Rounded corners
        padding: "10px",             // Padding inside the box
        marginBottom: "8px",         // Spacing between items
        cursor: "pointer",            // Pointer cursor on hover
        margin: "10px",
       
      }}
    >
      <ChatLoginUserInfo userInfo={userInfo} timeDisplay={timeDisplay} msg={channel.last_message.content} unread={channel.unread} />

      <NavDropdown id="basic-nav-dropdown" onClick={(e) => e.stopPropagation()} style={{ marginLeft: "auto" }}>

        <NavDropdown.Item onClick={saveExitChatRoomTime}>나가기</NavDropdown.Item>

      </NavDropdown>

    </div>

  );
};

export default ChatRoom;
