import React, { useEffect, useState } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // 로그인 안 된 경우 아이콘
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  return (
    <div className="profile-icon">
      {isLoggedIn ? (
        <>
          <FaUser size={24} style={{ cursor: 'pointer' }} />
          <div className="dropdown-menu">
            <Link to="/profile">프로필</Link>
            <Link to="/settings">설정</Link>
            <Link to="/logout" onClick={() => {
              localStorage.removeItem('isLoggedIn');
              setIsLoggedIn(false);
            }}>로그아웃</Link>
          </div>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} style={{ cursor: 'pointer' }} />
        </Link>
      )}
    </div>
  );
};

export default ProfileIcon;
