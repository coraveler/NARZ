import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userMileage, setUserMileage] = useState(0);

  const fetchUserMileage = async (userId) => {
    const response = await fetch(`http://localhost:7777/api/mileage/total/${userId}`);
    const mileage = await response.json();
    setUserMileage(mileage);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loginInfo');  // localStorage에서 로그인 정보 가져오기
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.data.userId);  // userId를 상태로 설정
    }
  }, []);  // 컴포넌트 마운트 시 한번만 실행

  return (
    <AuthContext.Provider value={{ user, userMileage, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
