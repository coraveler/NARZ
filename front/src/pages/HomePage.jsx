import React, { useEffect, useState } from 'react';
import BackgroundSlider from '../Includes/common/BackgroundSlider';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import RegionSelector from '../Includes/common/region/RegionSelector';
import api from '../api/axios';
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import '../css/Homepage.css';
import { getLoginInfo } from "../Includes/common/CommonUtil";

function HomePage() {
  const navigate = useNavigate();
  const [bookMarkPost, setBookMarkPost] = useState([]);
  const [followPost, setFollowPost] = useState([]);
  let loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;

  const getBookMarkPost = async () => {
    try {
      const response = await api.get(`post/get/bookmark/all`, {
        params: {
          userId
        }
      });
      console.log("debug >>> response, ", response.data);
      // 최신순으로 정렬
      const sortedPosts = response.data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });

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
      // 최신순으로 정렬
      const sortedPosts = response.data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });

      setFollowPost(sortedPosts);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(userId){
      getBookMarkPost();
      getFollowPost();
    }
  }, []);

  const sections = [
    { title: ' # 주간 인기 게시글', data: [], action: () => navigate("/board/popular") },
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
            {
                ((index>1) && (userId == null)) ? undefined:
                  <h3 className="section-title">{section.title}</h3>
            }  
            <div >
              {section.data.length > 5 ? (
                <p style={{ width: '920px', textAlign: "right", marginLeft: "auto", marginRight: "auto"}} >
                  <span style={{cursor: "pointer"}} onClick={section.action}>더보기 <IoMdArrowDropright style={{ fontSize: "25px", marginBottom: "3px" }} /></span>
                </p>
              ):<br/>}
            </div>
            <div align="center">
              {
                ((index>1) && (userId == null)) ? undefined:
                <TravelCardGrid data={section.data} itemsPerPage={5} />                                         
              }       
              
            </div>
            <br />
          </div>
        ))}
      </div>

      <br /><br />
    </div>
  );
}

export default HomePage;
