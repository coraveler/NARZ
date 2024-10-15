import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = () => {
  const leaderboardData = [
    { rank: 1, name: 'name1', level: 'Lv.298', score: '569,455,421,386,483', views: '28,808', likes: '루나' },
    { rank: 2, name: 'name2', level: 'Lv.297', score: '763,361,194,209,058', views: '395', likes: 'BOSS' },
    { rank: 3, name: 'name3', level: 'Lv.297', score: '502,137,803,481,282', views: '3,355', likes: '봄연' },
    { rank: 4, name: 'name4', level: 'Lv.297', score: '475,336,682,295,077', views: '1,123', likes: '프라하' },
    { rank: 5, name: 'name5', level: 'Lv.297', score: '450,140,603,397,805', views: '1,493', likes: '생글' },
    { rank: 6, name: 'name6', level: 'Lv.297', score: '191,838,050,474,764', views: '56,180', likes: '달치즈' },
    { rank: 7, name: 'name7', level: 'Lv.296', score: '716,006,572,849,719', views: '227', likes: '송이' },
    { rank: 8, name: 'name8', level: 'Lv.296', score: '660,936,772,292,099', views: '53,430', likes: 'Cross' },
    { rank: 9, name: 'name9', level: 'Lv.296', score: '460,538,811,739,267', views: '32,160', likes: '악마' },
    { rank: 10, name: 'name10', level: 'Lv.296', score: '273,120,603,975,035', views: '16,550', likes: 'Frozen' },
  ];

  return (
    <LeaderboardWrapper>
      <LeaderboardContainer>
        <LeaderboardHeader />
        {leaderboardData.map((data, index) => (
          <LeaderboardRow key={index} {...data} />
        ))}
      </LeaderboardContainer>
    </LeaderboardWrapper>
  );
};

const LeaderboardWrapper = styled.section`
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0 92px;
  overflow: hidden;
`;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // 너비를 100%로 조정
  max-width: 1200px; // 최대 너비 설정
`;

export default LeaderboardTable;
