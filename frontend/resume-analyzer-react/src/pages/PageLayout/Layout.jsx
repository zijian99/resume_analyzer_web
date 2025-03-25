import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/NavbarComponent/Navbar';
import Footer from '../../components/Footer';
import {
  LayoutContainer,
  MainContent,
} from '../PageLayout/LayoutStyles';


const Layout = () => {

  return (
    <LayoutContainer>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer/>
    </LayoutContainer>
  );
};

export default Layout;