import React from "react";
import styled from "styled-components";

const NavigationLink = ({ text, href }) => {
  return <StyledLink href={href}>{text}</StyledLink>;
};

const StyledLink = styled.a`
  align-self: stretch;
  color: #000;
  font-weight: 700;
  width: 100px;
  margin: auto 0;
  padding: 36px 0px;
  text-decoration: none;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 10px;
  }
`;

export default NavigationLink;