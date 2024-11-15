import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import ChatLoginUserInfo from "../ChatLoginUserInfo";
import ChatRoomContent from "../ChatIcons/ChatRoom/ChatRoomContent";
import styles from "../ChatWidget.module.css";
import api from "../../../api/axios";

const ChatChating = ({ loginId, recipientId, exitChatRoom, nc, projectId, apiKey, messages, channel }) => {
    const[userInfo, setUserInfo] = useState();

    const getChatUserInfo = async () => {
        try {
          const response = await api.get(
            `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${recipientId ? recipientId : channel.members}`,
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
        getChatUserInfo();
        console.log(recipientId);
      },[ channel, recipientId])

    return (
        <div >


            <div className={styles.chatHeader}>
         
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IoChevronBackOutline onClick={exitChatRoom} style={{ fontSize: '30px' }} /> &nbsp;&nbsp;&nbsp;
                        <ChatLoginUserInfo userInfo={userInfo} projectId={projectId} apiKey={apiKey} />
                    </div>
               
            </div>
          
            <div>
                    <ChatRoomContent loginId={loginId} recipientId ={recipientId ? recipientId : channel.members} exitChatRoom={exitChatRoom} nc={nc} messages={messages} channel={channel}/>
              
                    {/* <ChatRoomList enterChatRoom={enterChatRoom} /> */}
            </div>
        </div>
    );
};

export default ChatChating;
