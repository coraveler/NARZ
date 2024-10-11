import React from "react";
import styled from "styled-components";

const UserActions = () => {
  return (
    <StyledUserActions>
      <NotificationIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3d0b10c021ae5b658c9777a314a48078e66b82e7c53bbca628055f42fda7c9b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="Notifications" />
      <ProfileIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ede8e5ea61e98385137929506d6a9e8edc27135db52515903d78bebf71a8b2a?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="User Profile" />
      <PointsDisplay>1,000</PointsDisplay>
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

const ProfileIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  cursor: pointer;
`;

const PointsDisplay = styled.div`
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  line-height: 4.5;
  padding: 0 10px;
  
  @media (max-width: 991px) {
    white-space: initial;
  }
`;