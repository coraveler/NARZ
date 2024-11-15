import axios from 'axios';


export const setAchievement = (userId, achievementId) => {
    // 전달된 userId와 achievementId 값이 올바른지 확인하는 로그 추가
    console.log(`Setting achievement for userId: ${userId}, achievementId: ${achievementId}`);

    return axios.post(`http://localhost:7777/api/achievement/set/${userId}/${achievementId}`)
        .then(response => {
            console.log("Achievement set response:", response.data);
            return response.data;
        })
        .catch(error => {
            // 에러가 발생했을 때 HTTP 상태 코드와 에러 메시지를 좀 더 자세히 로깅
            if (error.response) {
                console.error("Error setting achievement in API:", error.response.data);
                console.error("Status code:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received from API:", error.request);
            } else {
                console.error("Unexpected error in setAchievement:", error.message);
            }
            throw error;
        });
};
export const getUnlockedAchievements = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:7777/api/achievement/unlocked/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching unlocked achievements:", error);
        throw error;
    }
};