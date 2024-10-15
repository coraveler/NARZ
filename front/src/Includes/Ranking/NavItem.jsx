import React from "react";
import styled from "styled-components";

function NavItem({ text, isActive }) {
  return (
    <ListItem>
      <NavLink href="#" $isActive={isActive}>
        {text}
      </NavLink>
    </ListItem>
  );
}

const ListItem = styled.li`
  align-self: stretch;
`;

const NavLink = styled.a`
  color: ${props => props.$isActive ? "#333" : "#666"};
  letter-spacing: -0.48px;
  display: inline-block;
  padding: 25px 2px;
  font: ${props => props.$isActive ? "700 15px/1.2 Inter, sans-serif" : "400 15px/1.2 Inter, sans-serif"};
  text-decoration: none;
  
  &:hover, &:focus {
    text-decoration: underline;
  }
`;

export default NavItem;