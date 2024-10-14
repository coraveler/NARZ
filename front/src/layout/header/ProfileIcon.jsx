import React, { useEffect, useState } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // 로그인 안 된 경우 아이콘
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileIcon = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  return (
    <div className="profile-icon">
      {isLoggedIn ? (
        <>
          <ProfileButton onClick={() => { navigate('/profile') }}>
            <FaUser size={24} />
          </ProfileButton>
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

const ProfileButton = styled.button`
  background: none; /* 배경 없음 */
  border: none; /* 테두리 없음 */
  cursor: pointer; /* 커서 포인터로 변경 */
  padding: 0; /* 패딩 없음 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */

  &:hover {
    opacity: 0.7; /* 호버 시 약간 투명하게 */
  }

  &:focus {
    outline: none; /* 포커스 시 아웃라인 제거 */
  }
`;

export default ProfileIcon;
