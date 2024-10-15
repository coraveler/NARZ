import React, { useRef, useState } from "react";
import styled from "styled-components";

const ImageOverlay = () => {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

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

    const handleImageClick = (key) => {
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute("data-key", key); // 클릭한 이미지의 키를 저장
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            processImage(fileInputRef.current.getAttribute("data-key"), newImageUrl);
        }
    };

    

    const processImage = (key, newImageUrl) => {
        const imgToReplace = new window.Image();
        imgToReplace.src = imageUrls[key];
    
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
    
            // 기존 이미지의 그려진 크기 가져오기
            const imgWidth = canvas.width; // 캔버스 너비
            const imgHeight = canvas.height; // 캔버스 높이
            console.log(imageUrls[key]);
    
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
    
                    if (r <= 200 || g <= 200 || b <= 200) {
                        originalPixels[i] = overlayPixels[i];
                        originalPixels[i + 1] = overlayPixels[i + 1];
                        originalPixels[i + 2] = overlayPixels[i + 2];
                    }
                }
    
                ctx.putImageData(originalData, 0, 0);
    
                const processedImageUrl = canvas.toDataURL();
                setImageUrls((prev) => ({
                    ...prev,
                    [key]: processedImageUrl, // 해당 이미지 업데이트
                }));
            };
        };
    };
    
           
    // const processImage = (key, newImageUrl) => {
    //     const imgToReplace = new window.Image();
    //     imgToReplace.src = imageUrls[key];

    //     const imgUploaded = new window.Image();
    //     imgUploaded.src = newImageUrl;

    //     imgToReplace.onload = () => {
    //         const canvas = canvasRef.current;
    //         if (!canvas) {
    //             console.error("Canvas is not available.");
    //             return;
    //         }
    //         const ctx = canvas.getContext("2d");

    //         // 기존 이미지를 캔버스에 그립니다.
    //         ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    //         ctx.drawImage(imgToReplace, 0, 0, canvas.width, canvas.height);

    //         imgUploaded.onload = () => {
    //             const overlayCanvas = document.createElement("canvas");
    //             const overlayCtx = overlayCanvas.getContext("2d");
    //             overlayCanvas.width = canvas.width;
    //             overlayCanvas.height = canvas.height;

    //             overlayCtx.drawImage(imgUploaded, 0, 0, overlayCanvas.width, overlayCanvas.height);
    //             const overlayData = overlayCtx.getImageData(0, 0, overlayCanvas.width, overlayCanvas.height);
    //             const overlayPixels = overlayData.data;

    //             const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //             const originalPixels = originalData.data;

    //             // 픽셀 데이터를 처리하여 흰색이 아닌 부분만 대체합니다.
    //             for (let i = 0; i < originalPixels.length; i += 4) {
    //                 const r = originalPixels[i];
    //                 const g = originalPixels[i + 1];
    //                 const b = originalPixels[i + 2];

    //                 if (r <= 200 || g <= 200 || b <= 200) {
    //                     originalPixels[i] = overlayPixels[i];
    //                     originalPixels[i + 1] = overlayPixels[i + 1];
    //                     originalPixels[i + 2] = overlayPixels[i + 2];
    //                     // originalPixels[i + 3] = 255; // Opaque
    //                 } 
    //             }

    //             ctx.putImageData(originalData, 0, 0);

    //             const processedImageUrl = canvas.toDataURL();
    //             setImageUrls((prev) => ({
    //                 ...prev,
    //                 [key]: processedImageUrl, // 해당 이미지 업데이트
    //             }));
    //         };

     
    //     };
    // };

    return (
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
      
    );
};

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
    height: 1000px; /* 고정된 높이 설정 */
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
    top: 170px; /* 픽셀 단위로 위치 설정 */
    left: 35%; 
    width: 167px;
    height: 196px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageGangwon = styled(Image)`
    top: 113px; /* 픽셀 단위로 위치 설정 */
    left: 50.1%;
    width: 280px;
    height: 231px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageChungbuk = styled(Image)`
    top: 312px; /* 픽셀 단위로 위치 설정 */
    left: 47.3%;
    width: 152px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

const ImageChungnam = styled(Image)`
    top: 350px; /* 픽셀 단위로 위치 설정 */
    left: 32%;
    width: 180px;
    height : 153px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageDaejeon = styled(Image)`
    top: 425px; /* 픽셀 단위로 위치 설정 */
    left: 40%;
    width: 34px;
    height: 45px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

const ImageGyeonbuk = styled(Image)`
    top: 308px; /* 픽셀 단위로 위치 설정 */
    left: 58.9%;
    width: 198px;
    height: 245px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageJeonbuk = styled(Image)`
    top: 477px; /* 픽셀 단위로 위치 설정 */
    left: 36.4%;
    width: 170px;
    height: 125px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageGyeongnam = styled(Image)`
    top: 510px; /* 픽셀 단위로 위치 설정 */
    left: 56.2%;
    width: 215px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 100% 120%;
`;

const ImageJeonnam = styled(Image)`
    top: 576px; /* 픽셀 단위로 위치 설정 */
    left: 34.7%;
    width: 190px;
    height: 180px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 500% 150%;
`;

const ImageJeju = styled(Image)`
    top: 800px; /* 픽셀 단위로 위치 설정 */
    left: 34%;
    width: 100px;
    height : 70px;
    transform: translate(-50%, 0); /* 수평 중앙 정렬 */
    transform-origin: 200% 100%;
`;

export default ImageOverlay;
