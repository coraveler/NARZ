import React from 'react';
import TravelCard from './TravelCard';
import styles from '../../../css/TravelCardGrid.module.css';

const travelData = [
  {
    title: '여수 해상케이블카',
    location: '전남 여수시',
    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3701228964e4ccfd952ba92ba493bbae38fdb8c8485599b6559f5172c919a05a?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',
    rating: 5
  },
  {
    title: '죽녹원',
    location: '전남 담양군',
    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3701228964e4ccfd952ba92ba493bbae38fdb8c8485599b6559f5172c919a05a?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',
    rating: 5
  },
  {
    title: '고성 통일전망타워',
    location: '강원 고성군',
    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b0098100071ee3b54a6e88fc4e3dec8cdf92162dd4ebee2293ffcef12d99ed6e?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',
    rating: 5
  },
  {
    title: '속초해수욕장',
    location: '강원 속초시',
    imageSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1557976b57e546de521f2eab1d6d46ca37564941011ae4774e3952494e309be9?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',
    rating: 5
  }
];

const TravelCardGrid = () => {
  return (
    <section className={styles.travelCardGrid}>
      {travelData.map((card, index) => (
        <div key={index} className={styles.travelCardColumn}>
          <TravelCard {...card} />
        </div>
      ))}
    </section>
  );
};

export default TravelCardGrid;