import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { AccountContext } from "./AccountContext";
import { RegisterForm } from "./RegisterForm";



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTAINER

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  min-width: 50%;
  min-height: 90vh;
  height: 90vh;
  box-sizing: border-box;
  
  // background-color: grey;
  border-radius: 19px;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  
  padding: 2em 4em;
  margin: 0.5em;

  overflow: hidden;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;
  // height: 250px;
  box-sizing: border-box;
  
  // background-color: red;

  // padding: 0 3em;
  // padding-bottom: 5em;
  margin-top: 2em;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  box-sizing: border-box;
  
  // background-color:black;

  padding: 2em 0;
  // margin: 1em 1em;
  
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPONENT

const HeaderText = styled.h2`
  z-index: 10;

  line-height: 1.24;
  font-size: 35px;
  font-weight: 600;
  
  // color: #fff;
  // color:black;
  color: white;
  
  margin: 0;
`;

const SmallText = styled.h5`
  z-index: 10;

  font-weight: 600;
  font-size: 14px;

  // color: #fff;
  color: white;
  
  margin: 0;
  margin-top: 1.5em;
`;

const Span = styled.span`
  display: flex;
  align-items: center;

  margin: 0 0.5em;
`;




const NavigateHomeButton = styled(NavLink)`
  // Ensures the text stays in one line
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  white-space: nowrap; /* Prevents text wrapping */
    
  // Gives spacing 
  padding: 0.5em 1em; 
  // Make sure it stay on top of BackDrop
  z-index: 10;

  border-radius: 5px; 
  border: 2px solid white;
  // background-color: lightgray; 
  color: white;

  // Removes underline 
  text-decoration: none; 
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
  }
`;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKDROP ANIMATION

const BackDrop = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 120%;
  height: 40%;
  
  // Manual Adjustment of Position of BackDrop
  // transform: rotate(60deg);
  top: -80px;
  right: -80px;
  // left: 2px;
  
  border-radius: 20%;

  // background: rgb(241, 196, 15);
  background: rgba(93, 47, 194, 1);
  background: linear-gradient(
    58deg,
    rgba(93, 47, 194, 1) 20%,
    rgba(93, 27, 194, 1) 100%
  );
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    // borderRadius: "20%",
    // transform: "rotate(60deg)",
  },
  collapsed: {
    width: "120%",
    height: "40%",
    // borderRadius: "50%",
    // transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  
  // Function for Animation when changing Login and Register Form
  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  // Must be put after function is initialized
  const contextValue = { switchToSignup, switchToSignin };
  

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>

        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
          <NavigateHomeButton to="/">
            <SlArrowLeft/>
            <Span>Back to Home</Span>
          </NavigateHomeButton>
        </TopContainer>

        
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <RegisterForm />}
        </InnerContainer>
      
      </BoxContainer>
    </AccountContext.Provider>
  );
}
