import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/axios';

const CommentList = ({postId, userId}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleComment = (e) => {
        setComment(e.target.value);
        // console.log(e.target.value);
    }

    const saveComment = async() => {
        const data = {
            postId : postId,
            userId : userId,
            comment : comment
        }
        try {
            const response = await api.post(`comment/save`,data);
            console.log("debug >>> response, ", response.data);
            setComment('');
            getComment();
        } catch (err) {
            console.log(err);
        }
    }

    const getComment = async() => {
        try {
            const response = await api.get(`comment/get/${postId}`);
            console.log("debug >>> response, ", response.data);
            setComments(response.data);
        } catch (err) {
            console.log(err);
        }
     }

     useEffect(() => {
        getComment();
     },[])

    return (
        <div>
            {
                comments.map((item, index) => (
                    <div>
                        <Comment key={index} comment={item}/>
                        <hr style={{color:"gray"}}/>
                    </div>
                ))
            }
           
            <div>
                {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={handleComment}/>
                <button className="btn btn-outline-warning" onClick={saveComment} >등록</button>
            </div>
        </div>
    );
};

export default CommentList;
