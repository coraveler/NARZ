import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../css/Shop/ShopHistory.module.css'; 
import ShopNav from './ShopNav';

const ShopHistory = () => {
  const { user } = useAuth();  // AuthContext에서 user 가져오기
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in yet.");
      return;
    }

    const fetchMileageHistory = async () => {
      try {
        const response = await fetch(`http://localhost:7777/api/mileage/history/${user}`, {
          cache: "no-cache",
        });

        if (!response.ok) throw new Error("서버 오류 발생");

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch mileage history:", error);
      }
    };

    fetchMileageHistory();
  }, [user]);  // user가 변경될 때마다 호출

  return (
    <div>
      <ShopNav />
      <div className={styles['shop-page']}>
        <div className={styles['mileage-history']}>
          <br />
          <h3 className={styles['mileageTitle']}>-----$ 포인트 내역 $-----</h3>
          <br />
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
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHistory;
