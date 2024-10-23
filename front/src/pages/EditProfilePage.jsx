import React, { useState } from "react";
import styles from '../css/EditProfilePage.module.css';
import ProfileCard from "../Includes/personalPage/ProfileCard";

const EditProfilePage = ({ selectedBadge }) => {
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

    return (
        <div className={styles.ProfileContainer}>
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            <main className={styles.mainContainer}>
                <div className={styles.ImageContainer}>
                    <img src={profileImage} alt="Profile" />
                    <div className={styles.ButtonGroup}>
                        <label className={styles.AutoButton}>
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
                            className={styles.AutoButton}
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
                                value={"비빔대왕"}
                                readOnly
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
                                value={"Value"}
                                readOnly
                            />
                            <button className={styles.AutoButton}>색상 랜덤 뽑기</button>
                        </div>
                    </div>

                    <div className={styles.FieldWrapper}>
                        <label htmlFor={"Email"}>{"Email"}</label>
                        <div className={styles.InputContainer}>
                            <input
                                className={styles.Input}
                                type="text"
                                id={"Email"}
                                name={"Email"}
                                value={"Value"}
                                readOnly
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
                                value={"Value"}
                                readOnly
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
                                value={"Value"}
                                readOnly
                            />
                        </div>
                    </div>

                    <button className={styles.FullButton}>비밀번호 재설정</button>
                    <button className={styles.FullButton}>확인</button>
                    <button className={styles.FullButton}>취소</button>
                </form>
            </main>
        </div>
    );
};

export default EditProfilePage;
