import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import BackgroundSlider from '../Includes/common/BackgroundSlider';
import { getLoginInfo } from "../Includes/common/CommonUtil";
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import RegionSelector from '../Includes/common/region/RegionSelector';
import NotificationModal from '../Includes/nofification/NotificationModal';
import api from '../api/axios';
import '../css/Homepage.css';

function HomePage({nc}) {
  const navigate = useNavigate();
  const [bookMarkPost, setBookMarkPost] = useState([]);
  const [followPost, setFollowPost] = useState([]);
  const [popularPost, setpopularPost] = useState([]); // 여기 수정
  let loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;
  const notificationRef = useRef(null); // NotificationModal에 접근하기 위한 ref 생성

  const getBookMarkPost = async () => {
    try {
      const response = await api.get(`post/get/bookmark/all`, {
        params: {
          userId
        }
      });
      console.log("debug >>> response, ", response.data);
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setBookMarkPost(sortedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const getFollowPost = async () => {
    try {
      const response = await api.get(`post/get/follow/all`, {
        params: {
          userId
        }
      });
      console.log("debug >>> response, ", response.data);
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setFollowPost(sortedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const getpopularPost = async () => {
    try {
      const response = await api.get(`post/get/popular/all`, {
        params: {
          userId
        }
      });
      console.log("debug >>> response, ", response.data);
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setpopularPost(sortedPosts); // setpopularPost로 수정
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(userId){
      getBookMarkPost();
      getFollowPost();
      getpopularPost();
    }
    // 로그인 후 알림
    if(localStorage.getItem("loginNotification")){
      notificationRef.current.loginHandler();
      localStorage.removeItem("loginNotification")
    }
  }, [userId]);

  const sections = [
    { title: ' # 주간 인기 게시글', data: popularPost, action: () => navigate("/board/popular") },
    { title: '# 주간 활동 랭킹', data: [], action: () => navigate("/board/activity") },
    { title: '# 팔로잉 게시판', data: followPost, action: () => navigate("/board/follow/all") },
    { title: '# 북마크 게시판', data: bookMarkPost, action: () => navigate("/board/bookmark/all") }
  ];

  return (
    <div>
      <BackgroundSlider />
      <br />
      <RegionSelector board={'localboard'}/>
      <br />
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            {((index > 1) && (userId == null)) ? undefined : <h3 className="section-title">{section.title}</h3>}  
            <div>
              {section.data.length > 5 ? (
                <p style={{ width: '920px', textAlign: "right", marginLeft: "auto", marginRight: "auto" }}>
                  <span style={{ cursor: "pointer" }} onClick={section.action}>
                    더보기 <IoMdArrowDropright style={{ fontSize: "25px", marginBottom: "3px" }} />
                  </span>
                </p>
              ) : <br />}
            </div>
            <div align="center">
              {((index > 1) && (userId == null)) ? undefined : <TravelCardGrid data={section.data} itemsPerPage={5} />}
            </div>
            <br />
          </div>
        ))}
      </div>
      <br /><br />
      <NotificationModal ref={notificationRef}/> 
    </div>
  );
}

export default HomePage;
