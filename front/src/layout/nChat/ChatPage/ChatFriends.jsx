import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "../ChatLoginUserInfo";
import styles from "../ChatWidget.module.css";
import api from "../../../api/axios";

const ChatFriends = ({ loginId, projectId, apiKey, nc }) => {
  const [userInfo, setUserInfo] = useState();
  const [friends, setFriedns] = useState([]);

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
      setFriedns(response.edges);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChatUserInfo();
    getFriendships();
  }, [loginId])

  return (
    <div>
      <div className={styles.chatHeader}>
        <ChatLoginUserInfo userInfo={userInfo} projectId={projectId} apiKey={apiKey} />

      </div>
      <p>친구 목록을 표시합니다.</p>
      {
        friends.map((friend, index) => (
          <p>{friend.node.friend.name}</p>
        ))
      }
    </div>
  );
};

export default ChatFriends;
