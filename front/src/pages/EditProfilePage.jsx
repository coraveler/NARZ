import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import ColorChoiceModal from "../Includes/calendar/ColorChoiceModal";
import { getLoginInfo } from "../Includes/common/CommonUtil";
import ProfileCard from "../Includes/personalPage/ProfileCard";
import { useToast } from "../Includes/toast/ToastContext";
import api from '../api/axios';
import styles from '../css/EditProfilePage.module.css';
import ColorChangeModal from "./Personal/ColorChangeModal";

const EditProfilePage = ({ selectedBadge, nc }) => {
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    const [productCount, setProductCount] = useState();
    // const [changeNinameColor, setChangeNinameColor] = useState(false);
    const [changeNiname, setChangeNiname] = useState(false);
    const [changeProfileImage, setChangeProfileImage] = useState(false);

    const navigate = useNavigate();
    // 초기 이미지 URL 저장
    const initialProfileImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/723a88e5c32d2472fefd9718f746254edeeadb446fa9ca56fed96b0d6b55d900?placeholderIfAbsent=true&apiKey=5069901003e646878c4e6740ca1b07b5";

    // 이미지 URL 상태 관리
    const [profileImage, setProfileImage] = useState(initialProfileImage);

    // 파일 선택 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.debug('file', file);
        if (file) {
            setChangeProfileImage(true);
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

    // 자식 컴포넌트에 대한 참조
    const profileInfoRef = useRef();

    // 닉네임 색상 변경 완료 클릭시 실행
    const colorChangeComplete = () => {

        setColorChangeModalStatus(false);
        changeNicknameColor();
    }

    const [userName, setName] = useState('');
    const [userNickname, setNickName] = useState('#000000');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');

    const [fetchNameColor, setFetchNameColor] = useState('') // 가져온 유저 닉네임 색상
    const [nickNameColor, setNickNameColor] = useState('')   // 닉네임 현재 색상
    const [colorChoiceVisible, setColorChoiceVisible] = useState(false);    // 닉네임 컬러 선택 모달창 상태
    const [colorChangeModalStatus, setColorChangeModalStatus] = useState(false);    // 컬러 변경 모달창 상태
    const { showLogoutToast } = useToast(); // Context에서 showLogoutToast 가져오기
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isReadNickname, setIsReadNickname] = useState(false);


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
        birthday: ""
    });


    // 유효성 검사 함수
    const validateInput = (key, value) => {
        switch (key) {

            case "phoneNum":
                return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value) ? "" : "전화번호를 확인하세요.";

            case "email":
                return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value) ? "" : "이메일을 확인하세요.";

            case "birthday":
                return /^\d{4}-\d{2}-\d{2}$/.test(value) ? "" : "생년월일을 확인하세요.";

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
    useEffect(() => {

        let loginInfo = getLoginInfo();
        if (loginInfo == null) {
            setIsReadOnly(true);
            // alert("로그인 먼저 해주세요");
            navigate('/LoginFormPage');
        } else {
            console.debug('logininfo', loginInfo)
            setName(loginInfo.userName);
            setNickName(loginInfo.userNickname);
            setEmail(loginInfo.email);
            setPhone(loginInfo.phoneNum);
            setBirthday(loginInfo.birthday);

            fetchNicknameColor();
            setProfileImage(`http://211.188.63.26:7777/profileImages/${loginInfo.profileImage}` );
        }
    }, [])

    const changeNicknameColor = async () => {
        console.log(nickNameColor)
        if (loginInfo) {
            const data = {
                userId: loginInfo.userId,
                userColor: nickNameColor
            }
            try {
                const response = await api.patch('/user/nicknameColor', data)
                response.status == 200 ? alert("변경이 완료되었습니다.") : alert("변경 중 오류가 발생했습니다.")
                profileInfoRef.current.getUserInfo();  // 자식 컴포넌트의 메서드 접근
                fetchNicknameColor();

            } catch (e) {
                console.log(e);
            }
        }
    }

    const fetchNicknameColor = async () => {
        if (loginInfo) {
            try {
                const response = await api.get(`/user/nicknameColor?userId=${loginInfo.userId}`)
                setNickNameColor(response.data)
                setFetchNameColor(response.data)

            } catch (e) {
                console.log(e);
            }
        }
    }



    const chatLogout = async () => {
        try {
            await nc.disconnect();
            console.log("채팅 로그아웃 성공");
        }
        catch (e) {
            console.error("채팅 로그아웃 실패:", e);
        }
    }

    const getProduct = async () => {
        try {
            const response = await api.get(`/api/mileage/getProduct/${userId}`)
            setProductCount(response.data);
            console.log(response.data);
            if (!response.data.changeNickname > 0) {
                setIsReadNickname(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (userId) {
            getProduct();
        }
    }, [userId])

    const deleteProduct = async (product) => {
        try {
            const response = await api.delete("/api/mileage/deleteProduct", {
                params: {
                    userId: userId,
                    product: product
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div >
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} userId={userId} profileInfoRef={profileInfoRef} />
            <main className={styles.mainContainer}>
                <div className={styles.ImageContainer}>
                    <img src={profileImage==`http://211.188.63.26:7777/profileImages/default.png` ? "/img/default.png" : profileImage} alt="Profile" />
                    <div className={styles.ButtonGroup}>
                        {
                            productCount?.changeProfileImage > 0 &&
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
                        }



                        <button
                            className={styles.deleteButton}
                            onClick={() => setProfileImage("/img/default.png")}
                        >
                            삭제
                        </button>

                    </div>
                    <br/>
                    {
                        !productCount?.changeProfileImage > 0 &&
                        <span style={{ color: 'red' }}>프로필 이미지 변경은 상점에서 구매 후 이용 가능합니다.</span>
                    }
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
                                readOnly={true}
                                style={{
                                    backgroundColor: true ? "#e9e6e6f5" : "white"  // readOnly 상태에 따라 배경색 변경
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
                                readOnly={isReadNickname}
                                style={{
                                    backgroundColor: isReadNickname ? "#e9e6e6f5" : "white"  // readOnly 상태에 따라 배경색 변경
                                }}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setNickName(event.target.value);
                                    console.debug('NickName', userNickname);
                                    setChangeNiname(true);
                                }}
                            />


                            {
                                productCount?.changeNicknameColor > 0 && (
                                    <div style={{ backgroundColor: nickNameColor }}
                                        onClick={() => setColorChoiceVisible(true)}
                                        className={styles.nickNameColor}
                                    />)
                            }
                            {/* 현재 닉네임 색상 */}


                        </div>

                    </div>

                    <div className={styles.FieldWrapper}>
                        {
                            productCount?.changeNicknameColor ?
                                <button type="button"
                                    className={styles.AutoButton}
                                    onClick={() => {
                                        setColorChangeModalStatus(true);


                                    }}
                                >색상 선택 완료
                                </button> : <></>
                        }
                    </div>
                    {
                        (!productCount?.changeNickname > 0) && (!productCount?.changeNicknameColor > 0) ?
                            <span style={{ color: 'red' }}>닉네임 변경 및 색상 변경은 상점에서 구매 후 이용 가능합니다.</span> :
                            !productCount?.changeNickname > 0 ?
                                <span style={{ color: 'red' }}>닉네임 변경은 상점에서 구매 후 이용 가능합니다.</span> :
                                !productCount?.changeNicknameColor > 0 &&
                                <span style={{ color: 'red' }}>닉네임 색상 변경은 상점에서 구매 후 이용 가능합니다.</span>
                    }
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
                                readOnly={true}
                                style={{
                                    backgroundColor: true ? "#e9e6e6f5" : "white"  // readOnly 상태에 따라 배경색 변경
                                }}
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
                        onClick={async (e) => {


                            e.preventDefault();
                            let loginInfo = getLoginInfo();
                            const userId = loginInfo.userId;
                            const loginId = loginInfo.loginId;
                            let defaultImg;
                            if(profileImage=="/img/default.png"){
                                defaultImg = "http://211.188.63.26:7777/profileImages/default.png"
                            }else{
                                defaultImg=profileImage
                            }
                            let 전송할객체 = {


                                userId: userId,
                                userName: userName,
                                userNickname: userNickname,
                                loginId: loginId,
                                email: email,
                                phoneNum: phoneNum,
                                birthday: birthday,
                                profileImage: defaultImg,

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
                                    // deleteProduct()
                                    if (changeNiname) {
                                        deleteProduct("닉네임 변경");
                                    }
                                    if (changeProfileImage) {
                                        deleteProduct("프로필 사진 변경");
                                    }
                                    let data = response.data.userResponseDTO;
                                    let loginInfo = { data };
                                    console.debug('asdfasdf', loginInfo);
                                    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
                                    alert("회원정보가 수정되었습니다.")
                                    navigate(0);
                                    // window.location.href = '/personal/EditProfilePage';

                                }
                            }
                            catch (e) {

                            }

                        }
                        }

                    >확인</button>
                    <button onClick={() => navigate('/personal')} className={styles.FullButton}>취소</button>
                    <button onClick={() => {
                        localStorage.removeItem('loginInfo');
                        chatLogout();
                        // alert("로그아웃 되었습니다.");                 
                        // navigate('/');
                        window.location.href = '/';
                        showLogoutToast();  // 로그아웃 토스트 실행
                    }

                    } className={styles.FullButton}>로그아웃</button>
                </form>
            </main>
            <br /><br />

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
                fetchNameColor={fetchNameColor}
                nickNameColor={nickNameColor}
                deleteProduct={deleteProduct}
            />


        </div>
    );
};

export default EditProfilePage;
