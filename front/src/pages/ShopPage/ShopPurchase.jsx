import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Shop/ShopPurchase.module.css';
import ShopNav from './ShopNav';

const ShopPurchase = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    const loginInfo = { data: { userId: userId } }; // 예시로 loginInfo를 설정
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    console.log("로그인 후 userId:", userId);  // 제대로 저장되었는지 확인
  }

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("loginInfo");
    if (storedLoginInfo) {
      const parsedLoginInfo = JSON.parse(storedLoginInfo);
      setUserId(parsedLoginInfo.data.userId);  // userId를 상태에 설정
    }
  }, []);

  const options = [
    { name: "닉네임 변경", price: 10000 },
    { name: "닉네임 컬러 변경", price: 10000 },
    { name: "프로필 사진 변경", price: 10000 },
    { name: "포인트 쿠폰 구매", price: 10000 }
  ];

  const handlePurchase = async (option) => {
    console.log("현재 userId:", userId);  // 로그로 확인

    if (!userId) {
      alert("로그인된 사용자가 없습니다.");
      return;
    }

    const mileagePoints = -option.price; // 사용된 포인트는 음수로 설정
    const description = `구매한 옵션: ${option.name}`;

    try {
      const response = await fetch('http://localhost:7777/api/mileage/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          mileagePoints: mileagePoints,
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
    <div>
      <ShopNav />
      <div className={styles['shop-purchase']}>
        <h3>-----$ 포인트 상점 $-----</h3>
        <br />
        <div className={styles['options-container']}>
          {options.map((option, index) => (
            <div key={index} className={styles['option-card']}>
              <h4>{option.name}</h4>
              <p>가격: {option.price}M</p>
              <button className={styles['purchase-button']} onClick={() => handlePurchase(option)}>구매</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPurchase;
