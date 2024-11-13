import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import api from "../../../api/axios";
import { getLoginInfo } from "../../../Includes/common/CommonUtil";

const SendMessageIcon = ({ openChatWindow, userId, nc }) => {
  let loginInfo = getLoginInfo();
  const loginId = loginInfo?.loginId || null;


  const getUserInfo = async () => {
    try {
      console.log(userId);
      const response = await api.get(`user/info/${userId}`);
      console.log("debug >>> response, ", response.data);
      return response.data.loginId;
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  const getChennal = async (recipientId) => {
    const filter = { state: true, members: { $all: [loginId, recipientId] } };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const response = await nc.getChannels(filter, sort, option);
      console.log(response);
      // console.log(response.edges[0].node);
  
      // members 배열에서 loginId와 겹치는 값 하나를 제거
      const channel = response.edges[0].node;
      const updatedMembers = channel.members.filter(member => member !== loginId);
      console.log('Updated members:', updatedMembers);
  
      // 이제 updatedMembers에는 loginId를 제외한 나머지 members만 들어 있음
      return { ...channel, members: updatedMembers };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const addFriendIconClick = async() => {
    const recipientId = await getUserInfo(userId);
    console.log(recipientId);
    const channel = await getChennal(recipientId);
    console.log(channel);
    openChatWindow(recipientId, channel)
  }

  return (
    <div>
  
      <div onClick={addFriendIconClick}>
      <AiOutlineMessage size={45} />
      </div>
    </div>
  );
};

export default SendMessageIcon;
