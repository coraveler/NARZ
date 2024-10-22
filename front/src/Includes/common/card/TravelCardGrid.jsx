import React from 'react';
import TravelCard from './TravelCard';
import styles from '../../../css/TravelCardGrid.module.css';


const TravelCardGrid = (props) => {
  const data = props.data || []; // props.data가 undefined일 경우 빈 배열로 설정

  return (
    <section className={styles.travelCardGrid}>
      {data.length > 0 ? (
        data.map((data, index) => (
          <div key={index} className={styles.travelCardColumn}>
            <TravelCard data = {data} />
          </div>
        ))
      ) : (
        <p>No posts available.</p> // 데이터가 없을 때 표시할 메시지
      )}
    </section>
  );
};



export default TravelCardGrid;