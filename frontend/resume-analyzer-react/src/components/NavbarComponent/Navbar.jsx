import React from 'react'
import { Logo } from './Logo'
//import { NavbarWrapper, NavLinkWrapper, StyledNavLink } from '../styles/Navbar.styled'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import styled from "styled-components";
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTAINER

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;

  z-index: 1000;
  width: 100vw;
  top: 0;
  box-sizing: border-box;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  background: white;
  
  padding: 1rem 3rem;

  @media (max-width: 704px) {
    flex-direction: column;

    padding: 1rem;
  }
  
`;

const NavLinkWrapper = styled.div`
  @media (max-width: 704px) {
    display: ${(props) => (props.active ? "block" : "none")};

    text-align: center;

    padding: 2rem 0;
  }
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPONENT

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;

  color: black;

  transition: 0.2s;
  margin-left: 2rem;

  &:last-child {
    border-radius: 10px;

    background: #5f30e2;
    color: white;

    padding: 0.5rem 1rem;

    &:hover {
      color: white;
      opacity: 0.8;
    }
  }

  &.${(props) => props.activeclassname} {
    // color: #007dfc;
    // color: #3cc9b4;
    color: #5f30e2;
  }

  &:hover {
    // color: #007dfc;
    // color: #3cc9b4;
    color: #5f30e2;
  }

  @media (max-width: 704px) {
    display: block;

    margin: 2rem auto;
  }
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const link = [
  {
    page:"Pricing",
    href:"/pricing",
  },
  {
    page:"About",
    href:"/about",
  },
  {
    page:"Login To Resume Analyzer",
    href:"/login",
  }
]

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <NavbarWrapper>
      <Logo path="/"/> 

      <NavLinkWrapper active={active}>
        {link.map((link) => (
          <StyledNavLink
            activeclassname="active"
            key={link.page}
            to={link.href}
          >
            {link.page}
          </StyledNavLink>
        ))}
      </NavLinkWrapper>

    </NavbarWrapper>
  )
}

export default Navbar