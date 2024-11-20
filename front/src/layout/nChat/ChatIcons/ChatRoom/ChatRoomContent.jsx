import React, { useRef, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessages from "./ChatMessages";
import api from "../../../../api/axios";

const ChatRoomContent = ({ loginId, recipientId, nc, channel }) => {
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [channalId, setChannalId] = useState("");
  const [updateMessage, setUpdateMessage] = useState([]);
  const [friendState, setFriendState] = useState(null);

// onMessageReceived 이벤트 리스너에서 메시지를 받으면 UI에 반영
nc.bind("onMessageReceived", function(channel, receivedMessage) {
  console.log("Received a new message: ", receivedMessage);
  // 기존 메시지 목록에 새로운 메시지를 추가
  setUpdateMessage((prevMessages) => [
    ...prevMessages,
    { node: receivedMessage }, // 새로운 메시지를 추가
  ]);
  scrollToBottom(); // 새로운 메시지가 오면 자동으로 스크롤을 맨 아래로 내립니다.
});

  // 채팅 내용이 갱신될 때 자동으로 스크롤을 맨 아래로 내리기 위한 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (channel) {
      const fetchExitTimeAndMessages = async () => {

        // await을 사용하여 실제 값 가져오기
        const exitTime = await getExitChatRoomTime();

        if (exitTime) {
          getMessages(channel.id, exitTime);  // exitTime 값을 인자로 사용
        } else {
          getMessages(channel.id, null);
        }
      };

      fetchExitTimeAndMessages();
    }
  }, [channel]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  }

  const createChannal = async () => {
    try {
      console.log(`${loginId}_${recipientId}`);

      const response = await nc.createChannel({
        type: "PRIVATE",
        name: `${loginId}_${recipientId}`,
        members: [loginId, recipientId]
        // customField: [CustomField]
      });

      if (response) {
        console.log("Channel created successfully:", response);
        setChannalId(response.id); // 상태 업데이트
        return response.id; // 채널 ID 반환
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
    return null;
  };

  const subscribeChannel = async (channelId) => {
    try {

      const response = await nc.subscribe(channelId, { "language": "kr" });

      if (response) {
        console.log("Message sent successfully:", response);
        // 성공적으로 메시지가 전송되었을 때 후속 작업
      }
      sendMessage(channelId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const sendMessage = async (channelId) => {
    try {
      console.log("Sending message:", message);

      const response = await nc.sendMessage(channelId, {
        type: "text",
        message: message,
      });

      if (response) {
        console.log("Message sent successfully:", response);

        // 기존 messages에 새 메시지 추가하여 실시간 반영
        // setUpdateMessage((prevMessages) => [
        //   ...prevMessages,
        //   { node: response },
        // ]);

        setMessage(""); // 입력창 초기화
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 초기 로드 시 모든 메시지를 가져오기
  const getMessages = async (channelId, exitTime) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const response = await nc.getMessages(filter, sort, option);
      if (exitTime) {
        const filterdMsg = checkExitTime(response.edges, exitTime);
        setUpdateMessage(filterdMsg); // 메시지 초기 로드
      } else {
        setUpdateMessage(response.edges); // 메시지 초기 로드
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  const getExitChatRoomTime = async () => {
    try {
      const response = await api.get(`/chat/getExitChatRoomTime/${loginId}/${channel.id}`);
      console.log(response.data);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const checkExitTime = (messages, exitTime) => {
    const exitDate = new Date(exitTime);
    let index = 0;
    console.log(exitTime);
    for (let i = messages.length - 1; i >= 0; i--) {
      const msgTime = new Date(messages[i].node.created_at);
      console.log(messages[i].node);

      if (exitDate > msgTime) {
        console.log(msgTime);
        index = i;
        break;
      }
    }

    return messages.slice(index + 1, messages.length);
  }




  const requestFriend = async () => {
    try {
      const response = await nc.requestFriend(recipientId);
      console.log(response);
      setFriendState("requested");
    } catch (error) {
      console.error(error);
    }
  }

  const getFriendships = async () => {
    console.log(recipientId);
    const filter = { user_id: loginId, friend_id: recipientId }; // pending: 대기 중
    const sort = { created_at: -1 };
    const option = { offset: 0, limit: 100 };
    try {
      const friends = await nc.getFriendships(filter, sort, option);
      console.log(friends.edges[0].node.status);
      setFriendState(friends.edges[0].node.status);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFriendships();
  }, [loginId, recipientId])

  const acceptFriend = async () => {
    console.log(recipientId);
    try {
      const response = await nc.acceptFriend(recipientId);
      console.log(response);
      setFriendState("accepted");
    } catch (error) {
      console.error(error);
    }
  }
  const rejectFriend = async () => {
    console.log(recipientId);
    try {
      const response = await nc.rejectFriend(recipientId);
      console.log(response);
      setFriendState("rejected");
    } catch (error) {
      console.error(error);
    }
  }

  const saveLastChat = async (message) => {
    const data = {
      channelId: message?.channel_id,
      senderId: message?.sender.id,
      messageId: message?.message_id,
      sortId: message?.sort_id,
      loginId: loginId
    }
    try {
      const response = await api.post(`chat/saveLastChat`, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (updateMessage?.length > 0) {
      scrollToBottom();
      console.log(updateMessage[updateMessage.length - 1]?.node);
      saveLastChat(updateMessage[updateMessage.length - 1]?.node);
    }

  }, [updateMessage]);




  const clickSendBtn = async () => {
    if (!message.trim()) return; // 메시지가 비어있으면 아무 작업도 하지 않음

    let channelId = channalId;
    if (friendState == null) {
      if (!channelId) {
        channelId = await createChannal();
        setChannalId(channelId);  // 새로 생성한 채널 ID 상태 업데이트
      }

      if (channelId) {
        await subscribeChannel(channelId);
        await requestFriend();
      }
    } else {
      await sendMessage(channel.id); // await 추가
    }
  };

  // handleKeyDown에서 클릭 이벤트와 중복되지 않도록 수정
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();  // 기본 엔터 동작(새 줄 입력 등)을 막습니다.
  //     clickSendBtn();
  //   }
  // };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 채팅 메시지 영역 */}
      <div
        style={{
          // flex: 1,
          padding: "10px",
          overflowY: "auto",  // 내용이 많으면 스크롤이 생김
          height: '400px'
        }}
      >
        {/* Mock messages here; replace with real messages */}
        <ChatMessages messages={updateMessage} loginId={loginId} nc={nc} />


        {/* 스크롤을 아래로 내리기 위한 ref */}
        <div ref={messagesEndRef} />

      </div>

      {/* 채팅 입력 및 전송 버튼 */}
      {
        friendState === "accepted" || friendState == null ? (
          // 친구 관계가 수락된 경우 채팅 입력창 표시
          // <div
          //   style={{
          //     display: "flex",
          //     alignItems: "center",
          //     padding: "10px",
          //     backgroundColor: "#fff",
          //     borderTop: "1px solid #ddd",
          //     position: 'absolute',
          //     bottom: 0,
          //     flexShrink: 0,
          //     zIndex: 10,
          //     width: '100%'
          //   }}
          // >
          //   <input
          //     type="text"
          //     placeholder="Type a message..."
          //     style={{
          //       flex: 1,
          //       padding: "8px",
          //       borderRadius: "20px",
          //       border: "1px solid #ddd",
          //       marginRight: "10px",
          //     }}
          //     value={message}
          //     onChange={handleMessage}
          //     onKeyDown={handleKeyDown}
          //   />
          //   <button
          //     style={{
          //       // padding: "8px 12px",
          //       width: '50px',
          //       height: '40px',
          //       borderRadius: "20px",
          //       backgroundColor: "#007bff",
          //       color: "white",
          //       border: "none",
          //       cursor: "pointer",
          //     }}
          //     onClick={clickSendBtn}
          //   >
          //     <AiOutlineSend style={{ fontSize: '20', marginBottom: '3px' }} />
          //   </button>
          // </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ddd",
              position: 'absolute',
              bottom: 0,
              flexShrink: 0,
              zIndex: 10,
              width: '100%',
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();  // 기본 폼 제출 동작(페이지 새로고침) 방지
                clickSendBtn();      // 메시지 전송
              }}
              style={{ display: 'flex', width: '100%' }}  // 폼 내에서 input과 button을 수평 정렬
            >
              <input
                type="text"
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "20px",
                  border: "1px solid #ddd",
                  marginRight: "10px",
                  fontFamily: 'RixXladywatermelonR',

                }}
                value={message}
                onChange={handleMessage}
                // onKeyDown={handleKeyDown}  // Enter 키로도 메시지 전송
              />
              <button
                type="submit"  
                style={{
                  width: '50px', //너비
                  height: '40px',
                  borderRadius: "20px",
                  backgroundColor: "#ffd89d",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <AiOutlineSend style={{ fontSize: '20', marginBottom: '3px' }} />
              </button>
            </form>
          </div>


        ) : friendState === "requested" ? (
          <div>상대방이 친구요청을 수락하면 채팅이 가능합니다.</div>
        ) : friendState === "pending" ?
          <div align="center">
            <span>친구 신청이 왔습니다.</span>
            <br />
            <button onClick={acceptFriend}>수락</button>
            <button onClick={rejectFriend}>거절</button>
          </div> : friendState === "rejected" &&
          <div>상대방이 친구요청을 수락하면 채팅이 가능합니다.</div>




      }
      <style>
            {`
                @font-face {
                    font-family: 'RixXladywatermelonR';
                    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-4@1.0/RixXladywatermelonR.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }
            `}
        </style>

    </div>
  );
};

export default ChatRoomContent;

