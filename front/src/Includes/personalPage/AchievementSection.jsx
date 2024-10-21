import React from "react";
import styles from '../../css/Achievement/AchievementSection.module.css';

function AchievementSection({ onBadgeSelect }) {
  const achievements = [
    { title: "지도 모두 채우기", badge: "전국 정복자" },
    { title: "게시글 100개 이상 작성하기", badge: "파워 트레블러" },
    { title: "댓글 100개 이상 작성하기", badge: "댓글 마스터" },
    { title: "모든 지역 게시물 작성", badge: "방방곡곡 트레블러" },
    { title: "유저 활동 랭킹 1등 달성", badge: "부지런한" },
    { title: "인기 게시글 1등 달성", badge: "재치있는" },
    { title: "1등 5회 이상 달성", badge: "센스 넘치는" }
  ];

  return (
    <section className={styles.achievementSection}>
      <h2 className={styles.sectionTitle}>업적</h2>
      <ul className={styles.achievementList}>
        {achievements.map((achievement, index) => (
          <li key={index} className={styles.achievementItem}>
            <span className={styles.achievementTitle}>{achievement.title}</span>
            <span className={styles.achievementBadge}>{achievement.badge}</span>
            <button 
              className={styles.selectButton}
              onClick={() => onBadgeSelect(achievement.badge)}
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
