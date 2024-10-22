import React, { useState, useEffect } from 'react';
import styles from '../css/PostPage.module.css';
import ProfileInfo from '../Includes/common/ProfileInfo';
import Comment from '../Includes/comment/Comment';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [postImgUrl, setPostImgUrl] = useState([]);

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
            console.log(err);
        }
    };

    const getPostImages = async (psotId) => {
        try {
            const response = await api.get(`post/view/images/${postId}`);
            console.log("debug >>> response imgUrls >>>>>>>>>>>>>>>> ", response.data);
            setPostImgUrl(response.data);
            // console.log("debug >>> response, ", response.data.comments);
            // setComments(response.data.comments);
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
                        {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/24910718777b542f7ef16fba09ae33c14a591dbd32af92b4c40c8f9a004c54b5?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.ratingIcon} alt="" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/763c2adfc1e60cef4d55fd1aa38ea204b0495acfb56a7000fa4043bfd35c059c?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.productImage} alt="Product display" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9578e85bd6ab614ca5d75da456338ed48b65ecab1d9b85a0ce643ba390c2bff2?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" className={styles.ratingIcon} alt="" /> */}
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="..." className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="..." className="d-block w-100" alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-targetclassname="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
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

