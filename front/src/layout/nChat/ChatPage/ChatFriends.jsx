import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "../ChatLoginUserInfo";
import styles from "../ChatWidget.module.css";
import api from "../../../api/axios";
import ChatFrendsBox from "../ChatFrendsBox";
import { LuUserPlus2 } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";

const ChatFriends = ({ loginId, projectId, apiKey, nc, openChatWindow, changeActiveTab, channels }) => {
  const [userInfo, setUserInfo] = useState();
  const [friends, setFriedns] = useState([]);
  const [friendChange, setFriendChange] = useState(false);
  const [openPlusFriend, setOpenPlusFriend] = useState(false);
  const [AllUser, setAllUser] = useState([]);

  const getChatUserInfo = async () => {
    try {
      const response = await api.get(
        `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${loginId}`,
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

  const getFriendships = async () => {
    const filter = { status: "accepted", user_id: loginId }; // pending: 대기 중
    const sort = { created_at: -1 };
    const option = { offset: 0, limit: 100 };
    try {
      const response = await nc.getFriendships(filter, sort, option);
      console.log(response.edges);
      console.log(channels);
      setFriedns(response.edges);
    } catch (error) {
      console.error(error);
    }
  }

  const getAllUser = async () => {
    const filter = { deleted: false };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const members = await nc.getUsers(filter, sort, option);
      console.log(members.edges);
      console.log(loginId);
     // friends 배열의 friend_id 목록 추출
     const friendIds = friends.map(friend => friend.node.friend_id);

     // loginId와 friendIds에 포함된 id를 제외
     const filteredMembers = members.edges.filter(member => 
         member.node.id !== loginId && !friendIds.includes(member.node.id)
     );

     setAllUser(filteredMembers);
    } catch (error) {

    }
  }

  useEffect(() => {
    getChatUserInfo();
    getFriendships();
  }, [loginId, friendChange])

  useEffect(() => {
    if (openPlusFriend) {
      getAllUser();
    }
  }, [openPlusFriend])


  const handleChangeFriends = () => {
    setFriendChange((state) => !state);
  }

  return (
    <div>
      <div className={styles.chatHeader} style={{ display: "flex", alignItems: "center" }}>
        {/* <div style={{ display: "flex", alignItems: "center" }}> */}
        {
          openPlusFriend &&
          <IoChevronBackOutline onClick={() => setOpenPlusFriend(false)} style={{ fontSize: '30px' }} />
        }
        <ChatLoginUserInfo userInfo={userInfo} projectId={projectId} apiKey={apiKey} />
        <div style={{ marginLeft: 'auto' }}>
          <LuUserPlus2 style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => setOpenPlusFriend(true)} />
        </div>
        {/* </div> */}
      </div>
      <div className={styles.chatContent}>

        {!openPlusFriend ?

          friends.map((friend, index) => {
            // channels 배열에서 friend.node.friend_id와 일치하는 channel을 찾음
            const matchedChannel = channels.find(channel => channel.members === friend.node.friend_id);
            // 조건에 맞는 channel이 있을 경우에만 렌더링
            if (matchedChannel) {
              return (
                <div key={index}>
                  {/* 필요한 채널 정보 추가 */}
                  <ChatFrendsBox
                    friend={friend.node.friend}
                    channel={matchedChannel}
                    openChatWindow={openChatWindow}
                    changeActiveTab={changeActiveTab}
                    nc={nc}
                    loginId={loginId}
                    handleChangeFriends={handleChangeFriends} />
                </div>
              );
            } else {
              return null; // 조건에 맞는 channel이 없는 경우 아무것도 렌더링하지 않음
            }
          })
          :
          AllUser.map((user, index) => {
              return (
                <div key={index}>
                  {/* 필요한 채널 정보 추가 */}
                  <ChatFrendsBox
                    user={user.node}
                    openChatWindow={openChatWindow}
                    nc={nc}
                    loginId={loginId}
                    changeActiveTab={changeActiveTab}
                    />
                </div>
              );
          })
        }
      </div>
    </div>
  );
};

export default ChatFriends;
