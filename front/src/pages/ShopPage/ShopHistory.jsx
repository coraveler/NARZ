import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Shop/ShopHistory.module.css"; 
import ShopNav from "./ShopNav";


function ShopHistory() {
  const [history, setHistory] = useState([]);  // 마일리지 내역을 저장할 state
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // 데이터 로드하는 useEffect
  useEffect(() => {
    async function fetchMileageHistory() {
      try {
        const userId = 3; // 더미 사용자 ID
        const response = await fetch(`http://localhost:7777/api/mileage/history/${userId}`, {
          cache: "no-cache" // 캐시 비활성화
        });
        if (!response.ok) throw new Error("Server error occurred");
        const data = await response.json();
        setHistory(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch mileage history:", error);
        setLoading(false);
      }
    }
    
  
    fetchMileageHistory();
  }, []);
  

  if (loading) {
    return <div>로딩 중...</div>;  // 데이터 로딩 중일 때 표시할 내용
  }

  return (
    <div>
    <ShopNav /> 
    <div className={styles['shop-page']}>
      <div className={styles['mileage-history']}>
        <br/>
        <h3 className={styles['mileageTitle']}>-----$ 포인트 내역 $-----</h3>
        <br/>
        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>내용</th>
                <th>내역</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.createdAt}</td>
                  <td>{item.description}</td>
                  <td>{item.mileagePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShopHistory;

