// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ClickableImg = styled(NavLink)`
  align-self: start;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  width: 5%; 
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
    @media (max-width: 704px) {
    display: block;
    margin: 2rem auto;
  }
`;

const NavbarWrapper = styled.nav`
  position: sticky;
  top: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 3rem;

  z-index: 1000;
  @media (max-width: 704px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

// const NavbarWrapper = styled.nav`
//   position: fixed; 
//   top: 0;
//   left: 0;
//   width: 100%;
//   background: white;
//   box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 3rem;
//   z-index: 1000; /* Ensure it stays on top */
// `;

const NavLinkWrapper = styled.div`
  @media (max-width: 704px) {
    display: ${(props) => (props.active ? "block" : "none")};
    text-align: center;
    padding: 2rem 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  transition: 0.2s;
  color: black;
  
  margin-left: 2rem;
  &:last-child {
    background: #007dfc;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    &:hover {
      color: white;
    }
    &.${(props) => props.activeclassname} {
      color: white;
    }
  }

  &.${(props) => props.activeclassname} {
    color: #007dfc;
  }

  &:hover {
    color: #007dfc;
  }

  @media (max-width: 704px) {
    display: block;
    margin: 2rem auto;
  }
`;

// const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
//   display: none;
//   position: absolute;
//   right: 20px;
//   top: 21px;
//   color: white;
//   font-size: 1.8rem;
//   cursor: pointer;
//   @media (max-width: 704px){
//     display: block;
//   }
//   };
// `;
 

export {
    ClickableImg,
    NavbarWrapper,
    NavLinkWrapper,
    StyledNavLink,
    // StyledFontAwesomeIcon,
  };