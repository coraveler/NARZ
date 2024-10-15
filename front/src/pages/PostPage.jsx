import React from 'react';
import styles from '../css/PostPage.module.css';
import ProfileInfo from '../Includes/common/ProfileInfo';

const PostPage = () => {
  return (
    <section className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Title</h1>
      <div className={styles.profileInfo}>
        <ProfileInfo />
        <time className={styles.profileDate}>2024.10.11</time>
        <button className={styles.followButton} aria-label="Follow">
          + 팔로우
        </button>
      </div>
    </section>
  );
};

export default PostPage;