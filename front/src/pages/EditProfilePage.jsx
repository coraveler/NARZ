import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import ColorChoiceModal from "../Includes/calendar/ColorChoiceModal";
import { getLoginInfo } from "../Includes/common/CommonUtil";
import ProfileCard from "../Includes/personalPage/ProfileCard";
import { useToast } from "../Includes/toast/ToastContext";
import styles from '../css/EditProfilePage.module.css';
import ColorChangeModal from "./Personal/ColorChangeModal";
import api from '../api/axios';


const EditProfilePage = ({ selectedBadge }) => {
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    
    const navigate = useNavigate();
    // 초기 이미지 URL 저장
    const initialProfileImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/723a88e5c32d2472fefd9718f746254edeeadb446fa9ca56fed96b0d6b55d900?placeholderIfAbsent=true&apiKey=5069901003e646878c4e6740ca1b07b5";

    // 이미지 URL 상태 관리
    const [profileImage, setProfileImage] = useState(initialProfileImage);

    // 파일 선택 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // 미리보기용 이미지 설정
            };
            reader.readAsDataURL(file); // 파일을 읽어 DataURL로 변환
        }
    };

    // 파일 입력 리셋 핸들러
    const resetFileInput = (e) => {
        e.target.value = null;
    };

    // 닉네임 컬러 선택 모달창 닫기 함수
    const colorChoiceClose = () => {
        setColorChoiceVisible(false);
    }

    // 닉네임 컬러 변경 모달창 닫기 함수
    const colorChangeModalClose = () => {
        setColorChangeModalStatus(false);
    }

    // 닉네임 색상 변경 완료 클릭시 실행
    const colorChangeComplete = () => {
        alert("변경이 완료되었습니다.")
        setColorChangeModalStatus(false);
    }

    const [userName, setName] = useState('');
    const [userNickname, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
  
    const [nickNameColor, setNickNameColor] = useState('#000000')   // 닉네임 현재 색상
    const [colorChoiceVisible, setColorChoiceVisible] = useState(false);    // 닉네임 컬러 선택 모달창 상태
    const [colorChangeModalStatus, setColorChangeModalStatus] = useState(false);    // 컬러 변경 모달창 상태
    const { showLogoutToast } = useToast(); // Context에서 showLogoutToast 가져오기
    const [isReadOnly, setIsReadOnly] = useState(false);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 오류 메시지를 저장
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    phoneNum: "",
    birthday:""
  });


  // 유효성 검사 함수
  const validateInput = (key, value) => {
    switch (key) {
     
      case "phoneNum":
        return  /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value)? "" : "전화번호를 확인하세요.";  

      case "email":
         return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value)? "" : "이메일을 확인하세요.";  

         case "birthday":
            return /^\d{4}-\d{2}-\d{2}$/.test(value)? "" : "생년월일을 확인하세요.";  
  
      default:
        return "";
    }
  };
  
  
  // 입력값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    // 유효성 검사와 오류 상태 업데이트
    setErrors({
        ...errors,
        [id]: validateInput(id, value)
    });
    
    // 개별 필드의 상태 업데이트
    if (id === "email") {
        setEmail(value);
    } else if (id === "phoneNum") {
        setPhone(value);
    }
    else

    // formData 업데이트 (유효성 검사용)
    setFormData({
        ...formData,
        [id]: value
    });
};
    useEffect(()=>{

       let loginInfo = getLoginInfo();
       if(loginInfo==null){
        alert("로그인 먼저 해주세요");
        navigate('/LoginFormPage');
       }else{
        setName(loginInfo.userName);        
        setNickName(loginInfo.userNickname);
        setEmail(loginInfo.email);
        setPhone(loginInfo.phoneNum);
        setBirthday(loginInfo.birthday);
        setIsReadOnly(true);
       }
       


    },[])
    return (
        <div >
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} userId={userId}/>
            <main className={styles.mainContainer}>
                <div className={styles.ImageContainer}>
                    <img src={profileImage} alt="Profile" />
                    <div className={styles.ButtonGroup}>
                        <label className={styles.changeButton}>
                            이미지 변경
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                onClick={resetFileInput}
                            />
                        </label>
                        <button
                            className={styles.deleteButton}
                            onClick={() => setProfileImage(initialProfileImage)}
                        >
                            삭제
                        </button>
                    </div>
                </div>

                <form className="profile-form">
                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"userName"}>{"userName"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"userName"}
                                name={"userName"}
                                placeholder="Name"
                                value={userName}
                                readOnly={isReadOnly}
                                style={{
                                    backgroundColor: isReadOnly ? "#e9e6e6f5" : "white"  // readOnly 상태에 따라 배경색 변경
                                }}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setName(event.target.value);
                                    console.debug('userName', userName);

                                }}

                            />
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"userNickname"}>{"userNickname"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"userNickname"}
                                name={"userNickname"}
                                placeholder="NickName"
                                value={userNickname}
                                readOnly={isReadOnly}
                                style={{
                                    backgroundColor: isReadOnly ? "#e9e6e6f5" : "white"  // readOnly 상태에 따라 배경색 변경
                                }}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setNickName(event.target.value);
                                    console.debug('NickName', userNickname);
                                }}
                            />
                            
                            {/* 현재 닉네임 색상 */}
                            <div style={{backgroundColor: nickNameColor}}
                                onClick={()=>setColorChoiceVisible(true)}
                                className={styles.nickNameColor}
                            />
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <button type="button" className={styles.AutoButton} onClick={()=>setColorChangeModalStatus(true)}>색상 선택 완료</button>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"email"}>{"email"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="email"
                                id={"email"}
                                name={"email"}
                                value={email}
                                placeholder="Email"
                                onChange={handleInputChange} // handleInputChange를 직접 호출
                                />
                                {errors.email && <span className={styles.ErrorText}>{errors.email}</span>}
                            </div>
                        </div>
                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"phoneNum"}>{"phoneNum"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"phoneNum"}
                                name={"phoneNum"}
                                placeholder="Phone"
                                value={phoneNum}
                                onChange={handleInputChange} // handleInputChange를 직접 호출
                                />
                                {errors.phoneNum && <span className={styles.ErrorText}>{errors.phoneNum}</span>}
                            </div>
                        </div>
                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"birthday"}>{"birthday"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="date"
                                id={"Birthday"}
                                name={"birthday"}
                                placeholder="Birthday"
                                value={birthday}
                                max={getTodayDate()} 
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setBirthday(event.target.value);
                                    console.debug('birthday', birthday);
                                }
                                }
                            />
                        </div>
                    </div>

                    <button onClick={() => navigate('/PasswordResetPage')} className={styles.FullButton}>비밀번호 재설정</button>
                    <button type="submit" className={styles.FullButton}
                        onClick={ async (e) => {
                         
                          
                            e.preventDefault();
                            let loginInfo = getLoginInfo();
                            const userId =loginInfo.userId ;
                            const loginId =loginInfo.loginId;
                            let 전송할객체 = {
                                
                                
                                userId:userId ,
                                userName: userName,
                                userNickname: userNickname,
                                loginId:loginId,
                                email: email,
                                phoneNum: phoneNum,
                                birthday: birthday

                            }
                            console.log('전송할객체', 전송할객체)

                            try {
                                const response = await api.patch('user', 전송할객체, {
                                  headers: {
                                    // Content-Type을 설정하지 않음
                                   
                                  }
                                })
                                if (response.data.isUpdate == false) {
                                    alert("다시 확인해주십시오.")
                    
                                  }
                                  else {

                                    let data = response.data.userResponseDTO;
                                    let loginInfo = {data};
                                    console.log(loginInfo);
                                    localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
                                    alert("회원정보가 수정되었습니다.")
                                    navigate(0);
                                   
                                  }
                            }
                                catch(e){

                                }
                          
                        }
                        }

                    >확인</button>
                    <button onClick={() => navigate('/personal')} className={styles.FullButton}>취소</button>
                    <button onClick={() => {       
                        localStorage.removeItem('loginInfo');
                        // alert("로그아웃 되었습니다.");                 
                        navigate('/');
                        showLogoutToast();  // 로그아웃 토스트 실행
                    }

                        } className={styles.FullButton}>로그아웃</button>
                </form>
            </main>
            <br/>

            {/* 닉네임 색상 선택 모달 */}
            <ColorChoiceModal 
                colorChoiceClose={colorChoiceClose}
                colorChoiceVisible={colorChoiceVisible}
                scheduleColor={nickNameColor}
                setScheduleColor={setNickNameColor}
            />
            {/* 닉네임 색상 변경 모달 */}
            <ColorChangeModal
                colorChangeModalStatus={colorChangeModalStatus}
                colorChangeModalClose={colorChangeModalClose}
                colorChangeComplete={colorChangeComplete}
            />

            
        </div>
    );
};

export default EditProfilePage;
