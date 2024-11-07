import React, { useState } from "react";
import ShopNav from "./ShopNav";
import styles from "../../css/Shop/Shop.module.css";

function ShopPage() {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const handleCouponRegister = async () => {
    try {
      const response = await fetch("http://localhost:7777/api/coupon/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  
          couponCode: couponCode,
          userId: 3, //더미 사용자 ID
        }),
      });

      const result = await response.text();
      setMessage(result); // 서버로부터 받은 메시지를 표시
    } catch (error) {
      setMessage("쿠폰 등록에 실패했습니다: " + error.message);
    }
  };

  return (
    <div className={styles["shop-page"]}>
      <ShopNav />
      <br />
      <main>
        <h3 className={styles["shop-title"]}>-----$ 쿠폰 등록 $-----</h3>
        <div className={styles["coupon-register"]}>
          <h2>포인트 쿠폰 등록</h2>
          <br />
          <input
            type="text"
            placeholder="쿠폰 번호 입력"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={styles.couponInput}
          />
          <button className={styles["purchase-button"]} onClick={handleCouponRegister}>
            입력
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default ShopPage;
