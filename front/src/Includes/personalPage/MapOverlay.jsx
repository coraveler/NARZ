import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from '../../api/axios';

const ImageOverlay = () => {
// const [isUploading, setIsUploading] = useState(false); // 상태 추가
const canvasRef = useRef(null);
const fileInputRef = useRef(null);
const [images, setImages] = useState([]);
const userId = 0;

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

// const userMap = (images) => {
//     const updatedImageUrls = { ...imageUrls };

//     images.forEach((image) => {
//         const imageName = image.split('/').pop().split('.')[0]; // 파일 이름 추출
//         if (defaultImageUrls[imageName]) {
//             updatedImageUrls[imageName] = image; // 새로운 URL로 업데이트
//         }
//     });

//     setImageUrls(updatedImageUrls);
// };

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
    } catch (error) {
        console.error("Error loading images:", error);
        alert("이미지를 불러오는 데 실패했습니다.");
    }
};

// const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     console.log("File selected:", file); 
//     if (file) {
//         console.log("bbbbbbb");
//         const newImageUrl = URL.createObjectURL(file);
//         const key = fileInputRef.current.getAttribute("data-key");
//         const processedImageUrl = await processImage(key, newImageUrl);
//         console.log("Processed image URL:", processedImageUrl);

        
//         // 서버에 최종 이미지 업로드
//         await uploadProcessedImage(processedImageUrl, key);
        
//         // 파일 입력을 초기화하여 같은 파일을 다시 선택할 수 있도록 설정
//         fileInputRef.current.value = null;
//     }
// };

const handleImageClick = (key) => {
    if (fileInputRef.current) {
        fileInputRef.current.setAttribute("data-key", key);
        fileInputRef.current.click();
        console.log(key);
    }
};

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file); 
    if (file) {
        console.log("file is ture");
        const newImageUrl = URL.createObjectURL(file);
        const key = fileInputRef.current.getAttribute("data-key");
        
        // setIsUploading(true);

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
            // setIsUploading(false);
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
    formData.append("userId", userId); // id_no를 변수로 사용
    formData.append("file", dataURItoBlob(processedImageUrl));
    formData.append("local", key);

    try {
        const response = await api.post(`map/upload`, formData);
        if (response.status === 200) {
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
          
           
              <Canvas ref={canvasRef}  />
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

