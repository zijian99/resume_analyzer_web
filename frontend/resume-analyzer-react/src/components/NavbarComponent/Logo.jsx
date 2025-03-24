import React from "react";
// import { ClickableImg } from "../../styles/Navbar.styled";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoipsum-338.svg";

const ClickableImg = styled(NavLink)`
  display: flex;
  align-items: center;
  align-self: start;
  justify-content: center;

  width: 5%; 
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;

  color: inherit;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 704px) {
    display: block;
    margin: 2rem auto;
  }
`;

export const Logo = ({path}) => {
    return( 
    <ClickableImg to={path}>
        <img src={logo} alt="logo" />
        Resume Analyzer
    </ClickableImg>
    );
};