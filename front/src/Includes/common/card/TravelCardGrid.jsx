import React, { useEffect } from 'react';
import TravelCard from './TravelCard';
import styles from '../../../css/TravelCardGrid.module.css';

const TravelCardGrid = (props) => {
  const data = Array.isArray(props.data) ? props.data : []; // props.data가 배열인지 확인
  const { page = 1, onTotalCountChange } = props; // 페이지 번호와 콜백 함수를 props에서 가져옴
  const itemsPerPage = props.itemsPerPage || 1; // 기본값 설정
  // const msg = props.msg

  // 시작 인덱스와 끝 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 현재 페이지에 해당하는 데이터 슬라이스
  const currentData = data.slice(startIndex, endIndex);

  // 전체 게시글 수를 부모 컴포넌트에 전달
  useEffect(() => {
    if (onTotalCountChange) {
      onTotalCountChange(data.length); // 전체 게시글 수를 부모에게 전달
    }
  }, [data.length, onTotalCountChange]);

  return (
    <section className={styles.travelCardGrid}>
      {currentData.length > 0 ? (
        currentData.map((item, index) => (
          <div key={startIndex + index} className={styles.travelCardColumn}>
            <TravelCard data={item} trimmedUrl={props.trimmedUrl}/>
          </div>
        ))
      ) : (
        <p>{props.msg}</p> // 데이터가 없을 때 표시할 메시지
      )}
    </section>
  );
};

export default TravelCardGrid;