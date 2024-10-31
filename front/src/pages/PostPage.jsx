import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
// import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import styles from '../css/PostPage.module.css';
import Comment from '../Includes/comment/Comment';
import ProfileInfo from '../Includes/common/ProfileInfo';
import BookMark from '../Includes/common/BookMark';
import LikeIcon from '../Includes/common/LikeIcon';
import { getLoginInfo } from "../Includes/common/CommonUtil";

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [postImgUrl, setPostImgUrl] = useState([]);
    const [error, setError] = useState(null);
    // const [bookMarkState, setBookMarkState] = useState(false);
    // const [likeState, setLikeState] = useState(false);
    // const [likeCount, setLikeCount] = useState(false);
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;

    useEffect(() => {
        // 예: API 호출하여 postId에 해당하는 포스트 데이터 가져오기
        getPost(postId);
        getPostImages(postId);
        // checkLike(postId,userId);
        // countLike(postId);
        // checkBookMark(postId,userId);
    }, [postId]);

    // useEffect(() => {
    //     countLike(postId);
    // }, [likeState]);

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

    return (
        <div>
            <section className={styles.profileContainer}>
            <br/>
                <h1 className={styles.profileTitle}>{post.title}</h1>
                <br/> <br/>
                <div className={styles.profileInfo}>
                    <ProfileInfo data={post} />
                    <time className={styles.profileDate}>{post.createdDate}</time>
                    <button className={styles.followButton} aria-label="Follow">
                        + 팔로우
                    </button>
                </div><br/>
            </section>
           
            <div align="center">
                <main className={styles.container}>
                    <section className={styles.productWrapper}>
                    {/* <hr style={{ width: "70%" }} /> */}
                        {error ? (
                            <div>{error}</div>
                        ) : (
                            <Carousel interval={null}>
                                {postImgUrl.length > 0 && postImgUrl.map((img, index) => (
                                    <Carousel.Item key={index}>
                                        <div className='slidercontents'>
                                            <img style={{ width: "600px", height: "400px" }} src={img.imagePath} alt={`Slide ${index + 1}`} />
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </section>
                    <section className={styles.ratingSection}>
                            <div className={styles.ratingBar}>
                               
                                {/* <div onClick={clickLike} style={{ cursor: 'pointer' }}>
                                    {
                                    likeState ? (
                                       <div> <AiFillLike />&nbsp; {likeCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                     ) : (<div><AiOutlineLike />&nbsp; {likeCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>)
                                }
                                </div> */}
                                
                                <LikeIcon postId={postId} userId={userId}/>
                                <FaStar style={{color: "#FFD700"}}/>  &nbsp;{post.rating}
                              
                                {/* <div onClick={clickBookMark} style={{ cursor: 'pointer', marginLeft:'350px'}}>
                                    {
                                    bookMarkState ? (
                                       <div> <FaBookmark /></div>
                                     ) : (<div><FaRegBookmark /></div>)
                                }
                                </div> */}
                                <div>
                                    <BookMark userId={userId} postId={postId} style={["350px"]}/>
                                </div>
                                
                                
                            </div>
                    </section>
                    <div align="center">
                    </div>
                    <section className={styles.contentSection}>
                        <div className={styles.textContainer}>
                            {post.content}
                        </div>
                    </section>
                </main>

                {/* <hr style={{ width: "850px" }} /> */}
                <Comment />  {/* 반복 */}


            </div>
        </div>
    );
};

export default PostPage;

