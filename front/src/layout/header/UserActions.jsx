import React from "react";
import styled from "styled-components";

const UserActions = () => {
  return (
    <ActionsContainer>
      <NotificationButton aria-label="Notifications">
        <NotificationIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ede8e5ea61e98385137929506d6a9e8edc27135db52515903d78bebf71a8b2a?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="" />
      </NotificationButton>
      <PointsDisplay>1,000</PointsDisplay>
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
`;

const NotificationIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const PointsDisplay = styled.span`
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  line-height: 4.5;
  padding: 36px 1px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

export default UserActions;