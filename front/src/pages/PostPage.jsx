import React from 'react';
import styles from '../css/PostPage.module.css';
import ProfileInfo from '../Includes/common/ProfileInfo';
import Comment from '../Includes/comment/Comment';

const PostPage = () => {

    const ratingData = [
        { value: "4", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e91fe4f3a4f56cdc5fc54db998c538f9362000f784027666b4b507c1f5973f2c?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" },
        { value: "0", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/270b91b2e83038ec274020a4084db1f86ce234eee192a19e5972cddb17552c7b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" },
        { value: "4.2", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/73cf0630fb304bdb392aaa0b9a8b8823acb4fbba4064fc1c771502730ed6c915?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" }
    ];

    return (
        <div>
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
            <hr style={{width:"70%"}}/>
            <div align="center">
            <main className={styles.container}>
                <section className={styles.productWrapper}>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/24910718777b542f7ef16fba09ae33c14a591dbd32af92b4c40c8f9a004c54b5?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.ratingIcon} alt="" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/763c2adfc1e60cef4d55fd1aa38ea204b0495acfb56a7000fa4043bfd35c059c?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.productImage} alt="Product display" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9578e85bd6ab614ca5d75da456338ed48b65ecab1d9b85a0ce643ba390c2bff2?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.ratingIcon} alt="" />
                </section>
                <section className={styles.ratingSection}>
                    <div className={styles.ratingWrapper}>
                        <div className={styles.ratingBar}>
                            {ratingData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <img loading="lazy" src={item.icon} className={styles.ratingIcon} alt={`Rating icon ${index + 1}`} />
                                    <div className={styles.ratingValue}>{item.value}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </React.Fragment>
                            ))}
                        </div>
                        
                    </div>
                </section>
                <hr style={{width:"70%"}}/>
                <section className={styles.contentSection}>내용</section>
            </main>
            
            <hr style={{width:"70%"}}/><Comment/>  {/* 반복 */}
            
            
            </div>
        </div>
    );
};

export default PostPage;

