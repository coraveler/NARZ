import React from 'react';
import styles from '../../css/Comment.module.css';
import ProfileInfo from '../common/ProfileInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import api from '../../api/axios';
import { RiDeleteBinLine } from "react-icons/ri";

const Comment = ({comment, deleteComment}) => {

  let loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;

  const handleDeleteComment = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
 
    if(isConfirmed){
        try {   
            const response = await api.delete(`comment/delete/${comment.commentId}`);
            console.log("debug >>> response imgUrls >>>>>>>>>>>>>>>> ", response.data);
            deleteComment(comment.commentId); 
        } catch (err) {
            console.log(err);
        }
    }
}

  return (
    <section className={styles.commentSection}>
      <div className={styles.commentContent}>
        <div className={styles.commentorInfo}>
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3da876fdd7338a4f3e47dacb3a58a42b14a6c04e402bf02a388890d8580c2363?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
            className={styles.commentorAvatar}
            alt="Commentor's avatar"
            />
            <span className={styles.commentorName}>vname</span> */}
          <ProfileInfo userId={comment.userId}/>
            {
              userId == comment.userId && <button className={'btn btn-outline-danger'} style={{marginLeft:'auto'}} onClick={handleDeleteComment}>삭제<RiDeleteBinLine style={{marginBottom:'3px'}}/></button>
            }
          
        </div>
        <p className={styles.commentText}>{comment.comment}</p>
        <div className={styles.commentDateWrapper}>
          <time className={styles.commentDate} >
            {comment.createdDate}
          </time>
        </div>
      </div>
    </section>
  );
};

export default Comment;
