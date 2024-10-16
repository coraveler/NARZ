import React from 'react';
import styles from '../css/Shop/ShopPurchase.module.css';

const ShopPurchase = () => {
  const options = [
    { name: "닉네임 이름 변경", price: "10000M" },
    { name: "닉네임 컬러 변경", price: "10000M" },
    { name: "프로필 사진 변경", price: "10000M" },
  ];

  return (
    <div className={styles['shop-purchase']}>
      <h2>마일리지 사용</h2>
      <div className={styles['options-container']}>
        {options.map((option, index) => (
          <div key={index} className={styles['option-card']}>
            <h3>{option.name}</h3>
            <p>가격: {option.price}</p>
            <button className={styles['purchase-button']}>구매</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPurchase;
