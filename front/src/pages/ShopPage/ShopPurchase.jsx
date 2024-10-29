import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Shop/ShopPurchase.module.css';
import ShopNav from './ShopNav';

const ShopPurchase = () => {
  const options = [
    { name: "닉네임 변경", price: 10000 },
    { name: "닉네임 컬러 변경", price: 10000 },
    { name: "프로필 사진 변경", price: 10000 },
  ];

  const handlePurchase = async (option) => {
    const userId = 'user123'; // 더미 사용자 ID
    const mileagePoints = -option.price; // 사용된 포인트는 음수로 설정
    const description = `구매한 옵션: ${option.name}`;

    try {
      const response = await fetch('http://localhost:7777/api/mileage-history', { // 포트 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          mileage_points: mileagePoints,
          description: description,
        }),
      });

      if (response.ok) {
        alert('구매가 완료되었습니다!');
      } else {
        const errorData = await response.json();
        alert(`구매에 실패했습니다: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      alert('구매에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className={styles['shop-purchase']}>
      <ShopNav />
      <h2>포인트 사용</h2>
      <div className={styles['options-container']}>
        {options.map((option, index) => (
          <div key={index} className={styles['option-card']}>
            <h3>{option.name}</h3>
            <p>가격: {option.price}M</p>
            <button className={styles['purchase-button']} onClick={() => handlePurchase(option)}>구매</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPurchase;
