import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer';
import NavbarMain from '../../components/NavbarComponent/NavbarMain';
 

const Container = styled.div`
  display: flex;
  flex-direction: column;

//    height: 100vh;
`;

const MainContent = styled.div`
  // flex: 1;
  padding-top: 8vh ; /* Should match or be slightly larger than navbar height */
`;


const LayoutMain = () => {

  return (
    <Container>
        <NavbarMain />
        <MainContent>
            <Outlet />
        </MainContent>
        

    </Container>
  );
};

export default LayoutMain;