import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "../../ChatLoginUserInfo";

const ChatMessages = ({ messages, loginId, nc }) => {
    const [userInfoArray, setUserInfoArray] = useState([]);

    const getChatUserInfo = async (message, index) => {
        console.log(message.node.sender.id);
        console.log(message);
        const filter = { id: message.node.sender.id };
        const sort = { created_at: -1 };
        const option = { offset: 0, per_page: 100 };
        try {
            const response = await nc.getUsers(filter, sort, option);
            console.log('Login user info fetched:', response);
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
        <div>
            {messages && messages.map((message, index) => (
                message.node && message.node.sender && message.node.sender.id === loginId ? (
                    <div key={index} style={{ marginLeft: "auto" }}>
                        <ChatLoginUserInfo userInfo={userInfoArray[index]} msg={message.node.content} state={'login'}/>
                    </div>
                ) : (
                    <div key={index} style={{ marginRight: "auto" }}>
                        <ChatLoginUserInfo userInfo={userInfoArray[index]} msg={message.node.content} state={'recipient'}/>
                    </div>
                )
            ))}
        </div>
    );
};

export default ChatMessages;
