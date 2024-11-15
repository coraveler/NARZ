import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import api from '../../api/axios';
import styles from '../../css/Comment.module.css';
import ProfileInfo from '../common/ProfileInfo';

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
const renderContent = (text) => {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

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
          <ProfileInfo userId={comment.userId} fontSize={17}/>
            {
              userId == comment.userId && <button className={'btn btn-outline-danger'} style={{marginLeft:'auto'}} onClick={handleDeleteComment}>
                {/* 삭제 */}
                <RiDeleteBinLine style={{marginBottom:'3px'}}/></button>
            }
          
        </div>
        <p className={styles.commentText}>{comment.comment &&renderContent(comment.comment) }</p>
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
