import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
// import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentList from '../Includes/comment/CommentList';
import BookMark from '../Includes/common/BookMark';
import { getLoginInfo } from "../Includes/common/CommonUtil";
import FollowButton from '../Includes/common/FollowButton';
import LikeIcon from '../Includes/common/LikeIcon';
import ProfileInfo from '../Includes/common/ProfileInfo';
import api from '../api/axios';
import styles from '../css/PostPage.module.css';

const PostPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [postImgUrl, setPostImgUrl] = useState([]);
    const [error, setError] = useState(null);
    // const [bookMarkState, setBookMarkState] = useState(false);
    // const [likeState, setLikeState] = useState(false);
    // const [likeCount, setLikeCount] = useState(false);
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    const location = useLocation();
    const trimmedUrl = location.state?.trimmedUrl || "/board/localboard/all";

    const localMapping = {
        "sudo": "수도권",
        "gangwon": "강원",
        "chungbuk": "충북",
        "chungnam": "충남",
        "daejeon": "대전",
        "gyeonbuk": "경북",
        "gyeongnam": "경남",
        "jeonbuk": "전북",
        "jeonnam": "전남",
        "jeju": "제주"

    };

    useEffect(() => {
        // 예: API 호출하여 postId에 해당하는 포스트 데이터 가져오기
        getPost(postId);
        getPostImages(postId);

    }, []);

    // useEffect(() => {
    //     countLike(postId);
    // }, [likeState]);

    const getPost = async (postId) => {
        try {
            const response = await api.get(`post/view/${postId}`);
            console.log("debug >>> response, ", response.data);
            const postData = response.data;
            // post.local 값을 변환
            if (postData.local && localMapping[postData.local]) {
                postData.local = localMapping[postData.local];
            }
            setPost(postData);
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

    const postDelete = async () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            try {
                console.log(postId);
                const response = await api.delete(`post/delete/${postId}`);
                console.log("debug >>> response imgUrls >>>>>>>>>>>>>>>> ", response.data);
                navigate(trimmedUrl);
                alert("삭제 되었습니다.");
            } catch (err) {
                console.log(err);
            }
        }
    }
    const renderContent = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return (
        <div className={styles.full}>
            <br/>
            <section className={styles.profileContainer}>
                <br/>
                <h1 className={styles.profileTitle}> {post.local} </h1>
                <h1 className={styles.subTitle}>{post.title}  </h1> 
                <br />
                <div className={styles.profileInfo}>
                    <ProfileInfo userId={post.userId} />
                    <time className={styles.profileDate}>{post.createdDate}</time>

                    <div className={styles.buttonDiv}>
                        {
                            userId == post.userId ?
                                <div>

                                    <button className="btn btn-outline-warning"
                                        onClick={() => navigate(`/TravelEditPage`, {
                                            state: {
                                                post: post,
                                                postImgUrl: postImgUrl
                                            }
                                        })}>
                                        {/* 수정하기 */}
                                         <MdModeEdit />
                                    </button>

                                    <button className="btn btn-outline-danger"
                                        style={{ marginLeft: "5px" }}
                                        onClick={postDelete}>
                                        {/* 삭제 */}
                                        <RiDeleteBinLine />
                                    </button>
                                </div> : userId!=null &&
                                <div>
                                <FollowButton followedId={post.userId}/>
                                </div>
                        }
                    </div>
                </div><br />
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
                                            <img style={{ width: "500px", height: "350px" }} src={img.imagePath} alt={`Slide ${index + 1}`} />
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </section>
                    <section className={styles.ratingSection} >
                        <div className={styles.ratingBar}>

                            {/* <div onClick={clickLike} style={{ cursor: 'pointer' }}>
                                    {
                                    likeState ? (
                                       <div> <AiFillLike />&nbsp; {likeCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                     ) : (<div><AiOutlineLike />&nbsp; {likeCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>)
                                }
                                </div> */}

                            <LikeIcon postId={postId} userId={userId} />
                            <FaStar style={{ color: "#FFD700", marginRight:'3px' }} /> {post.rating}

                            {/* <div onClick={clickBookMark} style={{ cursor: 'pointer', marginLeft:'350px'}}>
                                    {
                                    bookMarkState ? (
                                       <div> <FaBookmark /></div>
                                     ) : (<div><FaRegBookmark /></div>)
                                }
                                </div> */}
                            <div>
                                <BookMark userId={userId} postId={postId} style={["350px"]} />
                            </div>


                        </div>
                    </section>
                    <div align="center">
                    </div>
                    <section className={styles.contentSection}>
                        <div className={styles.textContainer}>
                            {post.content && renderContent(post.content)}
                        </div>
                    </section>
                </main>

                {/* <hr style={{ width: "850px" }} /> */}
                {/* <Comment postId={postId}/>  반복 */}



            </div>
            <br/>
            <CommentList postId={postId} userId={userId} />
            <br/>
        </div>
    );
};

export default PostPage;

