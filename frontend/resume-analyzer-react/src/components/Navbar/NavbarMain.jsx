import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Logo } from './Logo';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STYLES

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
  display: flex;
  align-items: center;
  

  @media (max-width: 704px) {
    display: ${(props) => (props.active ? "block" : "none")};
    text-align: center;
    padding: 2rem 0;
  }
`;

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
    color: #5f30e2;
  }

  &:hover {
    color: #5f30e2;
  }

  @media (max-width: 704px) {
    display: block;
    margin: 2rem auto;
  }
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DROPDOWN WITH ANIMATION

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 2rem;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  color: black;

  &:hover {
    color: #5f30e2;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0.5rem 0;
  min-width: 200px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translate(-50%, ${(props) => (props.isOpen ? "5px" : "0px")});
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: black;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #5f30e2;
  }
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const link = [
  {
    page:"Resume Analysis",
    href:"/resumeanalyzer",
  },
  {
    page:"Spelling & Grammar Checking",
    href:"/grammarchecker",
  },

];

const dropdownLinks = [
  {
    page: "Profile",
    href: "/profile",
  },
  {
    page: "Settings",
    href: "/settings",
  },
  {
    page: "Help",
    href: "/help",
  }
];

const NavbarMain = () => {
  const [active, setActive] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <NavbarWrapper>
      <Logo path="/home"/> 

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

        {/* DROPDOWN MENU (Placed in between) */}
        <DropdownContainer>
          <DropdownButton onClick={() => setDropdownOpen(!isDropdownOpen)}>
            More ▼
          </DropdownButton>
          <DropdownMenu isOpen={isDropdownOpen}>
            {dropdownLinks.map((link) => (
              <DropdownItem key={link.page} to={link.href}>
                {link.page}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>

        {/* Last Link - LogOut */}
        <StyledNavLink
          activeclassname="active"
          to="/"
        >
          LogOut
        </StyledNavLink>

        
      </NavLinkWrapper>
    </NavbarWrapper>
  );
};

export default NavbarMain;
