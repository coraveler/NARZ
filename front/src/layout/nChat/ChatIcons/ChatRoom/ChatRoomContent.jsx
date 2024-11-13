import React, { useRef, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessages from "./ChatMessages";

const ChatRoomContent = ({ loginId, recipientId, nc, messages, channel }) => {
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [channalId, setChannalId] = useState("");
  const [updateMessage, setUpdateMessage] = useState([]);
  const [friendState, setFriendState] = useState(false);

  // 채팅 내용이 갱신될 때 자동으로 스크롤을 맨 아래로 내리기 위한 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 컴포넌트가 마운트되거나 메시지가 업데이트 될 때마다 자동으로 스크롤 내리기
  useEffect(() => {
    console.log(messages);
    scrollToBottom();
    console.log(recipientId);
    setUpdateMessage(messages);
  }, [messages]); // 채팅 메시지가 바뀔 때마다 호출되도록 할 수도 있음


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
        setMessage(""); // 입력창 초기화
        // await getMessages(channelId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

  };

  const requestFriend = async () => {
    try {
      const response = await nc.requestFriend(recipientId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const getFriendships = async () => {
    console.log(recipientId);
    const filter = { status: "accepted", user_id: loginId, friend_id: recipientId}; // pending: 대기 중
    const sort = { created_at: -1 };
    const option = { offset: 0, limit: 100 };
    try {
      const friends = await nc.getFriendships(filter, sort, option);
      console.log(friends);
      if(friends.totalCount > 0) {
        setFriendState(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFriendships();
  },[loginId, recipientId])

  // const getMessages = async (channelId) => {
  //   const filter = { channel_id: channelId };
  //   const sort = { created_at: -1 };
  //   const option = { offset: 0, per_page: 100 };
  //   try {
  //     const response = await nc.getMessages(filter, sort, option);
  //     setUpdateMessage(response.edges);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const acceptFriend = async() => {
    console.log(recipientId);
    try{
      const response = await nc.acceptFriend(recipientId);
      console.log(response);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    if (updateMessage?.length > 0) {
      scrollToBottom();
    }
  }, [updateMessage]);


  const clickSendBtn = async () => {
    let channelId = channalId;

    if(!friendState){
      if (!channelId) {
        channelId = await createChannal();
        setChannalId(channelId);  // 새로 생성한 채널 ID 상태 업데이트
      }
  
      if (channelId ) {
        await subscribeChannel(channelId);
        // await getMessages(channelId);  // 메시지 가져오기가 완료될 때까지 대기
        await requestFriend();
      }
      // setFriendState(false);
    }else{
      sendMessage(channel.id);
    }
  };


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
        <ChatMessages messages={updateMessage && updateMessage} loginId={loginId} nc={nc} />


        {/* 스크롤을 아래로 내리기 위한 ref */}
        <div ref={messagesEndRef} />

      </div>

      {/* 채팅 입력 및 전송 버튼 */}
      {
        (messages?.length === 1) && !friendState ?
        
          channel?.last_message.sender.id === loginId ? (
            <div>상대방이 친구요청을 수락하면 채팅이 가능합니다.</div>
          ) : 
          <div>
            <button onClick={acceptFriend}>수락</button>
            <button>거절</button>
          </div>
        
          

          : <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ddd",
              position: 'absolute',
              bottom: 0,  // 하단에 고정되도록
              flexShrink: 0, // 축소되지 않도록
              zIndex: 10, // 다른 요소들 위로 올라오게
              width: '100%'
            }}
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
              }}
              value={message}
              onChange={handleMessage}
            />
            <button
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={clickSendBtn}
            >

              <AiOutlineSend size={20} />
            </button>
          </div>}
    </div>
  );
};

export default ChatRoomContent;
