import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "../ChatLoginUserInfo";
import styles from "../ChatWidget.module.css";
import api from "../../../api/axios";
import ChatFrendsBox from "../ChatFrendsBox";

const ChatFriends = ({ loginId, projectId, apiKey, nc, openChatWindow, changeActiveTab, channels }) => {
  const [userInfo, setUserInfo] = useState();
  const [friends, setFriedns] = useState([]);
  const [friendChange, setFriendChange] = useState(false);

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

  useEffect(() => {
    getChatUserInfo();
    getFriendships();
  }, [loginId,friendChange])


  const handleChangeFriends = () =>{
    setFriendChange((state) => !state);
  }

  return (
    <div>
      <div className={styles.chatHeader}>
        <ChatLoginUserInfo userInfo={userInfo} projectId={projectId} apiKey={apiKey} />

      </div>
      <div className={styles.chatContent}>
        {/* <p>친구 목록을 표시합니다.</p>
      {
        friends.map((friend, index) => (
          <p>{friend.node.friend.name}</p>
          
        ))
      } */}
        {
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
                    handleChangeFriends={handleChangeFriends}/>
                </div>
              );
            } else {
              return null; // 조건에 맞는 channel이 없는 경우 아무것도 렌더링하지 않음
            }
          })
        }
      </div>
    </div>
  );
};

export default ChatFriends;
