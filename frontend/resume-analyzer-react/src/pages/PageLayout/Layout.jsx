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


const Layout = () => {

  return (
    <Container>
        <Navbar />
        <Outlet />
        <Footer/>
    </Container>
  );
};

export default Layout;