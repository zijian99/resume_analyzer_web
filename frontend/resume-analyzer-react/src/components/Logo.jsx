import React from "react";
import { ClickableImg } from "../styles/Navbar.styled";
import logo from "../assets/logoipsum-338.svg";

export const Logo = ({path}) => {
    return( 
    <ClickableImg to={path}>
        <img src={logo} alt="logo" />
        Resume Analyzer
    </ClickableImg>
    

    );
};