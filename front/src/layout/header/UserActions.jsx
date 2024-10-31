import React, { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 임포트
import styled from "styled-components";
import NotificationModal from "../../Includes/nofification/NotificationModal";
import { getLoginInfo } from "../../Includes/common/CommonUtil";


// UserActions 컴포넌트
const UserActions = ({ isLoggedIn }) => {
  const isMac = () => navigator.platform.toLowerCase().includes('mac');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const [notificationModalStatus, setNotificationModalStatus] = useState(false); // 알림 모달 상태 관리
  const [notificationCount, setNotificationCount] = useState(0); // 알림 카운트 상태 관리
  let loginInfo = getLoginInfo();
  // 알림 모달 닫기 핸들러
  const notificationModalClose = () => {
    setNotificationModalStatus(false);
  };

  // 알림 카운트 설정 핸들러
  const notificationCountHandler = (count) => {
    setNotificationCount(count);
  };

  const ProfileIconComponent = isMac() ? StyledCgProfileMac : StyledCgProfile;
  
  

  return (
    <>
      <StyledUserActions>
        {/* 알림 아이콘 */}
        <NotificationIcon onClick={() => setNotificationModalStatus(true)}>
          <MdNotificationsNone />
          {/* 알림 카운트가 0이 아니면 카운트 표시 */}
          {notificationCount === 0 ? '' : <NotificationCount>{notificationCount}</NotificationCount>}
        </NotificationIcon>

        {/* 캘린더 아이콘 클릭 시 캘린더 페이지로 이동 */}
        <CalendarIcon onClick={() => navigate('/calendar')}>
          <FaRegCalendarAlt />
        </CalendarIcon>


        {/* 로그인 상태에 따라 프로필 아이콘 처리 */}

        {loginInfo !=null
          ? (<Link to ="/personal/EditProfilePage"><ProfileIconComponent /></Link>) // 로그인된 경우
          : (<Link to="/LoginFormPage"><ProfileIconComponent /></Link>) // 로그인되지 않은 경우
        }

        {/* <ProfileIconComponent onClick={()=>{
          let loginInfo = getLoginInfo();
          if(!loginInfo){            
            navigate('/LoginFormPage');
          }else{
            navigate('/personal/EditProfilePage');
          }
        }} /> */}

        {/* 마일리지 및 포인트 표시 */}
        <Container>
          <MileageIcon><BsCoin /></MileageIcon>
          <PointsDisplay>1,000 <span style={{ fontSize: '10px' }}></span></PointsDisplay>
        </Container>
      </StyledUserActions>

      {/* 알림 모달 */}
      <NotificationModal
        notificationModalStatus={notificationModalStatus}
        notificationModalClose={notificationModalClose}
        notificationCountHandler={notificationCountHandler}
      />
    </>
  );
};

export default UserActions;

/* 스타일 컴포넌트들 */

// 사용자 액션을 담는 컨테이너 스타일
const StyledUserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

// 알림 아이콘 스타일
const NotificationIcon = styled.div`
  position: relative; // position을 relative로 설정하여 알림 카운트 위치 조정
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
  font-size: 34px; // 아이콘 크기

  &:hover {
    color: #FFB74D;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 색상과 그림자 효과
  }
`;

// 알림 카운트 스타일
const NotificationCount = styled.span`
  width: 18px; // 카운트의 너비
  text-align: center;
  position: absolute;
  top: -3px; // 위치 조정 (상단)
  right: -6px; // 위치 조정 (오른쪽)
  background-color: red; // 배경색 (빨간색)
  color: white; // 글자색 (흰색)
  border-radius: 20px; // 동그란 모양
  padding: 1px; // 패딩
  font-size: 12px; // 폰트 크기
  font-weight: bold; // 폰트 두께
`;

// 캘린더 아이콘 스타일
const CalendarIcon = styled.div`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
  font-size: 28px; // 아이콘 크기

  &:hover {
    color: #FFB74D; // 호버 시 텍스트 색상 변경
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 그림자 변경
  }
`;

// 마일리지 아이콘 스타일
const MileageIcon = styled.div`
  width: 24px; // 아이콘 너비
  font-size: 20px; // 아이콘 크기
  cursor: pointer; // 클릭 가능
  color: orange; // 아이콘 색상 (주황색)
  margin-left: 3px; // 왼쪽 여백
  margin-bottom: 1px; // 아래쪽 여백
`;

// 포인트 표시 스타일
const PointsDisplay = styled.div`
  text-align: center; // 텍스트 중앙 정렬
  letter-spacing: -1px; // 글자 간격 좁히기
  margin-right: 5px; // 오른쪽 여백
  font-size: 18px; // 폰트 크기
  font-weight: 600; // 폰트 두께
  text-align: right; // 텍스트 오른쪽 정렬

  @media (max-width: 991px) {
    white-space: initial; // 작은 화면에서 줄 바꿈 허용
  }
`;

// 프로필 아이콘 스타일(공통)
const StyledCgProfileBase = styled(CgProfile)`
  width: 32px; // 아이콘 너비
  height: 32px; // 아이콘 높이

  &:hover {
    color: #FFB74D; // 호버 시 텍스트 색상 변경
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 그림자 변경
  }
`;

// 프로필 아이콘 스타일(윈도우)
const StyledCgProfile = styled(StyledCgProfileBase)`
  margin-top: 10px; // 아이콘을 2px 아래로 이동


`;

// 프로필 아이콘 스타일(mac)
const StyledCgProfileMac = styled(StyledCgProfileBase)`
  margin-top: 2px; // 아이콘을 2px 아래로 이동
`;


// 마일리지 및 포인트를 담는 컨테이너 스타일
const Container = styled.div`
  display: flex; // Flexbox 사용
  align-items: center; // 수직 중앙 정렬
  border: 2px solid black; // 테두리
  border-radius: 15px; // 둥근 모서리
  padding: 4px; // 패딩
  justify-content: space-between; // 요소 간격 조정
  width: 100%; // 컨테이너 너비
  border-color: #555555; // 테두리 색상
`;
