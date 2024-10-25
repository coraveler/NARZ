import React, { useState, useEffect } from "react";
import styles from '../../css/Personal/AchievementSection.module.css';

function AchievementSection({ onBadgeSelect }) {
  // 페이지가 로드될 때 localStorage에서 선택된 인덱스를 불러옴
  const [clickedIndex, setClickedIndex] = useState(() => {
    const savedIndex = localStorage.getItem('selectedBadgeIndex');
    return savedIndex !== null ? parseInt(savedIndex, 10) : null;
  });

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
    onBadgeSelect(badge);
    // 선택된 인덱스를 localStorage에 저장
    localStorage.setItem('selectedBadgeIndex', index);
    localStorage.setItem('selectedBadge', badge);
  };

  // 페이지가 로드될 때 선택된 칭호를 상위 컴포넌트로 전달
  useEffect(() => {
    const savedBadge = localStorage.getItem('selectedBadge');
    if (savedBadge) {
      onBadgeSelect(savedBadge);
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
    </section>
  );
}

export default AchievementSection;
