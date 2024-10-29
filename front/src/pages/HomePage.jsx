import React, { useEffect, useState } from 'react';
import BackgroundSlider from '../Includes/common/BackgroundSlider';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import RegionSelector from '../Includes/common/region/RegionSelector';
import api from '../api/axios';
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import '../css/Homepage.css';

function HomePage() {
  const navigate = useNavigate();
  const [bookMarkPost, setBookMarkPost] = useState([]);
  const userId = 'userB';
  const local = 'all';

  const getBookMarkPost = async () => {
    try {
      const response = await api.get(`post/get/bookmark`, {
        params: {
          local: local,
          userId: userId
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

  useEffect(() => {
    getBookMarkPost();
  }, []);

  const sections = [
    { title: ' # 주간 인기 게시글', data: [], action: () => navigate("/board/popular") },
    { title: '# 주간 활동 랭킹', data: [], action: () => navigate("/board/activity") },
    { title: '# 팔로잉 게시판', data: [], action: () => navigate("/board/following") },
    { title: '# 북마크 게시판', data: bookMarkPost, action: () => navigate("/board/bookmark/all") }
  ];

  return (
    <div>
      <BackgroundSlider />
      <br />

      <RegionSelector />

      <br />
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="section-title">{section.title}</h3>
            <div style={{ cursor: "pointer" }} onClick={section.action}>
              {section.data.length > 5 && (
                <p style={{ width: '920px', textAlign: "right", marginLeft: "auto", marginRight: "auto" }}>
                  더보기 <IoMdArrowDropright style={{ fontSize: "25px", marginBottom: "3px" }} />
                </p>
              )}
            </div>
            <div align="center">
              <TravelCardGrid data={section.data} itemsPerPage={5} />
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
