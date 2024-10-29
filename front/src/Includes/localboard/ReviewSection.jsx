import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReviewSection.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewSection = ({ ratingAvg, kLocal, handleArray, handleStandard, searchTerm }) => {
  const navigate = useNavigate();
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

  const ArrayOptions = [
    { text: '최신순', action: () => { handleArray(0); handleArrayState(0); } },
    { text: '인기순', action: () => { handleArray(1); handleArrayState(1); } },
    { text: '평점순', action: () => { handleArray(2); handleArrayState(2); } },
    { text: '글작성', action: () => navigate("/TravelWritePage") }
  ];

  const FilterOptions = [
    { text: '제목+내용', action: () => { handleStandard(0); handleStandardState(0); } },
    { text: '작성자', action: () => { handleStandard(1); handleStandardState(1); } },
  ];

  const activeStyle = {
    backgroundColor: "#FFB74D",
    color: "white",
  };

  const inactiveStyle = {
    backgroundColor: "white",
    color: "#FFC107",
  };

  useEffect(() => {
    setStandardButtonState(0);
    // setArrayButtonState(0);
}, []);

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        {kLocal ? 
          (<h2 className={styles.reviewScore}>
            {kLocal} 후기 평점 : <span className={styles.scoreHighlight}>{ratingAvg}</span>
          </h2>)
          : <h2>none</h2>}
        
        

        {searchTerm && FilterOptions.map((option, index) => {
          // const isLastButton = index === FilterOptions.length - 1;
          return (
            
            <div
              key={index}
              className={styles.filterButton}
              style={{ marginLeft: "5px" }}
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

        {ArrayOptions.map((option, index) => {
          const isLastButton = index === ArrayOptions.length - 1;
          return (
            <div
              key={index}
              className={styles.filterButton}
              style={isLastButton ? { marginLeft: "auto" } : {}}
              onClick={option.action}
            >
              <button
                className={index === arrayButtonState ? "btn btn-warning" : "btn btn-outline-warning"}
                style={index === arrayButtonState ? activeStyle : inactiveStyle}
              >
                {option.text}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewSection;
