// src/components/NavigationLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// 글로벌 스타일로 폰트 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GumiRomanceTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/GumiRomanceTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

const NavigationLink = ({ text, href }) => {
  return (
    <>
      <GlobalStyle />
      <StyledLink to={href}>
        {text}
      </StyledLink>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #444444;
  margin-right: 40px;
  font-size: 17px;

  &:hover {
    color: #0073e6;
  }
  font-family: 'GumiRomanceTTF'; // 주의: 여기에 따옴표 추가
`;

export default NavigationLink;
