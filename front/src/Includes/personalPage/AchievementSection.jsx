import React, { useState, useEffect } from "react";
import styles from '../../css/Personal/AchievementSection.module.css';
import { getLoginInfo } from '../../Includes/common/CommonUtil';
import { setAchievement } from '../../api/achievement';

function AchievementSection({ onBadgeSelect }) {
  const defaultBadge = "여행 초보자";
  const [clickedIndex, setClickedIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedBadgeIndex');
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

  const userInfo = getLoginInfo();
  const userId = userInfo ? userInfo.userId : null;

  const handleClick = async (index, achievementId, badge) => {
    if (!userId) {
        alert("로그인이 필요합니다.");
        return;
    }

    try {
      const response = await setAchievement(userId, achievementId);
      console.log("API Response:", response);

      if (response?.status === 200 || (typeof response === "string" && response.includes("Achievement set successfully"))) {
          setClickedIndex(index);
          setIsResetClicked(false);
          onBadgeSelect(badge);  // 칭호 업데이트
          localStorage.setItem('selectedBadgeIndex', index);
          localStorage.setItem('selectedBadge', badge);
          alert("도전과제가 성공적으로 설정되었습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
          alert("도전과제 설정에 실패했습니다. 조건이 충족되지 않았습니다.");
      } else {
          alert("도전과제 설정 중 오류가 발생했습니다.");
      }
    }
  };

  const resetToDefaultBadge = () => {
    setClickedIndex(null);
    setIsResetClicked(true);
    onBadgeSelect(defaultBadge);
    localStorage.setItem('selectedBadgeIndex', null);
    localStorage.setItem('selectedBadge', defaultBadge);
  };

  useEffect(() => {
    const savedBadge = localStorage.getItem('selectedBadge');
    if (savedBadge) {
      onBadgeSelect(savedBadge);
    } else {
      onBadgeSelect(defaultBadge);
      localStorage.setItem('selectedBadge', defaultBadge);
    }
  }, [onBadgeSelect]);

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
      <button 
        className={styles.resetButton} 
        onClick={resetToDefaultBadge}
        style={{ marginLeft: '93%', backgroundColor: 'white', color: '#FF8A2B', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', outline: '1px solid #FF8A2B', cursor: 'pointer' }}
      >
        리셋
      </button>
    </section>
  );
}

export default AchievementSection;
