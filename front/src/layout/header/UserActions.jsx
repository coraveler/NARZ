import React, { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 임포트
import styled from "styled-components";
import NotificationModal from "../../Includes/nofification/NotificationModal";


const UserActions = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // useNavigate 사용
  const [notificationModalStatus, setNotificationModalStatus] = useState(false);

  const notificationModalClose = () => {
    setNotificationModalStatus(false);
  }

  return (
    <>
      <StyledUserActions>
        {/* 알림 아이콘 */}
        <NotificationIcon onClick={()=>setNotificationModalStatus(true)}>
          <MdNotificationsNone/>
          <NotificationCount>2</NotificationCount>
        </NotificationIcon>
        {/* 캘린더 아이콘 */}
        <CalendarIcon onClick={() => { navigate('/calendar'); }}>
          <FaRegCalendarAlt/> 
        </CalendarIcon>
        {/* 사용자 아이콘 */}
        {isLoggedIn 
          ? (<StyledCgProfile />) 
          : (<Link to="/LoginFormPage"><StyledCgProfile /></Link>)
        }
        {/* 마일리지 */}
        <Container>
          <MileageIcon ><BsCoin/></MileageIcon>
          <PointsDisplay >1,000 <span style={{fontSize:'10px'}}>포인트</span></PointsDisplay>
        </Container>
      </StyledUserActions>

      <NotificationModal
        notificationModalStatus={notificationModalStatus}
        notificationModalClose={notificationModalClose}/>
    </>
  );
};

export default UserActions;



const StyledUserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;


// 스타일 추가
const NotificationIcon = styled.div`
  position: relative; // position을 relative로 설정
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
  font-size: 34px;

  &:hover {
    color: #555;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const NotificationCount = styled.span`
  width: 18px;
  text-align: center;
  position: absolute;
  top: -2px; // 위치 조정
  right: -6px; // 위치 조정
  background-color: red; // 배경색
  color: white; // 글자색
  border-radius: 20px;
  padding: 1px;
  font-size: 12px;
  font-weight: bold;
`;

const CalendarIcon = styled.div`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
  font-size: 28px;
  margin-bottom: 2px;

  &:hover {
    color: #555; // 호버 시 텍스트 색상 변경
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 그림자 변경
`;


const MileageIcon = styled.div`
  width: 24px;
  font-size: 20px;
  cursor: pointer;
  color: orange;
  margin-left: 3px;
  margin-bottom: 1px;
`;

const PointsDisplay = styled.div`
  text-align: center;
  letter-spacing: -1px;
  margin-right: 5px;
  font-size: 18px;
  font-weight: 600;
  text-align: right; /* 텍스트를 오른쪽 정렬 */

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StyledCgProfile = styled(CgProfile)`
  width: 32px; /* 아이콘 너비 */
  height: 32px; /* 아이콘 높이 */

  &:hover {
    color: #555; // 호버 시 텍스트 색상 변경
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 그림자 변경
`;

const Container = styled.div`
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  border: 2px solid black;
  border-radius: 15px;
  padding: 4px;
  justify-content: space-between;
  width: 130px;
  border-color: #555555;
`;
