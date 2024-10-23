import React from 'react';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import styles from '../../css/Follow/FollowerPage.module.css';
import FollowerItem from '../../Includes/followItem/FollowerItem';
import PaginationComponent from '../../Includes/common/PaginationComponent';
const FollowerPage = ({ selectedBadge }) => {
  const followers = [
    { id: 1, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abd9dc34f494c6b4ba85664a08ee2e4f8a9cc7150df9650fab2a1ac6fff1ca0e?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
    { id: 2, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abd9dc34f494c6b4ba85664a08ee2e4f8a9cc7150df9650fab2a1ac6fff1ca0e?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
    { id: 3, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abd9dc34f494c6b4ba85664a08ee2e4f8a9cc7150df9650fab2a1ac6fff1ca0e?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
    { id: 4, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abd9dc34f494c6b4ba85664a08ee2e4f8a9cc7150df9650fab2a1ac6fff1ca0e?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
    { id: 5, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abd9dc34f494c6b4ba85664a08ee2e4f8a9cc7150df9650fab2a1ac6fff1ca0e?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
  ];

  return (
    <main className={styles.followerPage}>
        <ProfileCard selectedBadge={selectedBadge} />
      {followers.map((follower) => (
        <FollowerItem key={follower.id} name={follower.name} imageUrl={follower.imageUrl} />
      ))}
      <PaginationComponent />
    </main>
  );
};

export default FollowerPage;

