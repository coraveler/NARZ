import axios from 'axios';
import React from 'react';
import CryptoJS from 'crypto-js';

const ChatAddUser = ({ id, userNickname, onAddUser }) => {
    const accessKey = 'WVU51fciIf2qn5SYvBMQ14JbfpynVKt5qcV7ahNm';
    const secretKey = 'nuKjuwUzzbCA3uCoCfxz33OEdi7BbvlVbDFTWWpY';
    const projectId = 'ebd01e35-1e25-4f95-a0c3-3f26ebe44438';
    const apiKey = '050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47';

    const userData = {
        userId: id,
        name: userNickname, 
        customField: 'customField'
    };

    const createSignature = (secretKey, timestamp, userData) => {
        const dataToSign = `${timestamp}${JSON.stringify(userData)}`;
        return CryptoJS.HmacSHA256(dataToSign, secretKey).toString(CryptoJS.enc.Hex);
    };

    const addUser = async () => {
        const timestamp = Date.now();
        const signature = createSignature(secretKey, timestamp, userData);
        console.log(userData)
        try {
            const response = await axios.post(
                'https://dashboard-api.ncloudchat.naverncp.com/v1/api/members',
                userData,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-project-id': projectId,
                        'x-api-key': apiKey,
                        'Content-Type': 'application/json',
                        'x-timestamp': timestamp,
                        'x-signature': signature
                    }
                }
            );
            console.log('User added successfully:', response.data);
            onAddUser && onAddUser(true); // 성공 시 콜백 호출
        } catch (error) {
            console.error('Error adding user:', error.response ? error.response.data : error.message);
            onAddUser && onAddUser(false); // 실패 시 콜백 호출
        }
    };

    React.useEffect(() => {
        if (id && userNickname) {
            addUser();
        }
    }, [id, userNickname]);

    return null;
};

export default ChatAddUser;
