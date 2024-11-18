import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../css/Shop/ShopHistory.module.css'; 
import ShopNav from './ShopNav';

const ShopHistory = () => {
  const { user } = useAuth();  // AuthContext에서 user 가져오기
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 항목 수

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
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 날짜 최신순 정렬
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch mileage history:", error);
      }
    };

    fetchMileageHistory();
  }, [user]);  // user가 변경될 때마다 호출

    // 페이지에 맞게 데이터 분할
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = history.slice(startIndex, startIndex + itemsPerPage);
  
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(history.length / itemsPerPage);
  
    // 페이지 변경 핸들러
    const changePage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

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
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.createdAt}</td>
                      <td>{item.description}</td>
                      <td>{item.mileagePoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              {/* 페이지네이션 */}
              <div className={styles['pagination']}>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(index + 1)}
                    className={index + 1 === currentPage ? styles['active-page'] : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ShopHistory;
