import React, { useEffect, useState } from 'react';
import BackgroundSlider from '../Includes/common/BackgroundSlider';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import RegionSelector from '../Includes/common/region/RegionSelector';
import api from '../api/axios';
import { IoMdArrowDropright } from "react-icons/io";

function HomePage() {
  const [bookMarkPost, setBookMarkPost] = useState({});
  const userId = 'userB';
  

  const getBookMarkPost = async () => {
    try {
      const response = await api.get(`post/get/bookmark/${userId}`);
      console.log("debug >>> response, ", response.data);
      // 최신순으로 정렬
      const sortedPosts = response.data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });

      setBookMarkPost(sortedPosts);

    } catch (err) {
      // setError('Failed to load images');
      console.log(err);
    }
  };

  useEffect(() => {
    getBookMarkPost();
  }, []);

  const sections = [
    { title: '주간 인기 게시글 랭킹', data: [] }, // 데이터는 필요에 따라 설정합니다.
    { title: '팔로잉 게시판', data: [] }, // 데이터는 필요에 따라 설정합니다.
    { title: '북마크 게시판', data: bookMarkPost } // 북마크 게시판 데이터
  ];
  
  return (
    <div>


      <BackgroundSlider />
      <br />

      <RegionSelector />

     
      <br />
      <div>
        <h3 style={{width:'950px', textAlign:"left", marginLeft:"auto", marginRight:"auto"}}>주간 활동 랭킹</h3>
        <div align="center">
          <TravelCardGrid />
        </div>
      </div>
      <br />
      <div>
      <br />
      {sections.map((section, index) => (
        <div key={index}>
          <h3 style={{width:'950px', textAlign:"left", marginLeft:"auto", marginRight:"auto"}}>{section.title}</h3>
          <div style={{ cursor: "pointer" }} onClick={undefined}>
            {section.data.length > 5 &&
                <p style={{ width: '920px', textAlign: "right", marginLeft: "auto", marginRight: "auto" }}>
                  더보기 <IoMdArrowDropright style={{ fontSize: "25px", marginBottom: "3px" }} />
                </p>
                }
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



