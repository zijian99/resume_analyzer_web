import React from 'react'
import styled from 'styled-components';
import { AccountBox } from '../components/accountbox/AccountBox';

const StyledDiv = styled.div`
  height: 2400px
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LoginBackground = styled.img`
  width: 100%;
  height: 60vh;
  align-items: center;
  // display: flex;
  // flex: 1;
`;

const Login = () => {
  

  return (
  <AppContainer>
      <div>
        <LoginBackground src="src\assets\pic.jpg" alt="" />
      </div>
     <AccountBox/>
  </AppContainer>
   
    // <StyledDiv>Login</StyledDiv>

    // <div>login</div>
  )
}

export default Login