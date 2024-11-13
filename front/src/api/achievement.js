import axios from 'axios';

export const setAchievement = (userId, achievementId) => {
    return axios.post(`http://localhost:7777/achievement/set/${userId}/${achievementId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error setting achievement in API:", error);
            throw error;
        });
};