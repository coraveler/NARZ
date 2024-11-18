import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import api from "../../../api/axios";
import { getLoginInfo } from "../../../Includes/common/CommonUtil";
import { LuUserPlus2 } from "react-icons/lu";

const SendMessageIcon = ({ openChatWindow, userId, nc, changeActiveTab }) => {
  let loginInfo = getLoginInfo();
  const loginId = loginInfo?.loginId || null;
  const [channel, setChannel] = useState();
  const [recipientId, setRecipientId] = useState();
  const [channelMsgLength, setChannelMsgLength] = useState();

  useEffect(() => {
    console.log(userId);
    getUserInfo();
  }, [userId])

  const getUserInfo = async () => {
    try {
      console.log(userId);
      const response = await api.get(`user/info/${userId}`);
      console.log("debug >>> response, ", response.data);
      setRecipientId(response.data.loginId);
      getChennal(response.data.loginId);
      // return response.data.loginId;
    } catch (err) {
      console.log(err);
      // return null;
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
      const channel = response.edges[0]?.node;
      const updatedMembers = channel.members.filter(member => member !== loginId);
      console.log('Updated members:', updatedMembers);

      // 이제 updatedMembers에는 loginId를 제외한 나머지 members만 들어 있음
      // return { ...channel, members: updatedMembers };

      const filteringCh = { ...channel, members: updatedMembers };
      setChannel(filteringCh);
      getChannelMsgLength(filteringCh.id);
    } catch (error) {
      console.error(error);
      // return null;
    }
  };

  const getChannelMsgLength = async (channelId) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const messages = await nc.getMessages(filter, sort, option);
      console.log(messages);
      setChannelMsgLength(messages.totalCount);
    } catch (error) {
      console.log(error);
    }
  }

  const addFriendIconClick = async () => {
    // const recipientId = await getUserInfo(userId);
    // console.log(recipientId);
    // const channel = await getChennal(recipientId);
    // console.log(channel);
    if (changeActiveTab) {
      changeActiveTab("friends");
    }
    openChatWindow(recipientId, channel);
  }

  return (
    <div>

      <div onClick={addFriendIconClick}>
        {
          (channel && channelMsgLength>1) ?
            <AiOutlineMessage size={45} /> :
            <LuUserPlus2 size={45} />
        }
      </div>
    </div>
  );
};

export default SendMessageIcon;
