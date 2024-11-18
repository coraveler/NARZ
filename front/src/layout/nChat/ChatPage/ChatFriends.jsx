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
  const [searchQuery, setSearchQuery] = useState("");  // 검색어 상태 추가
  const [filteredUsers, setFilteredUsers] = useState([]);  // 필터링된 사용자 목록 상태

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

  // 검색어가 바뀔 때마다 필터링
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // 검색어에 맞는 사용자 필터링
    if (query) {
      const filtered = AllUser.filter(user =>
        user.node.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);  // 검색어가 비어 있으면 결과를 초기화
    }
  };

  const handleChangeFriends = () => {
    setFriendChange((state) => !state);
  }

  return (
    <div>
      <div className={styles.chatHeader} style={{ display: "flex", alignItems: "center" }}>
        {
          openPlusFriend &&
          <IoChevronBackOutline onClick={() => setOpenPlusFriend(false)} style={{ fontSize: '30px' }} />
        }
        <ChatLoginUserInfo userInfo={userInfo} projectId={projectId} apiKey={apiKey} />
        <div style={{ marginLeft: 'auto' }}>
          <LuUserPlus2 style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => setOpenPlusFriend(true)} />
        </div>
      </div>

      <div className={styles.chatContent}>

        {/* 친구 추가 화면 */}
        {openPlusFriend ? (
          <div>
            <input
              type="text"
              placeholder="사용자 검색..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                marginBottom: "10px"
              }}
            />
            <div>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div key={index}>
                    <ChatFrendsBox
                      user={user.node}
                      openChatWindow={openChatWindow}
                      nc={nc}
                      loginId={loginId}
                      changeActiveTab={changeActiveTab}
                    />
                  </div>
                ))
              ) : (
                <div>검색된 사용자가 없습니다.</div>
              )}
            </div>
          </div>
        ) : (
          // 친구 목록 화면
          friends.map((friend, index) => {
            const matchedChannel = channels.find(channel => channel.members === friend.node.friend_id);
            if (matchedChannel) {
              return (
                <div key={index}>
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
              return null;
            }
          })
        )}
      </div>
    </div>
  );
};

export default ChatFriends;
