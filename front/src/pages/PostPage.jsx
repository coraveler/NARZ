import React, { useState, useEffect } from 'react';
import styles from '../css/PostPage.module.css';
import ProfileInfo from '../Includes/common/ProfileInfo';
import Comment from '../Includes/comment/Comment';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [postImgUrl, setPostImgUrl] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 예: API 호출하여 postId에 해당하는 포스트 데이터 가져오기
        getPost(postId);
        getPostImages(postId);
    }, [postId]);

    const getPost = async (postId) => {
        try {
            const response = await api.get(`post/view/${postId}`);
            console.log("debug >>> response, ", response.data);
            setPost(response.data);
            // console.log("debug >>> response, ", response.data.comments);
            // setComments(response.data.comments);
        } catch (err) {
            setError('Failed to load images');
            console.log(err);
        }
    };

    const getPostImages = async (postId) => {
        try {
            const response = await api.get(`post/view/images/${postId}`);
            console.log("debug >>> response imgUrls >>>>>>>>>>>>>>>> ", response.data);
            setPostImgUrl(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    const ratingData = [
        { value: "4", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e91fe4f3a4f56cdc5fc54db998c538f9362000f784027666b4b507c1f5973f2c?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" },
        // { value: "0", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/270b91b2e83038ec274020a4084db1f86ce234eee192a19e5972cddb17552c7b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" },
        { value: post.rating, icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/73cf0630fb304bdb392aaa0b9a8b8823acb4fbba4064fc1c771502730ed6c915?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" }
    ];

    return (
        <div>
            <section className={styles.profileContainer}>
                <h1 className={styles.profileTitle}>{post.title}</h1>
                <div className={styles.profileInfo}>
                    <ProfileInfo data={post} />
                    <time className={styles.profileDate}>{post.createdDate}</time>
                    <button className={styles.followButton} aria-label="Follow">
                        + 팔로우
                    </button>
                </div>
            </section>
            <hr style={{ width: "70%" }} />
            <div align="center">
                <main className={styles.container}>
                    <section className={styles.productWrapper}>
                    {error ? (<div>{error}</div>):(
                        <Carousel>
                            <Carousel.Item>
                                <div className='slidercontents'>
                                <img src={postImgUrl[0].imagePath} class="d-block w-100" alt="..."/>
                                </div>
                            </Carousel.Item>
                            
                        </Carousel>
                       ) }
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
                    <hr style={{ width: "70%" }} />
                    <section className={styles.contentSection}>{post.content}</section>
                </main>

                <hr style={{ width: "70%" }} /><Comment />  {/* 반복 */}


            </div>
        </div>
    );
};

export default PostPage;

