import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import api from '../../api/axios';

const BookMark = ({postId, userId, style}) => {
    const [bookMarkState, setBookMarkState] = useState(false);

    useEffect(() => {
        // 예: API 호출하여 postId에 해당하는 포스트 데이터 가져오기
        checkBookMark(postId,userId);
    }, [postId]);

    const saveBookMark = async () => {
        const data = {
            postId: postId,
            userId: userId,
        };
        try {
            const response = await api.post(`post/bookmark/save`,data);
            console.log("debug >>> response saveLike >>>>>>>>>>>>>>>> ", response.data);
            setBookMarkState(!bookMarkState);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteBookMark = async () => {
        try {
            const response = await api.delete(`post/bookmark/delete`, {
                params: {
                    postId: postId,
                    userId: userId,
                }
            });
            console.log("debug >>> response deleteLike >>>>>>>>>>>>>>>> ", response.data);
            setBookMarkState(!bookMarkState);
        } catch (err) {
            console.log(err);
        }
    }

    const clickBookMark = (e) =>{
        e.stopPropagation()
        if(bookMarkState){
            deleteBookMark();
        }else{
            saveBookMark();
        }
    }

    const checkBookMark = async (postId,userId) => {
        try {
            const response = await api.get(`post/bookmark/check`,{
                params: {
                    postId: postId,
                    userId: userId,
                }
            });
            console.log("debug >>> response checkLike >>>>>>>>>>>>>>>> ", response.data);
            setBookMarkState(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div onClick={clickBookMark} style={{ cursor: 'pointer', marginLeft: style[0], marginRight: style[1]}} >
            {
                bookMarkState ? (
                    <div> <FaBookmark /></div>
                ) : (<div><FaRegBookmark /></div>)
            }
        </div>
    );
}

export default BookMark;