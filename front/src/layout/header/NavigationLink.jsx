// src/components/NavigationLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationLink = ({ text, href }) => {
  return (
    <StyledLink to={href}>
      {text}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 10px;
  &:hover {
    color: #0073e6;
  }
`;

export default NavigationLink;
