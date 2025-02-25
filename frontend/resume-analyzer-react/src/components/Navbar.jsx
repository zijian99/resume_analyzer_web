import React from 'react'
import { Logo } from './Logo'
import { NavbarWrapper, NavLinkWrapper, StyledNavLink } from '../styles/Navbar.styled'
import { useState } from 'react'

const Navbar = () => {
  const [active, setActive] = useState(false);
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
      page:"Login",
      href:"/login",
    }
  ]

  return (
    <NavbarWrapper>
      <Logo path="/"/> 
      {/* <StyledFontAwesomeIcon icon={faBars} onClick={() => setActive(!active)} /> */}
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