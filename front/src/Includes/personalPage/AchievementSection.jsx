import React, { useState, useEffect } from "react";
import styles from '../../css/Personal/AchievementSection.module.css';
import { getLoginInfo } from '../../Includes/common/CommonUtil';
import { setAchievement } from '../../api/achievement';

function AchievementSection({ onBadgeSelect }) {
  const defaultBadge = "여행 초보자";
  const userInfo = getLoginInfo();
  const userId = userInfo ? userInfo.userId : null;

  // 사용자별로 localStorage 키를 생성합니다.
  const savedIndexKey = `selectedBadgeIndex_${userId}`;
  const savedBadgeKey = `selectedBadge_${userId}`;

  const [clickedIndex, setClickedIndex] = useState(() => {
    const savedIndex = localStorage.getItem(savedIndexKey);
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });
  const [isResetClicked, setIsResetClicked] = useState(false);

  const achievements = [
    { id: 1, title: "지도 모두 채우기", badge: "전국 일주자" },
    { id: 2, title: "게시글 100개 이상 작성하기", badge: "여행의 장인" },
    { id: 3, title: "댓글 100개 이상 작성하기", badge: "댓글 마스터" },
    { id: 4, title: "모든 지역 게시물 작성", badge: "전국 정복자" },
    { id: 5, title: "유저 활동 랭킹 1등 달성", badge: "최고 활동러" },
    { id: 6, title: "인기 게시글 1등 달성", badge: "핫한 작가님" }
  ];

  const handleClick = async (index, achievementId, badge) => {
    if (!userId) {
        alert("로그인이 필요합니다.");
        return;
    }

    try {
      const response = await setAchievement(userId, achievementId);
      console.log("API Response:", response);

      if (typeof response === "string" && response.includes("Achievement set successfully")) {
          setClickedIndex(index);
          setIsResetClicked(false);
          onBadgeSelect(badge);
          localStorage.setItem(savedIndexKey, index);
          localStorage.setItem(savedBadgeKey, badge);
          alert("도전과제가 성공적으로 설정되었습니다.");
      } else if (response?.status === 200) {
          setClickedIndex(index);
          setIsResetClicked(false);
          onBadgeSelect(badge);
          localStorage.setItem(savedIndexKey, index);
          localStorage.setItem(savedBadgeKey, badge);
          alert("도전과제가 성공적으로 설정되었습니다.");
      }
  } catch (error) {
      if (error.response && error.response.status === 400) {
          console.error("Achievement setting failed: Achievement requirements not met.");
          alert("도전과제 설정에 실패했습니다. 조건이 충족되지 않았습니다.");
      } else {
          console.error("Error setting achievement:", error);
          alert("도전과제 설정 중 오류가 발생했습니다.");
      }
  }
}

  const resetToDefaultBadge = () => {
    setClickedIndex(null);
    setIsResetClicked(true);
    onBadgeSelect(defaultBadge);
    localStorage.setItem(savedIndexKey, null);
    localStorage.setItem(savedBadgeKey, defaultBadge);
  };

  useEffect(() => {
    const savedBadge = localStorage.getItem(savedBadgeKey);
    if (savedBadge) {
      onBadgeSelect(savedBadge);
    } else {
      onBadgeSelect(defaultBadge);
      localStorage.setItem(savedBadgeKey, defaultBadge);
    }
  }, [onBadgeSelect, savedBadgeKey]);

  return (
    <section className={styles.achievementSection}>
      <h2 className={styles.sectionTitle}>도전과제</h2>
      <ul className={styles.achievementList}>
        {achievements.map((achievement, index) => (
          <li key={achievement.id} className={styles.achievementItem}>
            <span className={styles.achievementTitle}>{achievement.title}</span>
            <span className={styles.achievementBadge}>{achievement.badge}</span>
            <button
              className={`${styles.selectButton} ${clickedIndex === index ? styles.clicked : ''}`}
              onClick={() => handleClick(index, achievement.id, achievement.badge)}
            >
              선택
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AchievementSection;
