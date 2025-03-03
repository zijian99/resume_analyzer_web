import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./AccountContext";
import { RegisterForm } from "./RegisterForm";
import { NavLink } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const NavigateHomeButton = styled(NavLink)`
    display: flex; /* Ensures the text stays in one line */
    text-decoration: none; /* Optional: Removes underline */
    white-space: nowrap; /* Prevents text wrapping */
    padding: 0.5em 1em; /* Gives spacing */
    // background-color: lightgray; /* Optional: Makes it visible */
    border-radius: 5px; /* Optional: Makes it look nicer */
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    border: 2px solid white;
    z-index: 10;

    &:hover {
    opacity: 0.8;
  }
`;
const Span = styled.span`
  margin: 0 0.5em;
  display: flex;
  align-items: center;
`;


const BoxContainer = styled.div`
  min-width: 50%;
  min-height: 90vh;
  height: 90vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 19px;
  // background-color: grey;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  padding: 2em 4em;
  overflow: hidden;
  margin: 0.5em;
`;

const TopContainer = styled.div`
  width: 100%;
  // height: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  // background-color: red;
  // padding: 0 3em;
  // padding-bottom: 5em;
  margin-top: 2em;
`;

const BackDrop = styled(motion.div)`
  width: 120%;
  height: 40%;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 20%;
  // transform: rotate(60deg);
  top: -80px;
  right: -80px;
  // left: 2px;
  // background: rgb(241, 196, 15);
  background: rgba(93, 47, 194, 1);
  background: linear-gradient(
    58deg,
    rgba(93, 47, 194, 1) 20%,
    rgba(93, 27, 194, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 35px;
  font-weight: 600;
  line-height: 1.24;
  // color: #fff;
  // color:black;
  color: white;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  // color: #fff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  z-index: 10;
  margin: 0;
  margin-top: 1.5em;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em 0;
  // margin: 1em 1em;
  // background-color:black;
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

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

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
          {/* <BackDrop/> */}
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
