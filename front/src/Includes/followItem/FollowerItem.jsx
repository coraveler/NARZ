import React from 'react';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import FollowButton from '../common/FollowButton';
import ProfileInfo from '../common/ProfileInfo';

const FollowerItem = ({ userId }) => {
  let loginInfo = getLoginInfo();
  const loginUserId = loginInfo?.userId || null;
  return (
    <div style={{ width: "600px", display: "flex", alignItems: "center", margin: "10px auto"}}>
      <ProfileInfo userId={userId} fontSize={20} />
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