import React from "react";
import AchievementSection from "../../Includes/personalPage/AchievementSection";
import ProfileCard from "../../Includes/personalPage/ProfileCard";
import { getLoginInfo } from "../../Includes/common/CommonUtil";

function AchievementPage({ onBadgeSelect, selectedBadge }) {
  let loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;

  return (
    <div>
      {/* ProfileCard에 selectedBadge를 전달하여 칭호를 반영 */}
      <ProfileCard selectedBadge={selectedBadge} userId={userId}/>
      {/* AchievementSection에서 칭호를 선택하면 onBadgeSelect로 전달 */}
      <AchievementSection onBadgeSelect={onBadgeSelect} />
    </div>
  );
}

export default AchievementPage;
