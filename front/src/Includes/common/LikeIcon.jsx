import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import api from '../../api/axios';

const LikeIcon = ({postId, userId}) => {
    const [likeState, setLikeState] = useState(false);
    const [likeCount, setLikeCount] = useState(false);

    useEffect(() => {
        // 예: API 호출하여 postId에 해당하는 포스트 데이터 가져오기
        if(userId){
            checkLike(postId,userId);
        }
        countLike(postId);
        // checkBookMark(postId,userId);
    }, [postId]);

    useEffect(() => {
        if(userId){
            countLike(postId);
        }
    }, [likeState]);


    const saveLike = async () => {
        const data = {
            postId: postId,
            userId: userId,
        };
        try {
            const response = await api.post(`post/like/save`,data);
            console.log("debug >>> response saveLike >>>>>>>>>>>>>>>> ", response.data);
            setLikeState(!likeState);
        } catch (err) {
            alert("로그인 후 이용 가능합니다!");
            console.log(err);
        }
    }

    const deleteLike = async () => {
        try {
            const response = await api.delete(`post/like/delete`, {
                params: {
                    postId: postId,
                    userId: userId,
                }
            });
            console.log("debug >>> response deleteLike >>>>>>>>>>>>>>>> ", response.data);
            setLikeState(!likeState);
        } catch (err) {
            console.log(err);
        }
    }

    const clickLike =  (e) => {
        e.stopPropagation()
        if(likeState){
            deleteLike();
        }else{
            saveLike();
        }
    }

    const checkLike = async (postId,userId) => {
        try {
            const response = await api.get(`post/like/check`,{
                params: {
                    postId: postId,
                    userId: userId,
                }
            });
            console.log("debug >>> response checkLike >>>>>>>>>>>>>>>> ", response.data);
            setLikeState(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const countLike = async (postId) => {
        try {
            const response = await api.get(`post/like/count/${postId}`);
            console.log("debug >>> response countLike >>>>>>>>>>>>>>>> ", response.data);
            setLikeCount(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div style={{}} >
            {
                likeState ? (
                    <div> <AiFillLike style={{marginBottom: '3px', cursor: 'pointer', textShadow:'0px 0px 20px rgba(0, 0, 0, 1)'}}onClick={clickLike}/>&nbsp;{likeCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                ) : (<div><AiOutlineLike style={{marginBottom: '3px', cursor: 'pointer'}}onClick={clickLike}/>&nbsp;{likeCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)
            }
        </div>
    );
}

export default LikeIcon;