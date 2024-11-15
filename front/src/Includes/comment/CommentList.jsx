import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BiMessageEdit } from 'react-icons/bi';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import api from '../../api/axios';
import Comment from './Comment';

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
                <hr/>
                {
                    loginState &&
                    <div style={{ width: '90%', margin: '40px auto', display:'flex', marginBottom:'40px' }}>
                        <textarea 
                            placeholder='댓글을 입력해 주세요'
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3" value={comment} 
                            onChange={handleComment} 
                            style={{height:'35px'}}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft:'5px' }}>
                            <button className="btn btn-outline-warning" onClick={saveComment} style={{width:'45px'}}><BiMessageEdit/></button>
                        </div>
                    </div>
                }
                {
                    comments.map((item, index) => (
                        <div key={index} style={{padding:'0px 0px', display:'flex', flexDirection:'column', alignItems:'center' }}>
                            <Comment comment={item} deleteComment={deleteComment} /><p/>
                            {/* <hr style={{ color: "gray" }} /> */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CommentList;