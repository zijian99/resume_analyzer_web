import React from 'react'
import styled from 'styled-components';
import { AccountBox } from '../components/AccountBox/AccountBox';

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
  align-items: center;

  width: 100%;
  height: 60vh;
  // display: flex;
  // flex: 1;
`;

const Login = () => {
  
  return (
    <LoginContainer>
        <div>
          <LoginBackground src="src\assets\pic.jpg" alt="" />
        </div>
      <AccountBox/>
    </LoginContainer>
  )
}

export default Login;