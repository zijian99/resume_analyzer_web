import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `;


const Layout = () => {
  

  // const NavbarWrapper = styled.div`
  //   position: sticky;
  //   top: 0;
  //   width: 100%;
  //   z-index: 100;
  //   background-color: white;
  // `;

  // const Content = styled.div`
  //   flex: 1; /* Allows content to take full remaining height */
  // `;

  return (
    <Container>
        <Navbar />
        <Outlet />
        <Footer/>
    </Container>
  );
};

export default Layout