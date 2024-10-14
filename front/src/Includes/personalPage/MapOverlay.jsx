import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ImageOverlay = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const canvasRef = useRef(null);
  const mapImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/3919a1a9b29a027e3701c2c3103ea5719cb1d9a801750dffbfaae280e0affd2c?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"; // 지도 이미지 URL
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = (imgSrc) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mapImg = new Image();
    mapImg.src = imgSrc;
    mapImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
      ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);

      if (uploadedImage) {
        const overlayImg = new Image();
        overlayImg.src = uploadedImage;
        overlayImg.onload = () => {
          ctx.globalCompositeOperation = "source-atop"; // 비트 연산 설정
          ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
        };
      }
    };
  };

  useEffect(() => {
    drawImage(mapImage); // 컴포넌트가 마운트될 때 초기 이미지 그리기
  }, [mapImage]);

  useEffect(() => {
    if (uploadedImage) {
      drawImage(mapImage); // 업로드한 이미지가 변경될 때 다시 그리기
    }
  }, [uploadedImage]);

  return (
    <Container>
      <Canvas
        ref={canvasRef}
        width={400}
        height={300}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)} // 마우스 진입 시
        onMouseLeave={() => setIsHovered(false)} // 마우스 이탈 시
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Canvas = styled.canvas`
  border: none; /* 테두리 없애기 */
  display: block; /* 블록 요소로 설정 */
  width: ${(props) => (props.isHovered ? "420px" : "400px")}; /* 호버 시 크기 변경 */
  height: ${(props) => (props.isHovered ? "315px" : "300px")}; /* 호버 시 크기 변경 */
  transition: width 0.3s ease, height 0.3s ease; /* 부드러운 전환 */
`;

export default ImageOverlay;
