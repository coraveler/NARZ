// SettingsTab.js
import React from "react";
import styles from "../ChatWidget.module.css";

const ChatSetting = () => {
    return (
        <div>
            <div className={styles.chatHeader}>
                <h4>설정</h4>
            </div>
            <p>채팅 설정을 표시합니다.</p>
        </div>
);
};

export default ChatSetting;
