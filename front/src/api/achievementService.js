// import axios from 'axios';
import api from './axios';

// 전국일주자
export const checkMapCompletion = async (userId) => {
    try {
        const response = await api.get(`/api/achievement/map-complete/${userId}`);
        console.debug("checkMapCompletion response:", response.data); 
        if(response.data == true){
            const achievement = "전국일주자";
            const result = await fetchAchievementNotification(userId, achievement)
            if(result == false){
                saveAchievementNotificationMsg(userId, achievement)
            }else{
                console.log(`'${achievement}'칭호는 이미 메시지 전송했음!`);
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error in checkMapCompletion:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkMapCompletion endpoint");
        }
        return { isComplete: false };
    }
};

// 여행의장인
export const checkPostCount = async (userId, requiredCount) => {
    try {
        const response = await api.get(`/api/achievement/post-count/${userId}?requiredCount=${requiredCount}`);
        console.debug("checkPostCount response:", response.data);
        if(response.data == true){
            const achievement = "여행의장인";
            const result = await fetchAchievementNotification(userId, achievement)
            if(result == false){
                saveAchievementNotificationMsg(userId, achievement)
            }else{
                console.log(`'${achievement}'칭호는 이미 메시지 전송했음!`);
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error in checkPostCount:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkPostCount endpoint");
        }
        return { isSufficient: false };
    }
};

// 댓글마스터
export const checkCommentCount = async (userId, requiredCount) => {
    try {
        const response = await api.get(`/api/achievement/comment-count/${userId}?requiredCount=${requiredCount}`);
        console.debug("checkCommentCount response:", response.data);
        if(response.data == true){
            const achievement = "댓글마스터";
            const result = await fetchAchievementNotification(userId, achievement)
            if(result == false){
                saveAchievementNotificationMsg(userId, achievement)
            }else{
                console.log(`'${achievement}'칭호는 이미 메시지 전송했음!`);
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error in checkCommentCount:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkCommentCount endpoint");
        }
        return { isSufficient: false };
    }
};

// 전국정복자
export const checkAllRegionsCoverage = async (userId) => {
    try {
        const response = await api.get(`/api/achievement/all-regions/${userId}`);
        console.debug("checkAllRegionsCoverage response:", response.data);
        if(response.data == true){
            const achievement = "전국정복자";
            const result = await fetchAchievementNotification(userId, achievement)
            if(result == false){
                saveAchievementNotificationMsg(userId, achievement)
            }else{
                console.log(`'${achievement}'칭호는 이미 메시지 전송했음!`);
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error in checkAllRegionsCoverage:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkAllRegionsCoverage endpoint");
        }
        return { allCovered: false };
    }
};

// 최고 활동러
export const checkhallOfFame = async (userId) => {
    try {
        const response = await api.get(`/api/achievement/check-hallOfFame/${userId}`);
        console.debug("checkhallOfFame response:", response.data); 
        if(response.data == true){
            const achievement = "최고활동러";
            const result = await fetchAchievementNotification(userId, achievement)
            if(result == false){
                saveAchievementNotificationMsg(userId, achievement)
            }else{
                console.log(`'${achievement}'칭호는 이미 메시지 전송했음!`);
            }
        }
        return response.data;
    } catch (error) {
        console.error("Error in checkMapCompletion:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkMapCompletion endpoint");
        }
        return { isComplete: false };
    }
};

export const assignAchievement = (userId, achievementName) => {
    return api.post(`/api/achievement/set/${userId}`, { achievementName })
        .then(response => {
            console.debug("assignAchievement response:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error assigning achievement in API:", error);
            if (error.response && error.response.status === 404) {
                console.error("Resource not found: assignAchievement endpoint");
            }
            return { success: false, message: "Failed to assign achievement." };
        });
};

export const fetchUnlockedAchievements = async (userId) => {
    try {
        const response = await api.get(`/api/achievement/unlocked/${userId}`);
        console.debug("fetchUnlockedAchievements response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in fetchUnlockedAchievements:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: fetchUnlockedAchievements endpoint");
        }
        return [];
    }
};

export const fetchAllAchievements = async () => {
    try {
        const response = await api.get(`/api/achievement/all`);
        console.debug("fetchAllAchievements response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in fetchAllAchievements:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: fetchAllAchievements endpoint");
        }
        return [];
    }
};




// 업적에 대한 알림이 이미 전송되었는지 확인
export const fetchAchievementNotification = async (userId, achievement) => {
    try {
        const response = await api.get(`/api/achievementNotification?userId=${userId}&achievement=${achievement}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// 업적 알림 메시지 전송 완료 이력 저장
export const saveAchievementNotification = async (userId, achievement) => {

    const data = {
        userId: userId,
        achievement: achievement
    }
    try {
        await api.post(`/api/achievementNotification`, data)
    } catch (error) {
        console.log(error);
    }
};

// 업적에 대한 알림 메시지를 추가함
export const saveAchievementNotificationMsg = async (userId, achievement) => {

    const msgTitle = `'${achievement}'칭호가 해금되었습니다.`
    const msgContent = `개인페이지의 도전과제에서 확인해 보세요.`

    const data = {
        msgTitle : msgTitle,
        msgContent : msgContent,
        userId : userId
    }

    try {
        await api.post("/api/notificationMessage", data)
        saveAchievementNotification(userId, achievement);
        alert(`'${achievement}'칭호가 해금되었습니다. 도전과제에서 확인하세요.`)
    } catch (error) {
        console.log(error);
    }
};
