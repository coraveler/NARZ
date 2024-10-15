import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 임포트
import styled from "styled-components";

const UserActions = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // useNavigate 사용

  return (
    <StyledUserActions>
      <NotificationIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3d0b10c021ae5b658c9777a314a48078e66b82e7c53bbca628055f42fda7c9b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        alt="Notifications"
        onClick={() => { navigate('/calendar'); }} // 캘린더 페이지로 이동
      />
      {isLoggedIn ? (
        <StyledCgProfile />
      ) : (
        <Link to="/LoginFormPage">
          <StyledCgProfile />
        </Link>
      )}
      <Container>
        <MileageIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ede8e5ea61e98385137929506d6a9e8edc27135db52515903d78bebf71a8b2a?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
          alt="User Profile"
        />
        <PointsDisplay>1,000</PointsDisplay>
      </Container>
    </StyledUserActions>
  );
};

export default UserActions;

const StyledUserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NotificationIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 31px;
  cursor: pointer;
`;

const MileageIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 22px;
  cursor: pointer;
`;

const PointsDisplay = styled.div`
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  line-height: 0.5;
  padding: 0 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledCgProfile = styled(CgProfile)`
  width: 30px; /* 아이콘 너비 */
  height: 30px; /* 아이콘 높이 */
`;

const Container = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;
