import React, { useEffect, useState } from "react";
import { FaCrown, FaLock } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { getLoginInfo } from '../../Includes/common/CommonUtil';
import { setAchievement } from '../../api/achievement';
import { checkAllRegionsCoverage, checkCommentCount, checkMapCompletion, checkPostCount } from '../../api/achievementService';
import styles from '../../css/Personal/AchievementSection.module.css';


function AchievementSection({ onBadgeSelect }) {
  const defaultBadge = "여행 초보자";
  const userInfo = getLoginInfo();
  const userId = userInfo ? userInfo.userId : null;

  const savedIndexKey = `selectedBadgeIndex_${userId}`;
  const savedBadgeKey = `selectedBadge_${userId}`;

  const [clickedIndex, setClickedIndex] = useState(() => {
    const savedIndex = localStorage.getItem(savedIndexKey);
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState({});

  const achievements = [
    { id: 0, title: "모든 유저에게 부여되는 칭호", badge: "여행 초보자", condition: () => true },
    { id: 1, title: "지도 모두 채우기", badge: "전국 일주자", condition: async (userId) => await checkMapCompletion(userId) },
    { id: 2, title: "게시글 100개 이상 작성하기", badge: "여행의 장인", condition: async (userId) => await checkPostCount(userId, 2) },
    { id: 3, title: "댓글 100개 이상 작성하기", badge: "댓글 마스터", condition: async (userId) => await checkCommentCount(userId, 3) },
    { id: 4, title: "모든 지역 게시물 작성", badge: "전국 정복자", condition: async (userId) => await checkAllRegionsCoverage(userId) },
    { id: 5, title: "유저 활동 랭킹 1등", badge: "최고 활동러", condition: async (userId) => await checkCommentCount(userId, 1000) },
    { id: 6, title: "인기 게시글 1등", badge: "핫한 작가님", condition: async (userId) => await checkCommentCount(userId, 1000) },
  ];

  useEffect(() => {
    if (userId) {
      const fetchUnlockedAchievements = async () => {
        const unlockedMap = {};
        for (const achievement of achievements) {
          if (await achievement.condition(userId)) {
            unlockedMap[achievement.id] = true;
          }
        }
        setUnlockedAchievements(unlockedMap);
      };
      fetchUnlockedAchievements();
    }
  }, [userId]);

  const handleClick = async (index, achievementId, badge) => {
    if (!userId) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    const achievement = achievements.find(ach => ach.id === achievementId);
    if (achievement && !(await achievement.condition(userId))) {
      window.alert("이 업적을 해금하기 위한 조건이 충족되지 않았습니다.");
      return;
    }

    try {
      const response = await setAchievement(userId, achievementId);
      console.log("API Response:", response);

      setUnlockedAchievements((prevState) => ({
        ...prevState,
        [achievementId]: true
      }));
      setClickedIndex(index);
      onBadgeSelect(badge);

      localStorage.setItem(savedIndexKey, index);
      localStorage.setItem(savedBadgeKey, badge);

      window.alert("칭호를 바꾸셨습니다.");
    } catch (error) {
      console.error("Error setting achievement:", error);
      window.alert("도전과제 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className={styles.achievementSection}><p/>
      <h2 className={styles.sectionTitle}><GiOpenBook style={{color:'#f2ac2e'}}/> 도전과제 <GiOpenBook style={{color:'#f2ac2e'}}/></h2><br/><p/>
      <ul className={styles.achievementList}>
        {achievements.map((achievement, index) => (
          <li key={achievement.id} className={styles.achievementItem}>
            <span className={styles.achievementTitle}><span style={{color:'#f2ac2e'}}><FaCrown />&nbsp;</span> {achievement.title}</span>
            <span
              className={`${achievement.badge === "여행 초보자" ? styles.beginnerBadge : styles.achievementBadge}`}
            >
              {achievement.badge}
            </span>
            <button
              className={`${styles.selectButton} ${clickedIndex === index ? styles.clicked : ''}`}
              onClick={() => handleClick(index, achievement.id, achievement.badge)}
            >
              {unlockedAchievements[achievement.id] ? "선택" : <FaLock />}
            </button>
          </li>
        ))}
      </ul>
      <br/><br/><br/>
    </section>
  );
}

export default AchievementSection;
