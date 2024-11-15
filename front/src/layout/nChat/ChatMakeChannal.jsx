import React from "react";

const ChatMakeChannel = ({ id, password, nc }) => {

  const handleChannelCreation = async () => {
    

      try {
        await nc.createChannel({
          type: 'Public',
          name: "test1"
          // customField: [CustomField] // 필요 시 사용자 정의 필드 추가
        });
        console.log("채널 생성 성공");
      } catch (error) {
        console.error("채널 생성 실패:", error);
      }
   
  };

  return (
    <div>
      <button onClick={handleChannelCreation}>채널 생성하기</button>
    </div>
  );
};

export default ChatMakeChannel;
