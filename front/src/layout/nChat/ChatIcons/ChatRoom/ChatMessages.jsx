import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "../../ChatLoginUserInfo";

const ChatMessages = ({ messages, loginId, nc }) => {
    const [userInfoArray, setUserInfoArray] = useState([]);

    // 날짜 포맷 함수
    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const today = new Date();

        // 오늘 날짜와 비교
        const isToday = 
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();

        if (isToday) {
            // 오늘 날짜라면 시간과 분만 표시
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            // 오늘 날짜가 아니면 월.일 형식으로 표시
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${month}.${day}`;
        }
    };

    const getChatUserInfo = async (message, index) => {
        const filter = { id: message.node.sender.id };
        const sort = { created_at: -1 };
        const option = { offset: 0, per_page: 100 };
        try {
            const response = await nc.getUsers(filter, sort, option);
            setUserInfoArray((prevUserInfo) => {
                const newUserInfo = [...prevUserInfo];
                newUserInfo[index] = response.edges[0].node;
                return newUserInfo;
            });
        } catch (error) {
            console.error('Error fetching login user info:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (messages) {
            messages.forEach((message, index) => {
                if (message.node && message.node.sender) {
                    getChatUserInfo(message, index);
                }
            });
        }
    }, [messages, loginId]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {messages && messages.map((message, index) => (
                message.node && message.node.sender && message.node.sender.id === loginId ? (
                    <div key={index} style={{ marginLeft: "auto", display:'flex', gap:"10px" }}>
                        <div style={{marginTop:'auto', fontSize:'14px'}}>{formatDate(message.node.created_at)}</div>
                        <ChatLoginUserInfo userInfo={userInfoArray[index]} msg={message.node.content} state={'login'} date={formatDate(message.node.created_at)} />
                    </div>
                ) : (
                    <div key={index} style={{ display:'flex'}}>
                        <ChatLoginUserInfo userInfo={userInfoArray[index]} msg={message.node.content} state={'recipient'}  date={formatDate(message.node.created_at)} />
                        <div style={{marginTop:'auto', marginRight: "auto", fontSize:'14px'}}>{formatDate(message.node.created_at)}</div>
                    </div>
                )
            ))}
        </div>
    );
};

export default ChatMessages;
