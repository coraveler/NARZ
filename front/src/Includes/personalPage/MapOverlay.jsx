import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from '../../api/axios';

import { getLoginInfo } from "../../Includes/common/CommonUtil";
import { checkMapCompletion } from "../../api/achievementService";
import { LiaSyncSolid } from "react-icons/lia";

const ImageOverlay = ({ userId, handleRefreshMileage }) => {
    // const [isUploading, setIsUploading] = useState(false); // 상태 추가
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [userMileage, setUserMileage] = useState(null);
    let loginInfo = getLoginInfo();
    const loginUserId = loginInfo?.userId || null;


    // 초기 이미지 URL 설정
    const defaultImageUrls = {
        sudo: "/img/map/sudo.png",
        gangwon: "/img/map/gangwon.png",
        chungbuk: "/img/map/chungbuk.png",
        chungnam: "/img/map/chungnam.png",
        daejeon: "/img/map/daejeon.png",
        gyeonbuk: "/img/map/gyeonbuk.png",
        jeonbuk: "/img/map/jeonbuk.png",
        gyeongnam: "/img/map/gyeongnam.png",
        jeonnam: "/img/map/jeonnam.png",
        jeju: "/img/map/jeju.png",
    };

    const [imageUrls, setImageUrls] = useState(defaultImageUrls);

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        userMap(images);
    }, [images]);


    const userMap = (images) => {
        const updatedImageUrls = { ...imageUrls };

        images.forEach((image) => {
            const imageName = image.split('/').pop().split('.')[0]; // 파일 이름 추출
            if (defaultImageUrls[imageName]) {
                updatedImageUrls[imageName] = image; // 새로운 URL로 업데이트
            }
        });

        // 모든 업데이트가 완료된 후 한 번만 상태를 업데이트
        setImageUrls(updatedImageUrls);
    };

    const fetchImages = async () => {
        try {
            const response = await api.get(`map/load/${userId}`);
            setImages(response.data);
            checkMapCompletion(userId); // 칭호 조건 완료되었는지 확인
        } catch (error) {
            console.error("Error loading images:", error);
            alert("이미지를 불러오는 데 실패했습니다.");
        }
    };

    const getUserLocalLikeCount = async (local) => {
        try {
            const response = await api.get(`map/localLikeCount`, {
                params: {
                    local: local,
                    userId: userId
                }
            });
            console.log(response.data);
            // setLikeCount(response.data);
            return response.data; // likeCount를 반환
        } catch (error) {
            console.error(error);
            return 0; // 에러 발생 시 기본값 0 반환
        }
    };

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


    const checkImageExistence = async (imageName) => {
        try {
            // HEAD 요청을 보내서 이미지가 있는지 확인
            const response = await api.head(`http://localhost:7777/map/img/${userId}/${imageName}.png`)
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    const handleImageClick = async (key) => {
        const count = await getUserLocalLikeCount(key); // likeCount를 비동기적으로 가져옴
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute("data-key", key);
            if (count >= 1) {

                console.log(await checkImageExistence(key));
                if (await checkImageExistence(key)) {
                    const userConfirmed = window.confirm("마일리지 500p 차감됩니다. 변경하시겠습니까?");
                    // 돈을 지불
                    if (userConfirmed) {
                        const state = await changePoints();
                        if (state) {
                            fileInputRef.current.click();
                        }else{alert("마일리지가 부족합니다.")}
                    }
                } else {
                    fileInputRef.current.click();
                }
            } else {
                fileInputRef.current.value = null; // 파일 입력 초기화
                alert("지도 이미지 업로드는 각 지역별 게시글 총 좋아요 10개 이상 누적되어야 가능합니다!!");
            }
            console.log(key);
        }
    };

    const changePoints = async () => {
        const mileagePoints = -500;
        const description = "지도 등록!";
        console.log(userMileage);
        if (userMileage > 500) {

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
                    handleRefreshMileage();
                    await fetchMileage();
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                alert("구매에 실패했습니다: " + error.message);
                return false;
            }
        }else{
            return false;
        }
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log("File selected:", file);
        if (file) {
            console.log("file is ture");
            const newImageUrl = URL.createObjectURL(file);
            const key = fileInputRef.current.getAttribute("data-key");

            try {
                console.log("try is run");
                const processedImageUrl = await processImage(key, newImageUrl);
                console.log("processImage run");
                await uploadProcessedImage(processedImageUrl, key);
                console.log("Processed image URL:", processedImageUrl);
            } catch (error) {
                console.error("Error processing or uploading image:", error);
            }
            finally {
                fileInputRef.current.value = null; // 파일 입력 초기화
            }
        }
    };



    const processImage = (key, newImageUrl) => {
        console.log("Starting image processing...");
        return new Promise((resolve, reject) => {
            const imgToReplace = new window.Image();
            imgToReplace.src = defaultImageUrls[key];

            const imgUploaded = new window.Image();
            // imgUploaded.src = newImageUrl;

            console.log("New image URL:", newImageUrl);

            imgToReplace.onload = () => {
                console.log("start ToReplace image loaded.");
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                console.log("step1");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgToReplace, 0, 0, canvas.width, canvas.height);
                console.log("step2");

                imgUploaded.onload = () => {
                    console.log("Uploaded image loaded.");
                    const overlayCanvas = document.createElement("canvas");
                    overlayCanvas.width = canvas.width;
                    overlayCanvas.height = canvas.height;
                    const overlayCtx = overlayCanvas.getContext("2d");
                    overlayCtx.drawImage(imgUploaded, 0, 0, canvas.width, canvas.height);

                    const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const overlayData = overlayCtx.getImageData(0, 0, overlayCanvas.width, overlayCanvas.height);

                    // 픽셀 데이터 처리
                    const originalPixels = originalData.data;
                    const overlayPixels = overlayData.data;

                    for (let i = 0; i < originalPixels.length; i += 4) {
                        if (originalPixels[i] <= 200 || originalPixels[i + 1] <= 200 || originalPixels[i + 2] <= 200) {
                            originalPixels[i] = overlayPixels[i];
                            originalPixels[i + 1] = overlayPixels[i + 1];
                            originalPixels[i + 2] = overlayPixels[i + 2];
                        }
                    }

                    ctx.putImageData(originalData, 0, 0);
                    const processedImageUrl = canvas.toDataURL();
                    setImageUrls((prev) => ({
                        ...prev,
                        [key]: processedImageUrl,
                    }));

                    resolve(processedImageUrl);
                };
                imgUploaded.src = newImageUrl;
                imgUploaded.onerror = () => {
                    console.error("Error loading uploaded image.");
                    reject("Error loading uploaded image.");
                    // resolve(null);
                };
            };

            imgToReplace.onerror = () => {
                console.error("Error loading image to replace.");
                reject("Error loading uploaded image.");;
            };
        });
    };

    const uploadProcessedImage = async (processedImageUrl, key) => {
        if (!processedImageUrl) {
            console.error("No processed image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("file", dataURItoBlob(processedImageUrl));
        formData.append("local", key);

        try {
            const response = await api.post(`map/upload`, formData);
            if (response.status === 200) {
                fetchImages(); // 이미지 다시 가져오기
                console.log("Processed image uploaded successfully.");
            } else {
                console.error("Processed image upload failed.");
            }
        } catch (error) {
            console.error("Error uploading processed image:", error);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div>
            <Container>
                <HiddenFileInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />


                <Canvas ref={canvasRef} />
                <ImageSudo onClick={() => userId == loginUserId && handleImageClick("sudo")} src={imageUrls.sudo} alt="Sudo" />
                <ImageGangwon onClick={() => userId == loginUserId && handleImageClick("gangwon")} src={imageUrls.gangwon} alt="Gangwon" />
                <ImageChungbuk onClick={() => userId == loginUserId && handleImageClick("chungbuk")} src={imageUrls.chungbuk} alt="Chungbuk" />
                <ImageChungnam onClick={() => userId == loginUserId && handleImageClick("chungnam")} src={imageUrls.chungnam} alt="Chungnam" />
                <ImageDaejeon onClick={() => userId == loginUserId && handleImageClick("daejeon")} src={imageUrls.daejeon} alt="Daejeon" />
                <ImageGyeonbuk onClick={() => userId == loginUserId && handleImageClick("gyeonbuk")} src={imageUrls.gyeonbuk} alt="Gyeonbuk" />
                <ImageJeonbuk onClick={() => userId == loginUserId && handleImageClick("jeonbuk")} src={imageUrls.jeonbuk} alt="Jeonbuk" />
                <ImageGyeongnam onClick={() => userId == loginUserId && handleImageClick("gyeongnam")} src={imageUrls.gyeongnam} alt="Gyeongnam" />
                <ImageJeonnam onClick={() => userId == loginUserId && handleImageClick("jeonnam")} src={imageUrls.jeonnam} alt="Jeonnam" />
                <ImageJeju onClick={() => userId == loginUserId && handleImageClick("jeju")} src={imageUrls.jeju} alt="Jeju" />

            </Container>

        </div>
    );
}

const Canvas = styled.canvas`
    display: none;
`;


const HiddenFileInput = styled.input`
    display: none; /* 파일 입력 숨기기 */
    z-index : 11
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 900px; /* 고정된 높이 설정 */
    width: 800px; /* 고정된 너비 설정 */
    overflow: hidden; /* 넘치는 내용 숨기기 */
`;

const Image = styled.img`
    position: absolute;
    transition: transform 0.3s ease, z-index 0s 0.3s; /* 부드러운 크기 변화 효과 */
    
    
    &:hover {
        transform: scale(1.2); /* 마우스 오버 시 20% 확대 */
        z-index: 10; /* 커졌을 때 z-index 증가 */
        
    }
`;


const ImageSudo = styled(Image)`
    top: 100px; /* 픽셀 단위로 위치 설정 */
    left: 40%; 
    width: 167px;
    height: 196px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageGangwon = styled(Image)`
    top: 43px; /* 픽셀 단위로 위치 설정 */
    left: 55.1%;
    width: 280px;
    height: 231px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageChungbuk = styled(Image)`
    top: 242px; /* 픽셀 단위로 위치 설정 */
    left: 52.3%;
    width: 152px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

const ImageChungnam = styled(Image)`
    top: 280px; /* 픽셀 단위로 위치 설정 */
    left: 37%;
    width: 180px;
    height : 153px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageDaejeon = styled(Image)`
    top: 355px; /* 픽셀 단위로 위치 설정 */
    left: 45%;
    width: 34px;
    height: 45px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

const ImageGyeonbuk = styled(Image)`
    top: 238px; /* 픽셀 단위로 위치 설정 */
    left: 63.8%;
    width: 198px;
    height: 245px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageJeonbuk = styled(Image)`
    top: 407px; /* 픽셀 단위로 위치 설정 */
    left: 41.4%;
    width: 170px;
    height: 125px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageGyeongnam = styled(Image)`
    top: 440px; /* 픽셀 단위로 위치 설정 */
    left: 61.2%;
    width: 215px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageJeonnam = styled(Image)`
    top: 506px; /* 픽셀 단위로 위치 설정 */
    left: 39.7%;
    width: 190px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageJeju = styled(Image)`
    top: 730px; /* 픽셀 단위로 위치 설정 */
    left: 39%;
    width: 100px;
    height : 70px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

export default ImageOverlay;

