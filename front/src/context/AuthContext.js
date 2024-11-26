import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userMileage, setUserMileage] = useState(0);

  const fetchUserMileage = async (userId) => {
    try {
      const response = await fetch(`http://211.188.63.26:7777/api/mileage/total/${userId}`);
      const mileage = await response.json();
      setUserMileage(mileage ?? 0); // 데이터가 없으면 0으로 설정
    } catch (error) {
      console.error("Failed to fetch mileage:", error);
      setUserMileage(0); // 에러 발생 시 기본값 설정
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loginInfo');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.data.userId;
      setUser(userId);  // userId를 상태로 설정
      fetchUserMileage(userId); // userId가 설정된 후 마일리지 조회
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ user, userMileage, setUserMileage, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
