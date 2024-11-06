import React from 'react';
import ProfileInfo from '../common/ProfileInfo';
import FollowButton from '../common/FollowButton';
import { getLoginInfo } from "../../Includes/common/CommonUtil";

const FollowerItem = ({ userId }) => {
  let loginInfo = getLoginInfo();
  const loginUserId = loginInfo?.userId || null;
  return (
    <div style={{ width: "700px", display: "flex", alignItems: "center", margin: "20px auto"}}>
      <ProfileInfo userId={userId} />
      {
        loginUserId != userId &&
        <div style={{marginLeft:'auto'}}>
          <FollowButton followedId={userId} />
        </div>
      }
    </div>
  );
};

export default FollowerItem;