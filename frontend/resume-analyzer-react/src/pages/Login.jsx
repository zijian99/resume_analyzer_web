import React from 'react'
import styled from 'styled-components';
import { AccountBox } from '../components/AuthComponent/AccountBox';
import loginBg from "../assets/background.gif";

const StyledDiv = styled.div`
  height: 2400px
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`; 

const LoginBackground = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover; /* Ensures it covers the full space */
  display: block; /* Prevents extra spacing below */
`;

const Login = () => {
  
  return (
    <LoginContainer>
        <div>
          <LoginBackground src={loginBg} alt="" />
        </div>
      <AccountBox/>
    </LoginContainer>
  )
}

export default Login;