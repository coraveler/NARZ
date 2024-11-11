import React, { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 임포트
import styled from "styled-components";
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import NotificationModal from "../../Includes/nofification/NotificationModal";
import axios from "axios";

// UserActions 컴포넌트
const UserActions = ({ isLoggedIn }) => {
  const [totalMileage, setTotalMileage] = useState(null); // 상태 선언: totalMileage와 setTotalMileage 추가
  const isMac = () => navigator.platform.toLowerCase().includes("mac");
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const [notificationModalStatus, setNotificationModalStatus] = useState(false); // 알림 모달 상태 관리
  const [newNotificationStatus, setNewNotificationStatus] = useState(false); // 새로운 알림 상태
  const ProfileIconComponent = isMac() ? StyledCgProfileMac : StyledCgProfile; //Mac인 경우와 아닌 경우의 프로필 아이콘 컴포넌트 설정

  // 포인트 조회 기능
  useEffect(() => {
    const fetchMileage = async () => {
      try {
        // 로컬 스토리지에서 직접 로그인 정보 확인
        const loginInfoStr = localStorage.getItem("loginInfo");
        console.log("로그인 정보:", loginInfoStr); // 로그인 정보 출력

        if (!loginInfoStr) {
          console.error("로그인 정보가 없습니다.");
          return;
        }

        const loginInfo = JSON.parse(loginInfoStr);
        const userId = loginInfo.data.userId;
        console.log("현재 userId:", userId); // userId 출력

        // API 호출 전 URL 로그
        const url = `http://localhost:7777/api/mileage/total/${userId}`;
        console.log("API URL:", url);

        const response = await axios.get(url);
        console.log("API 응답 전체:", response); // 전체 응답 객체 출력
        console.log("API 응답 데이터:", response.data); // 응답 데이터만 출력

        // 응답 구조 체크
        if (
          response.data &&
          (typeof response.data.totalMileage === "number" ||
            typeof response.data === "number")
        ) {
          const mileage =
            typeof response.data.totalMileage === "number"
              ? response.data.totalMileage
              : response.data;
          console.log("설정할 마일리지 값:", mileage); // 설정할 마일리지 값 출력
          setTotalMileage(mileage);
        } else {
          console.error("예상치 못한 응답 구조:", response.data);
          setTotalMileage(0);
        }
      } catch (error) {
        console.error("마일리지 조회 중 오류 발생:", error);
        console.error("오류 상세:", error.response); // 오류 응답 상세 출력
        setTotalMileage(0);
      }
    };

    fetchMileage();
  }, []);

  // 새로운 알림 상태 확인
  useEffect(() => {
    if (localStorage.getItem("loginInfo")) {
      const item = localStorage.getItem("loginInfo");
      const parseItem = JSON.parse(item);
      const userId = parseItem.data.userId;
      setTimeout(() => {
        if (
          localStorage.getItem(`todayNotificationMsg-${userId}`) ==
          `${new Date().toDateString()}-notificationMsg-new`
        ) {
          setNewNotificationStatus(true);
          localStorage.setItem(
            `todayNotificationMsg-${userId}`,
            `${new Date().toDateString()}-notificationMsg`
          );
        }
      }, 100);
    } else {
      setNewNotificationStatus(false);
    }
  }, [localStorage.getItem("loginInfo")]);

  // 알림 아이콘 실행 함수
  const notificationHandler = () => {
    setNotificationModalStatus(true);
    setNewNotificationStatus(false);
  };

  return (
    <>
      <StyledUserActions>
        {/* 알림 아이콘 */}
        <NotificationIcon onClick={() => notificationHandler()}>
          <MdNotificationsNone />
          {newNotificationStatus ? <NotificationCount /> : ""}
        </NotificationIcon>

        {/* 캘린더 아이콘 클릭 시 캘린더 페이지로 이동 */}
        <CalendarIcon onClick={() => navigate("/calendar")}>
          <FaRegCalendarAlt />
        </CalendarIcon>

        {/* 로그인 상태에 따라 프로필 아이콘 처리 */}
        {localStorage.getItem("loginInfo") ? (
          <Link to="/personal/EditProfilePage">
            <ProfileIconComponent />
          </Link>
        ) : (
          <Link to="/LoginFormPage">
            <ProfileIconComponent />
          </Link>
        )}

        {/* 포인트 표시 */}
        <Container>
          <MileageIcon>
            <BsCoin />
          </MileageIcon>
          <PointsDisplay>
            {totalMileage !== null ? (
              <>
                {totalMileage} <span style={{ fontSize: "10px" }}>Points</span>
              </>
            ) : (
              "로딩 중..."
            )}
          </PointsDisplay>
        </Container>
      </StyledUserActions>

      {/* 알림 모달 */}
      <NotificationModal
        notificationModalStatus={notificationModalStatus}
        notificationModalClose={() => setNotificationModalStatus(false)}
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
    color: #ffb74d;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 색상과 그림자 효과
  }
`;

// 알림 카운트 스타일
const NotificationCount = styled.span`
  width: 10px; // 카운트의 너비
  height: 10px;
  position: absolute;
  top: 1px; // 위치 조정 (상단)
  right: 1px; // 위치 조정 (오른쪽)
  background-color: red; // 배경색 (빨간색)
  border-radius: 20px; // 동그란 모양
`;

// 캘린더 아이콘 스타일
const CalendarIcon = styled.div`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  cursor: pointer;
  font-size: 28px; // 아이콘 크기

  &:hover {
    color: #ffb74d; // 호버 시 텍스트 색상 변경
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
    color: #ffb74d; // 호버 시 텍스트 색상 변경
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
