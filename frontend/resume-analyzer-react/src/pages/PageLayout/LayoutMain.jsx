import React from 'react';
import { Outlet } from 'react-router-dom';

import NavbarMain from '../../components/NavbarComponent/NavbarMain';
import {
  LayoutContainer,
  MainContent,
} from '../PageLayout/LayoutStyles';


const LayoutMain = () => {

  return (
    <LayoutContainer>
        <NavbarMain />
        <MainContent>
            <Outlet />
        </MainContent>
    </LayoutContainer>
  );
};

export default LayoutMain;