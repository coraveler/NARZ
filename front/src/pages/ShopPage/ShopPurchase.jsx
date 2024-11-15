import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../css/Shop/ShopPurchase.module.css";
import ShopNav from "./ShopNav";

const ShopPurchase = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const { user, userMileage, setUserMileage } = useAuth(); // AuthContext에서 userMileage와 setUserMileage 가져오기

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("loginInfo");
    if (storedLoginInfo) {
      const parsedLoginInfo = JSON.parse(storedLoginInfo);
      setUserId(parsedLoginInfo.data.userId);
    } else {
      setUserId(null);
    }
    setIsLoading(false);
  }, []);

  const options = [
    { name: "닉네임 변경", price: 10000 },
    { name: "닉네임 컬러 변경", price: 10000 },
    { name: "프로필 사진 변경", price: 10000 },
    { name: "구매", price: 10000 },
    { name: "구매2", price: 20000 },
    { name: "구매3", price: 30000 },
    { name: "구매4", price: 40000 },
    { name: "구매5", price: 50000 },
  ];

  const handlePurchase = async (option) => {
    if (!userId) {
      alert("로그인된 사용자가 없습니다.");
      return;
    }

    if (userMileage < option.price) {
      alert("포인트가 부족합니다. 충전 후 다시 시도해주세요.");
      return;
    }

    const mileagePoints = -option.price;
    const description = `구매한 옵션: ${option.name}`;

    try {
      const response = await fetch(
        "http://localhost:7777/api/mileage/history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            mileagePoints: mileagePoints,
            description: description,
          }),
        }
      );
      if (response.ok) {
        alert("구매가 완료되었습니다!");
        setUserMileage(userMileage + mileagePoints); // 잔여 포인트 업데이트
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        alert(`구매에 실패했습니다: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      alert("구매에 실패했습니다: " + error.message);
    }
  };

  return (
    <div>
      <ShopNav />
      <div className={styles["shop-purchase"]}>
        <h3>-----$ 포인트 상점 $-----</h3>
        <br />
        <div className={styles["options-container"]}>
          {options.map((option, index) => (
            <div key={index} className={styles["option-card"]}>
              <h4>{option.name}</h4>
              <p>가격: {option.price}P</p>
              <button
                className={styles["purchase-button"]}
                onClick={() => handlePurchase(option)}
              >
                구매
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPurchase;
