import axios from 'axios';

export const checkMapCompletion = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:7777/api/achievement/map-complete/${userId}`);
        console.debug("checkMapCompletion response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in checkMapCompletion:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkMapCompletion endpoint");
        }
        return { isComplete: false };
    }
};

export const checkPostCount = async (userId, requiredCount) => {
    try {
        const response = await axios.get(`http://localhost:7777/api/achievement/post-count/${userId}?requiredCount=${requiredCount}`);
        console.debug("checkPostCount response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in checkPostCount:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkPostCount endpoint");
        }
        return { isSufficient: false };
    }
};

export const checkCommentCount = async (userId, requiredCount) => {
    try {
        const response = await axios.get(`http://localhost:7777/api/achievement/comment-count/${userId}?requiredCount=${requiredCount}`);
        console.debug("checkCommentCount response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in checkCommentCount:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkCommentCount endpoint");
        }
        return { isSufficient: false };
    }
};

export const checkAllRegionsCoverage = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:7777/api/achievement/all-regions/${userId}`);
        console.debug("checkAllRegionsCoverage response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in checkAllRegionsCoverage:", error);
        if (error.response && error.response.status === 404) {
            console.error("Resource not found: checkAllRegionsCoverage endpoint");
        }
        return { allCovered: false };
    }
};

export const assignAchievement = (userId, achievementName) => {
    return axios.post(`http://localhost:7777/api/achievement/set/${userId}`, { achievementName })
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
        const response = await axios.get(`http://localhost:7777/api/achievement/unlocked/${userId}`);
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
        const response = await axios.get(`http://localhost:7777/api/achievement/all`);
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

