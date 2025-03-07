import React from "react";
import styled from "styled-components";
import bgImage from "../assets/background.gif"; // Replace with your actual background
import profilePic from "../assets/logo_example/logoex7.jpg"; // Replace with profile image
import qrCode from "../assets/bmc_qr.png"; // Replace with QR code image

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url(${bgImage}) no-repeat center center/cover;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Dark overlay */
  }
`;

const ContentBox = styled.div`
  position: relative;
  max-width: 500px;
  padding: 2rem;
  color: white;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons on mobile */
    gap: 0.5rem;
  }
`;

const StyledButton = styled.a`
  flex: 1;
  padding: 0.8rem 0;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid white;
  text-align: center;
  transition: 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const QRCodeImage = styled.img`
  width: 150px;
  height: 150px;
  margin: 1rem 0;
`;

const Footer = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 1rem;
`;

/* Hide elements for mobile */
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid white;

//   @media (max-width: 768px) {
//     display: none; /* Hide profile picture on mobile */
//   }
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  line-height: 2;

  @media (max-width: 768px) {
    display: none; /* Hide description on mobile */
  }
`;

const DownloadAppPage = () => {
  return (
    <PageContainer>
      <ContentBox>
        <ProfileImage src={profilePic} alt="Profile" />
        <Title>Please Download our Mobile App for Better Experience(*^_^*)</Title>
        <ButtonContainer>
          <StyledButton href="#">Android APK Download</StyledButton>
          <StyledButton href="#">iOS App Store Download</StyledButton>
        </ButtonContainer>
        <Description>
          Android User, Please use QRCode Scanner App: WeChat, Google Lens to Access
          iPhone User, Please use Phone Camera, to scan the QRCode below to Access
        </Description>
        <QRCodeImage src={qrCode} alt="QR Code" />
        <Footer>Resume Analyzer © 2025</Footer>
      </ContentBox>
    </PageContainer>
  );
};

export default DownloadAppPage;

