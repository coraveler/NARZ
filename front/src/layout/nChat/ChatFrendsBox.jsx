import React, { useEffect, useState } from "react";
import ChatLoginUserInfo from "./ChatLoginUserInfo";
import api from "../../api/axios";
import { BsChatDots } from "react-icons/bs";
import NavDropdown from 'react-bootstrap/NavDropdown';

const ChatFrendsBox = ({ channel, openChatWindow, changeActiveTab, friend, nc, loginId, handleChangeFriends }) => {
    // const [userInfo, setUserInfo] = useState();
    const projectId = 'ebd01e35-1e25-4f95-a0c3-3f26ebe44438';
    const apiKey = '050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47';

    // const getChatUserInfo = async () => {
    //     try {
    //         const response = await api.get(
    //             `https://dashboard-api.ncloudchat.naverncp.com/v1/api/members/${channel.members}`,
    //             {
    //                 headers: {
    //                     'accept': 'application/json',
    //                     'x-project-id': projectId,
    //                     'x-api-key': apiKey
    //                 }
    //             }
    //         );
    //         console.log('Login user info fetched:', response.data);
    //         setUserInfo(response.data);
    //     } catch (error) {
    //         console.error('Error fetching login user info:', error.response ? error.response.data : error.message);
    //     }
    // };


    const deleteExitChatRoomTime = async () => {
        const data = {
            loginId: loginId,
            channelId: channel.id
        }
        try {
            const response = await api.delete("/chat/deleteExitChatRoomTime", {params : data});
            console.log(response);
        } catch (error) {
            console.log(error);

        }
    }

    const deleteChannel = async() => {
        try{
            const response = await api.delete(`https://dashboard-api.ncloudchat.naverncp.com/v1/api/channels/${channel.id}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-project-id': projectId,
                        'x-api-key': apiKey
                      }
                }
            );
            console.log(response);
         }catch(error){
            console.log(error);
        }
    }

    const deleteFrinedChannel = async () => {
        try {
            deleteChannel();
            const deleteFriendship = await nc.removeFriend(friend.id);
            deleteExitChatRoomTime();
            handleChangeFriends();
            console.log(deleteFriendship);
        } catch (error) {
            console.error(error);
        }

    }

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
            <BsChatDots onClick={openChatRoom} style={{ fontSize: '30px', marginLeft: "auto", cursor: "pointer", marginRight: "10px" }} />

            <NavDropdown id="basic-nav-dropdown" onClick={(e) => e.stopPropagation()} style={{ marginBottom: "auto" }} value="">

                <NavDropdown.Item onClick={deleteFrinedChannel}>친구 삭제</NavDropdown.Item>

            </NavDropdown>
        </div>
    );
};

export default ChatFrendsBox;
