import React, { useEffect, useState } from "react";

const ChatLogin = ({ loginId, userNickname, nc, handleChatLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      await nc.connect({
        id: loginId,
        name: userNickname,
        language: "KR",
      });
      console.log("채팅 로그인 성공");
      handleChatLoginSuccess(true);
      const channels = await getChannels();
    // console.log(channels);
    if (channels) {
      // 채널별로 회원 확인 및 구독
      channels.forEach((channel) => {
        channel.node.members.forEach((member) => {
          if (member === loginId) {
            subscribeChannel(channel.node.id);
          }
        });
      });
    }
    } catch (error) {
      console.error("채팅 로그인 실패:", error);
      handleChatLoginSuccess(false);
    }
    

  };

  const getChannels = async () => {
    const filter = { state: true, members: loginId };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };
    try{
      const channels = await nc.getChannels(filter, sort, option);
      return channels.edges;
    }catch(error){
      console.error("Error message:", error);
      return null;
    }
  }

  const subscribeChannel = async (channelId) => {
    try {
      
      const response = await nc.subscribe(channelId, {"language":"kr"});
  
      if (response) {
        // console.log("subscribeChannel successfully:", response);
        // 성공적으로 메시지가 전송되었을 때 후속 작업
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  useEffect(() => {
    if (loginId && userNickname && nc) {
      handleLogin();
    }
  }, [loginId, userNickname, nc]);

  return null;
};

export default ChatLogin;
