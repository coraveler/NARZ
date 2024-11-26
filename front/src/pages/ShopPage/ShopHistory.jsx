import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../css/Shop/ShopHistory.module.css";
import ShopNav from "./ShopNav";
import { IoReceiptOutline } from "react-icons/io5";
import api from "../../api/axios";

const ShopHistory = () => {
  const { user } = useAuth(); // AuthContext에서 user 가져오기
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 항목 수
  const maxPageButtons = 5; // 한 번에 보여줄 페이지 버튼 수

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in yet.");
      return;
    }

    const fetchMileageHistory = async () => {
      try {
        const response = await fetch(
          `http://211.188.63.26:7777/api/mileage/history/${user}`,
          {
            cache: "no-cache",
          }
        );

        if (!response.ok) throw new Error("서버 오류 발생");

        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // 날짜 최신순 정렬
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch mileage history:", error);
      }
    };

    fetchMileageHistory();
  }, [user]); // user가 변경될 때마다 호출

  // 페이지에 맞게 데이터 분할
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = history.slice(startIndex, startIndex + itemsPerPage);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(history.length / itemsPerPage);

  // 페이지네이션에서 보여줄 시작/끝 페이지 계산
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // 이전 페이지 핸들러
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 다음 페이지 핸들러
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <ShopNav />
      <div className={styles["shop-page"]}>
        <div className={styles["mileage-history"]}>
          {/* <p style={{fontSize:"40px", color:"#FF8A2B"}}><IoReceiptOutline /> </p> */}
          {/* <h3 className={styles["mileageTitle"]}> 포인트 내역 </h3> */}
          <br />
          <div className={styles["table-container"]}>
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
                    <td>{new Date(item.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // 24시간 형식
                    })}</td>

                    <td>{item.description}</td>
                    <td>{item.mileagePoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            {/* 페이지네이션 */}
            <div className={styles["pagination"]}>
              {/* 처음으로 버튼 */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </button>

              {/* 이전 버튼 */}
              <button onClick={handlePrev} disabled={currentPage === 1}>
                {"<"}
              </button>

              {/* 동적 페이지 버튼 */}
              {[...Array(endPage - startPage + 1)].map((_, index) => (
                <button
                  key={startPage + index}
                  onClick={() => setCurrentPage(startPage + index)}
                  className={
                    startPage + index === currentPage
                      ? styles["active-page"]
                      : ""
                  }
                >
                  {startPage + index}
                </button>
              ))}

              {/* 다음 버튼 */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>

              {/* 마지막으로 버튼 */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHistory;
