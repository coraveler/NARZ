import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ImageOverlay = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const canvasRef = useRef(null);
  const chungbuk = "/img/map/chungbuk.png";
  const chungnam = "/img/map/chungnam.png";
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

  const drawImages = (imgSrc1, imgSrc2) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mapImg1 = new Image();
    mapImg1.src = imgSrc1;
    mapImg1.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
      ctx.drawImage(mapImg1, 100, 100, canvas.width, canvas.height);

      const mapImg2 = new Image();
      mapImg2.src = imgSrc2;
      mapImg2.onload = () => {
        ctx.globalCompositeOperation = "source-atop"; // 비트 연산 설정
        ctx.drawImage(mapImg2, 0, 0, canvas.width, canvas.height);
      };
    };
  };

  useEffect(() => {
    drawImages(chungbuk, chungnam); // 기본 이미지 그리기
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      drawImages(chungbuk, uploadedImage); // 업로드한 이미지가 변경될 때 다시 그리기
    }
  }, [uploadedImage]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 클릭한 위치에 따라 어떤 이미지가 클릭되었는지 판단
    console.log(`Clicked at: ${x}, ${y}`);
    // 예시: 특정 영역을 클릭했을 때의 로직 추가 가능
  };

  return (
    <Container>
      <Canvas
        ref={canvasRef}
        width={600}
        height={1500}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)} // 마우스 진입 시
        onMouseLeave={() => setIsHovered(false)} // 마우스 이탈 시
        onClick={handleCanvasClick} // 캔버스 클릭 이벤트
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
