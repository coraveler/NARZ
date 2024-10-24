import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Shop/ShopHistory.module.css"; 

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/shop">포인트 쿠폰</Link></li>
        <li><Link to="/purchase">포인트 사용</Link></li>
        <li><Link to="/history">포인트 내역</Link></li>
      </ul>
    </nav>
  );
}

function ShopHistory() {
  const [history, setHistory] = useState([]);  // 마일리지 내역을 저장할 state
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // 데이터 로드하는 useEffect
  useEffect(() => {
    async function fetchMileageHistory() {
      try {
        const userId = 'user123'; // 더미 사용자 ID
        const response = await fetch(`/api/mileage-history/${userId}`);  // API 호출
        const data = await response.json();  // JSON 형식으로 변환
        setHistory(data);  // 데이터 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Failed to fetch mileage history:", error);
        setLoading(false); // 오류 발생 시에도 로딩 종료
      }
    }

    fetchMileageHistory();  // 함수 호출
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;  // 데이터 로딩 중일 때 표시할 내용
  }

  return (
    <div className={styles['shop-page']}>
      <Navbar /> 
      <div className={styles['mileage-history']}>
        <h2>포인트 내역</h2>
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
                  <td>{item.created_at}</td>
                  <td>{item.description}</td>
                  <td>{item.mileage_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShopHistory;
