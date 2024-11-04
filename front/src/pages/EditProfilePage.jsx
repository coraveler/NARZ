import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import ColorChoiceModal from "../Includes/calendar/ColorChoiceModal";
import { getLoginInfo } from "../Includes/common/CommonUtil";
import ProfileCard from "../Includes/personalPage/ProfileCard";
import { useToast } from "../Includes/toast/ToastContext";
import styles from '../css/EditProfilePage.module.css';
import ColorChangeModal from "./Personal/ColorChangeModal";


const EditProfilePage = ({ selectedBadge }) => {
    
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

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [nickNameColor, setNickNameColor] = useState('#000000')   // 닉네임 현재 색상
    const [colorChoiceVisible, setColorChoiceVisible] = useState(false);    // 닉네임 컬러 선택 모달창 상태
    const [colorChangeModalStatus, setColorChangeModalStatus] = useState(false);    // 컬러 변경 모달창 상태
    const { showLogoutToast } = useToast(); // Context에서 showLogoutToast 가져오기

    
    useEffect(()=>{

       let loginInfo = getLoginInfo();
       if(loginInfo==null){
        alert("로그인 먼저 해주세요");
        navigate('/LoginFormPage');
       }else{
        setName(loginInfo.userName);        
        setNickName(loginInfo.userNickname);
       }
       


    },[])
    return (
        <div >
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
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
                        <label htmlFor={"Name"}>{"Name"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"Name"}
                                name={"Name"}
                                placeholder="Name"
                                value={name}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setName(event.target.value);
                                    console.debug('Name', name);

                                }}

                            />
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"NickName"}>{"NickName"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"NickName"}
                                name={"NickName"}
                                placeholder="NickName"
                                value={nickName}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setNickName(event.target.value);
                                    console.debug('NickName', nickName);
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
                        <label htmlFor={"Email"}>{"Email"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"Email"}
                                name={"Email"}
                                value={email}
                                placeholder="Email"

                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setEmail(event.target.value);
                                    console.debug('Email', email);
                                }

                                }

                            />
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"Phone"}>{"Phone"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"Phone"}
                                name={"Phone"}
                                placeholder="Phone"
                                value={phone}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setPhone(event.target.value);
                                    console.debug('Phone', phone);
                                }

                                }
                            />
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"Birthday"}>{"Birthday"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"Birthday"}
                                name={"Birthday"}
                                placeholder="Birthday"
                                value={birthday}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setBirthday(event.target.value);
                                    console.debug('Birthday', birthday);
                                }
                                }
                            />
                        </div>
                    </div>

                    <button onClick={() => navigate('/PasswordResetPage')} className={styles.FullButton}>비밀번호 재설정</button>
                    <button type="submit" className={styles.FullButton}
                        onClick={(e) => {
                            e.preventDefault();
                            let 전송할객체 = {
                                name: name,
                                nickName: nickName,
                                email: email,
                                phone: phone,
                                birthday: birthday

                            }
                            console.log('전송할객체', 전송할객체)
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
