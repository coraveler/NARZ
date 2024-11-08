import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/axios';
import { getLoginInfo } from "../../Includes/common/CommonUtil";

const CommentList = ({ postId, userId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    let loginInfo = getLoginInfo();
    const loginState = loginInfo?.userId || null;

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const saveComment = async () => {
        const data = {
            postId: postId,
            userId: userId,
            comment: comment
        }
        try {
            const response = await api.post(`comment/save`, data);
            setComment('');
            getComment();
        } catch (err) {
            console.log(err);
        }
    }

    const getComment = async () => {
        try {
            const response = await api.get(`comment/get/${postId}`);
            setComments(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getComment();
    }, [])

    const deleteComment = (commentId) => {
        setComments(comments.filter(comment => comment.commentId !== commentId));
    }

    return (
        <div>
            {/* Inline style with @font-face */}
            <style>
                {`
                    @font-face {
                        font-family: 'RixXladywatermelonR';
                        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-4@1.0/RixXladywatermelonR.woff2') format('woff2');
                        font-weight: normal;
                        font-style: normal;
                    }
                    .comment-section {
                        font-family: 'RixXladywatermelonR', sans-serif;
                    }
                `}
            </style>
            
            <div className="comment-section">
                {
                    comments.map((item, index) => (
                        <div key={index}>
                            <Comment comment={item} deleteComment={deleteComment} />
                            <hr style={{ color: "gray" }} />
                        </div>
                    ))
                }
                {
                    loginState &&
                    <div style={{ width: '600px', margin: '0px auto' }}>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={handleComment} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button className="btn btn-outline-warning" onClick={saveComment}>등록</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CommentList;