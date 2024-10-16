import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import api from '../../api/axios';

const ImageOverlay = () => {
const canvasRef = useRef(null);
const fileInputRef = useRef(null);
const [images, setImages] = useState([]);
const id_no = 0;


const [imageUrls, setImageUrls] = useState({
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
});

const [defaultEmageUrls, setDefaultEmageUrls] = useState({
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
});

useEffect(() => {
    fetchImages();
    
}, []);

useEffect(() => {
    // console.log(images[0]);
    userMap(images);
}, [images]);


const userMap = (images) => {
    // 이미지 URL을 이름으로 매핑하여 업데이트
    const updatedImageUrls = { ...imageUrls };

    // 이미지 이름을 추출하여 비교
    const imageNamesFromUrls = Object.keys(imageUrls);

    images.forEach((image) => {
        const fullImageName = image.split('/').pop(); // 예: "daejeon.png"
    const imageName = fullImageName.substring(0, fullImageName.lastIndexOf('.'));

        // imageUrls의 키와 비교하여 겹치는 경우 업데이트
        if (imageNamesFromUrls.includes(imageName)) {
            
            updatedImageUrls[imageName] = image; // 새로운 URL로 업데이트
        }
    });

    console.log(updatedImageUrls);
    setImageUrls(updatedImageUrls); // 상태 업데이트
};

const fetchImages = async () => {
    try {
        const response = await api.get(`map/load/${id_no}`);
        console.log("Fetched images:", response.data);
        setImages(response.data); // 이미지 경로 리스트 설정
    } catch (error) {
        console.error("Error loading images:", error);
        alert("이미지를 불러오는 데 실패했습니다.");
    }
};


const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const newImageUrl = URL.createObjectURL(file);
        const key = fileInputRef.current.getAttribute("data-key");
        // 비트 연산 후 이미지 처리
        const processedImageUrl = await processImage(key, newImageUrl);

        // 최종 비트 연산 후 이미지를 서버에 전송
        await uploadProcessedImage(processedImageUrl, key);
    }
};


const handleImageClick = (key) => {
    if (fileInputRef.current) {
        fileInputRef.current.setAttribute("data-key", key); // 클릭한 이미지의 키를 저장
        fileInputRef.current.click();
    }
};


const processImage = (key, newImageUrl) => {
    return new Promise((resolve) => {
        const imgToReplace = new window.Image();
        imgToReplace.src = defaultEmageUrls[key];

        const imgUploaded = new window.Image();
        imgUploaded.src = newImageUrl;

        imgToReplace.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                console.error("Canvas is not available.");
                return;
            }
            const ctx = canvas.getContext("2d", { willReadFrequently: true });

            // 기존 이미지를 캔버스에 그립니다.
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
            ctx.drawImage(imgToReplace, 0, 0, canvas.width, canvas.height);

            const imgWidth = canvas.width; // 캔버스 너비
            const imgHeight = canvas.height; // 캔버스 높이

            imgUploaded.onload = () => {
                const overlayCanvas = document.createElement("canvas");
                const overlayCtx = overlayCanvas.getContext("2d");
                overlayCanvas.width = imgWidth; // 기존 이미지 크기와 동일하게 설정
                overlayCanvas.height = imgHeight; // 기존 이미지 크기와 동일하게 설정

                // 업로드한 이미지를 기존 이미지의 크기로 그립니다.
                overlayCtx.drawImage(imgUploaded, 0, 0, imgWidth, imgHeight);
                const overlayData = overlayCtx.getImageData(0, 0, overlayCanvas.width, overlayCanvas.height);
                const overlayPixels = overlayData.data;

                const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const originalPixels = originalData.data;

                // 픽셀 데이터를 처리하여 흰색이 아닌 부분만 대체합니다.
                for (let i = 0; i < originalPixels.length; i += 4) {
                    const r = originalPixels[i];
                    const g = originalPixels[i + 1];
                    const b = originalPixels[i + 2];

                    // 조건에 맞는 픽셀만 대체
                    if (r <= 200 || g <= 200 || b <= 200) {
                        originalPixels[i] = overlayPixels[i];        // R
                        originalPixels[i + 1] = overlayPixels[i + 1]; // G
                        originalPixels[i + 2] = overlayPixels[i + 2]; // B
                    }
                }

                ctx.putImageData(originalData, 0, 0);

                // 최종 이미지를 URL로 변환
                const processedImageUrl = canvas.toDataURL();

                setImageUrls((prev) => ({
                    ...prev,
                    [key]: processedImageUrl, // 해당 이미지 업데이트
                }));

                // 비트 연산 후 최종 이미지 URL을 반환
                resolve(processedImageUrl);
            };

            imgUploaded.onerror = () => {
                console.error("Error loading uploaded image.");
                alert("업로드된 이미지를 불러오는 데 실패했습니다.");
                resolve(null); // 에러 시 null 반환
            };
        };

        imgToReplace.onerror = () => {
            console.error("Error loading image to replace.");
            alert("대체 이미지를 불러오는 데 실패했습니다.");
            resolve(null); // 에러 시 null 반환
        };
    });
};

// 최종 이미지를 서버에 전송하는 함수
const uploadProcessedImage = async (processedImageUrl, key) => {
    if (!processedImageUrl) {
        console.error("No processed image to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("id_no", 0);
    formData.append("file", dataURItoBlob(processedImageUrl)); // 데이터 URL을 Blob으로 변환
    formData.append("local", key);

    try {
        const response = await api.post(`map/upload`, formData); // 적절한 URL로 변경
        if (response.status === 200) {
            console.log("Processed image uploaded successfully.");
        } else {
            console.error("Processed image upload failed.");
        }
    } catch (error) {
        console.error("Error uploading processed image:", error);
    }
};


// 데이터 URL을 Blob으로 변환하는 함수
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
            <ImageSudo onClick={() => handleImageClick("sudo")} src={imageUrls.sudo} alt="Sudo" />
            <ImageGangwon onClick={() => handleImageClick("gangwon")} src={imageUrls.gangwon} alt="Gangwon" />
            <ImageChungbuk onClick={() => handleImageClick("chungbuk")} src={imageUrls.chungbuk} alt="Chungbuk" />
            <ImageChungnam onClick={() => handleImageClick("chungnam")} src={imageUrls.chungnam} alt="Chungnam" />
            <ImageDaejeon onClick={() => handleImageClick("daejeon")} src={imageUrls.daejeon} alt="Daejeon" />
            <ImageGyeonbuk onClick={() => handleImageClick("gyeonbuk")} src={imageUrls.gyeonbuk} alt="Gyeonbuk" />
            <ImageJeonbuk onClick={() => handleImageClick("jeonbuk")} src={imageUrls.jeonbuk} alt="Jeonbuk" />
            <ImageGyeongnam onClick={() => handleImageClick("gyeongnam")} src={imageUrls.gyeongnam} alt="Gyeongnam" />
            <ImageJeonnam onClick={() => handleImageClick("jeonnam")} src={imageUrls.jeonnam} alt="Jeonnam" />
            <ImageJeju onClick={() => handleImageClick("jeju")} src={imageUrls.jeju} alt="Jeju" />
            <Canvas ref={canvasRef} width={800} height={600} />
        </Container>
       
     </div>
    );
}

const Canvas = styled.canvas`
    display: none;
`;


const HiddenFileInput = styled.input`
    display: none; /* 파일 입력 숨기기 */
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
