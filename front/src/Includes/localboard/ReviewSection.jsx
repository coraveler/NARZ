import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../css/ReviewSection.module.css';
import { getLoginInfo } from "../../Includes/common/CommonUtil";

const ReviewSection = ({ ratingAvg, kLocal, handleArray, handleStandard, searchTerm, board }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [arrayButtonState, setArrayButtonState] = useState(() => {
    const storedState = localStorage.getItem('arrayButtonState');
    return storedState !== null ? Number(storedState) : 0;
  });

  const [standardButtonState, setStandardButtonState] = useState(() => {
    const storedState = localStorage.getItem('standardButtonState');
    return storedState !== null ? Number(storedState) : 0;
  });

  useEffect(() => {
    localStorage.setItem('arrayButtonState', arrayButtonState);
    localStorage.setItem('standardButtonState', standardButtonState);
  }, [arrayButtonState, standardButtonState]);

  const handleArrayState = (index) => {
    setArrayButtonState(index);
  };

  const handleStandardState = (index) => {
    setStandardButtonState(index);
  };

  const writePost = () => {
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    if (userId) {
      navigate("/TravelWritePage");
    } else {
      alert("로그인 후 이용가능합니다.");
    }
  }


  // const ArrayOptions = [
  //   { text: '최신순', action: () => { handleArray(0); handleArrayState(0); } },
  //   { text: '인기순', action: () => { handleArray(1); handleArrayState(1); } },
  //   { text: '평점순', action: () => { handleArray(2); handleArrayState(2); } },
  //   { text: '글작성', action: writePost }
  // ];

  const ArrayOptions = [
    { text: '최신순', action: () => { handleArray(0); handleArrayState(0); } },
    { text: '인기순', action: () => { handleArray(1); handleArrayState(1); } },
    { text: '평점순', action: () => { handleArray(2); handleArrayState(2); } },
  ];

  const FilterOptions = [
    { text: '제목+내용', action: () => { handleStandard(0); handleStandardState(0); } },
    { text: '작성자', action: () => { handleStandard(1); handleStandardState(1); } },
  ];

  const activeStyle = {
    backgroundColor: "#FFB74D",
    color: "white",
    // marginLeft: '20px'
  };

  const inactiveStyle = {
    backgroundColor: "white",
    color: "#FFC107",
    // marginLeft: '10px'
  };

  useEffect(() => {
    setStandardButtonState(0);
    // setArrayButtonState(0);
  }, []);

  const [selectedOption, setSelectedOption] = useState('최신순'); // 초기값 설정

  useEffect(() => {
    // arrayButtonState에 따라 selectedOption 업데이트
    const options = ['최신순', '인기순', '평점순'];
    setSelectedOption(options[arrayButtonState]);
  }, [arrayButtonState]);

  const handleSelect = (option) => {
    setSelectedOption(option.text); // 선택된 옵션의 텍스트로 상태 업데이트
    option.action(); // 선택된 옵션의 액션 호출
  };

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer} style={{ position: 'relative' }}>


        <h2 className={styles.reviewScore}>
          {kLocal} 후기 평점 : <span className={styles.scoreHighlight}>{ratingAvg}</span>
        </h2>

        {/* {kLocal ? 
          (<h2 className={styles.reviewScore}>
            {kLocal} 후기 평점 : <span className={styles.scoreHighlight}>{ratingAvg}</span>
          </h2>)
          : <h2>none</h2>} */}



        {searchTerm && FilterOptions.map((option, index) => {
          // const isLastButton = index === FilterOptions.length - 1;
          return (
            <div
              key={index}
              className={styles.filterButton}
              style={{ marginLeft: "15px" }}
              onClick={option.action}
            >
              <button
                className={index === standardButtonState ? "btn btn-warning" : "btn btn-outline-warning"}
                style={index === standardButtonState ? activeStyle : inactiveStyle}
              >
                {option.text}
              </button>

            </div>
          );
        })}



        <div className={styles.dividerContainer}>
          <div className={styles.verticalDivider} />
        </div>


        <div>
          {
            (board == 'travelog') ? undefined :
              <>
                <button
                  className={location.pathname.includes('/bookmark') ? "btn btn-warning" : "btn btn-outline-warning"}
                  onClick={() => location.pathname.includes('/bookmark') ?  navigate('/board/localboard/all'):navigate('/board/bookmark/all')}
                  style={{ marginRight: '20px' }}
                >
                  북마크
                </button>
                <button
                  className={location.pathname.includes('/follow') ? "btn btn-warning" : "btn btn-outline-warning"}
                  onClick={() => location.pathname.includes('/follow') ? navigate('/board/localboard/all'):navigate('/board/follow/all')}
                  style={{ marginRight: '20px' }}
                >
                  팔로잉
                </button>
              </>
          }

          <DropdownButton
            as={ButtonGroup}
            title={selectedOption}
            key='warning'
            id="dropdown-variants-warning"
            variant="warning"
          >

            {ArrayOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                eventKey={index}
                onClick={() => handleSelect(option)} // 클릭 시 handleSelect 호출
                className={index === arrayButtonState ? "btn btn-warning" : "btn btn-outline-warning"}
                style={index === arrayButtonState ? activeStyle : inactiveStyle}
              >
                {option.text}
              </Dropdown.Item>
            ))}
          </DropdownButton>


        </div>
        <button
          className={"btn btn-outline-warning"}
          onClick={writePost}
          style={{ marginLeft: 'auto' }}
        >
          글작성
        </button>

      </div>
    </section>
  );
};

export default ReviewSection;
