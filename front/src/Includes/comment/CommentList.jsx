import React, { useState } from 'react';
import Comment from './Comment';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentList = ({postId, userId}) => {
    const [comment, setComment] = useState("");

    const handleComment = (e) => {
        setComment(e.target.value);
        // console.log(e.target.value);
    }

    const saveComment = async() => {
        
    }

    return (
        <div>
            <Comment />
            <div className="mb-10">
                {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={handleComment}/>
                <button className="btn btn-outline-warning" onClick={saveComment} >등록</button>
            </div>
        </div>
    );
};

export default CommentList;
