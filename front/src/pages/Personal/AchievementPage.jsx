import React, { useState, useRef } from "react";
import AchievementSection from "../../Includes/personalPage/AchievementSection";
import ProfileCard from "../../Includes/personalPage/ProfileCard";
import { getLoginInfo } from "../../Includes/common/CommonUtil";

function AchievementPage() {
  const [selectedBadge, setSelectedBadge] = useState("여행 초보자"); // 기본 칭호
  const profileInfoRef = useRef(null);

  const handleBadgeSelect = (badge) => {
    setSelectedBadge(badge);
    // ProfileCard에서 최신 칭호를 가져오도록 갱신
    if (profileInfoRef.current) {
      profileInfoRef.current.getUserInfo();
    }
  };

  const loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;

  return (
    <div>
      <ProfileCard selectedBadge={selectedBadge} userId={userId} profileInfoRef={profileInfoRef} />
      <AchievementSection onBadgeSelect={handleBadgeSelect} />
    </div>
  );
}

export default AchievementPage;
