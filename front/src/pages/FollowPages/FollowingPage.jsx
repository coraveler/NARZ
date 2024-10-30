import React from 'react';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import styles from '../../css/Follow/FollowerPage.module.css';
import FollowerCard from '../../Includes/followItem/FollowerCard';

const FollowerPage = ({ selectedBadge }) => {
    const followers = [
      { id: 1, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acaf3eb4b850e2d2b050a77263677609032c6be95e3a8753fcbccac8f22349af?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
      { id: 2, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acaf3eb4b850e2d2b050a77263677609032c6be95e3a8753fcbccac8f22349af?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
      { id: 3, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acaf3eb4b850e2d2b050a77263677609032c6be95e3a8753fcbccac8f22349af?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
      { id: 4, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acaf3eb4b850e2d2b050a77263677609032c6be95e3a8753fcbccac8f22349af?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
      { id: 5, name: 'name', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acaf3eb4b850e2d2b050a77263677609032c6be95e3a8753fcbccac8f22349af?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6' },
    ];
  
    return (
        <main >
            <ProfileCard selectedBadge={selectedBadge} />
          {followers.map((follower) => (
            <FollowerCard key={follower.id} name={follower.name} imageUrl={follower.imageUrl} />
          ))}
        </main>
      );
    
  };
  
  export default FollowerPage;
