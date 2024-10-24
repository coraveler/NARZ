import React from "react";
import AchievementSection from "../Includes/personalPage/AchievementSection";
import ProfileCard from "../Includes/personalPage/ProfileCard";

function AchievementPage({ onBadgeSelect, selectedBadge }) {
  return (
    <div>
      {/* ProfileCard에 selectedBadge를 전달하여 칭호를 반영 */}
      <ProfileCard selectedBadge={selectedBadge} />
      {/* AchievementSection에서 칭호를 선택하면 onBadgeSelect로 전달 */}
      <AchievementSection onBadgeSelect={onBadgeSelect} />
    </div>
  );
}

export default AchievementPage;
