import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "./ChatLoginUserInfo";
import api from "../../api/axios";
import { BsChatDots } from "react-icons/bs";

const ChatFrendsBox = ({ channel, openChatWindow, changeActiveTab, friend }) => {
    const [userInfo, setUserInfo] = useState();
    const projectId = 'ebd01e35-1e25-4f95-a0c3-3f26ebe44438';
    const apiKey = '050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47';

    const getChatUserInfo = async () => {
        try {
            const response = await api.get(
                `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${channel.members}`,
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

    useEffect(() => {
        console.log(friend);
    }, [friend])

    const openChatRoom = () => {
        openChatWindow(null, channel);
        changeActiveTab("friends");
    }

    return (
        <div
            // onClick={openChatRoom}
            style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",   // Light grey border
                borderRadius: "8px",         // Rounded corners
                padding: "10px",             // Padding inside the box
                marginBottom: "8px",         // Spacing between items
                margin: "10px"
            }}>

            <ChatLoginUserInfo userInfo={friend} />
            <BsChatDots onClick={openChatRoom} style={{fontSize : '30px', marginLeft:"auto",  cursor: "pointer",  }}/>
        </div>
    );
};

export default ChatFrendsBox;
