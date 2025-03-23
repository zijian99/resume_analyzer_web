import React from 'react'
import Navbar from '../../components/NavbarComponent/Navbar';
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

const MainContent = styled.div`
  // flex: 1;
  padding-top: 8vh ; /* Should match or be slightly larger than navbar height */
`;


const Layout = () => {

  return (
    <Container>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
        
        <Footer/>
    </Container>
  );
};

export default Layout;