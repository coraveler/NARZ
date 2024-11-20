import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../css/Shop/ShopPurchase.module.css";
import ShopNav from "./ShopNav";
import api from "../../api/axios";
import { PiHandCoins } from "react-icons/pi";
import { RiCoupon3Fill } from "react-icons/ri";
import { TbPencilDollar } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { CgColorPicker } from "react-icons/cg";
import { MdStore } from "react-icons/md";

const ShopPurchase = ({ handleRefreshMileage }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const { user, userMileage, setUserMileage } = useAuth(); // AuthContext에서 userMileage와 setUserMileage 가져오기
  const [productCount, setProductCount] = useState();

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
    { name: "닉네임 변경", img : <TbPencilDollar />, price: 300, having: productCount?.changeNickname },
    { name: "닉네임 색상 변경", img : <CgColorPicker />, price: 300, having: productCount?.changeNicknameColor },
    { name: "프로필 사진 변경",img : <BsPersonCircle />,  price: 300, having: productCount?.changeProfileImage },
    { name: "포인트 쿠폰", img : <RiCoupon3Fill />, price: 1000 },
  ];

  useEffect(() => {
    fetchMileage();
  }, [])

  const fetchMileage = async () => {
    try {
      const loginInfoStr = localStorage.getItem("loginInfo");
      // if (!loginInfoStr) {
      //   setTotalMileage(0);
      //   return;
      // }
      const loginInfo = JSON.parse(loginInfoStr);
      const userId = loginInfo.data.userId;
      const response = await fetch(
        `http://localhost:7777/api/mileage/total/${userId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("Mileage fetched:", data);
      setUserMileage(data);
    } catch (error) {
      console.error("Error fetching mileage:", error);
    }
  };


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
        handleRefreshMileage();
        saveProduct(option);
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        alert(`구매에 실패했습니다: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      alert("구매에 실패했습니다: " + error.message);
    }
  };

  const saveProduct = async (option) => {
    const data = {
      userId: userId,
      product: option.name
    }
    try {
      const response = await api.post("/api/mileage/saveProduct", data)
    } catch (error) {
      console.error(error);
    }
  }

  const getProduct = async () => {
    try {
      const response = await api.get(`/api/mileage/getProduct/${userId}`)
      setProductCount(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(userId){
      getProduct();
    }
  }, [userId])

  return (
    <div>
      <style>
        {`
        @font-face {
            font-family: '양진체';
            src: url('https://fastly.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
        `}
      </style>
      <ShopNav />
      <div className={styles["shop-purchase"]}>
        <p style={{fontSize : "50px", fontFamily: '양진체'}}><MdStore /> STORE <MdStore /> </p>
        <br />
        <div className={styles["options-container"]}>
          {options.map((option, index) => (
            <div key={index} className={styles["option-card"]}>
              <h2>{option.img}</h2>
              <h4>{option.name}</h4>
              <span style={{fontSize :"25px"}}>{option.price}p</span><br></br>
              <button
                className={styles["purchase-button"]}
                onClick={() => handlePurchase(option)}
              >
                <PiHandCoins />
              </button>
              
              <div style={{color: "#1f1f1f"}}>
              <br></br>
              {
                index !== 3 &&
                <span>보유: x{option.having}</span>
              }
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
      <br/><br/><br/><br/>
    </div>
  );
};

export default ShopPurchase;
