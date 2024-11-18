import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import PaginationComponent from '../../Includes/common/PaginationComponent';
import FollowerItem from '../../Includes/followItem/FollowerItem';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import api from '../../api/axios';



const FollowingPage = ({ selectedBadge }) => {
  const { urlUserId } = useParams(); // URL에서 userId 추출
  let loginInfo = getLoginInfo();
  const loginUserId = loginInfo?.userId || null;
  const [followings, setFollowings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수

  const getFolloweings = async () => {
    try {
      const userId = urlUserId != null ? urlUserId : loginUserId;
      const response = await api.get(`follow/getFollowings/${userId}`);
      console.log(response.data);
      const followersData = response.data;
        const loginUserIndex = followersData.indexOf(loginUserId);

        if (loginUserIndex !== -1) {
            // loginUserId가 배열에 존재하면 해당 값을 배열의 0번째로 이동
            const loginUser = followersData.splice(loginUserIndex, 1)[0]; // 해당 값을 제거하고 저장
            followersData.unshift(loginUser); // 0번째 위치에 추가
        }
      setFollowings(followersData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFolloweings();
  }, []);

  // 총 페이지 수 계산
  const totalCount = followings.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 표시할 항목 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFollowings = followings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div>
        <ProfileCard selectedBadge={selectedBadge} userId={urlUserId != null ? urlUserId : loginUserId} />
      </div>
      <div><p/>
        {currentFollowings.length > 0 &&
          currentFollowings.map((following, index) => (
            <FollowerItem key={index} userId={following} />
          ))}
      </div>
      <div>
        {totalPages > 1 && ( // 총 페이지 수가 1보다 클 때만 페이지네이션 표시
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div><p/>
    </div>
  );
};

export default FollowingPage;
