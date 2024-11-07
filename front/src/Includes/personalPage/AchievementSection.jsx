import React, { useState, useEffect } from "react";
import styles from '../../css/Personal/AchievementSection.module.css';

function AchievementSection({ onBadgeSelect }) {
  const defaultBadge = "여행 초보자";
  
  const [clickedIndex, setClickedIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedBadgeIndex');
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });

  // resetButton 클릭 상태를 저장하는 상태 변수
  const [isResetClicked, setIsResetClicked] = useState(false);

  const achievements = [
    { title: "지도 모두 채우기", badge: "전국 일주자" },
    { title: "게시글 100개 이상 작성하기", badge: "여행의 장인" },
    { title: "댓글 100개 이상 작성하기", badge: "댓글 마스터" },
    { title: "모든 지역 게시물 작성", badge: "전국 정복자" },
    { title: "유저 활동 랭킹 1등 달성", badge: "최고 활동러" },
    { title: "인기 게시글 1등 달성", badge: "핫한 작가님" },
    { title: "1등 5회 이상 달성", badge: "랭킹 챔피언" }
  ];

  const handleClick = (index, badge) => {
    setClickedIndex(index);
    setIsResetClicked(false); // 다른 버튼 클릭 시 리셋 버튼 상태 초기화
    onBadgeSelect(badge);
    localStorage.setItem('selectedBadgeIndex', index);
    localStorage.setItem('selectedBadge', badge);
  };

  const resetToDefaultBadge = () => {
    setClickedIndex(null);
    setIsResetClicked(true); // resetButton이 클릭됨을 표시
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
          <li key={index} className={styles.achievementItem}>
            <span className={styles.achievementTitle}>{achievement.title}</span>
            <span className={styles.achievementBadge}>{achievement.badge}</span>
            <button
              className={`${styles.selectButton} ${clickedIndex === index ? styles.clicked : ''}`}
              onClick={() => handleClick(index, achievement.badge)}
            >
              선택
            </button>
          </li>
        ))}
      </ul>
      <button 
          className={styles.resetButton} 
          onClick={resetToDefaultBadge}
          style={{
            marginLeft: '93%',
            backgroundColor: 'white',
            color: '#FF8A2B',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            outline: '1px solid #FF8A2B',
            cursor: 'pointer'
          }}
        >
          리셋
        </button>
    </section>
  );
}

export default AchievementSection;
