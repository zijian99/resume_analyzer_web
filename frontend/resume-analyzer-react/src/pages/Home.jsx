import React from 'react'
import AnnouncementBoard from '../components/AnnouncementComponent/AnnouncementBoard'
import AnnouncementMarquee from '../components/AnnouncementComponent/AnnouncementMarquee'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import appPic1 from "../assets/resume_checker.png";
import appPic2 from "../assets/content1.gif";
import appPic3 from "../assets/chatbot.png";


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 90vh;

  padding: 0em 5em;
`;

const AnnoucementContainer = styled.div`
  height: 70vh;
  background: radial-gradient(circle at top, #111e40 10%, #0a0027 50%, #050017 100%);

  padding: 2em;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  width: 50%;

  margin: 1em;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;

  width: 50%;
  margin: 1em;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: start; 

  border-radius: 10px;
  font-size: 18px;
  background: white;
`;

const HeaderText = styled.h2`
  font-size: 48px;
  font-weight: 600;

  color:black;
`;

const SmallText = styled.h5`
  z-index: 10;

  font-weight: 500;
  font-size: 24px;

  color:black;

  margin: 0;
  margin-top: 1em;
`;

const Image = styled.img`
  width: 90%;
  height: 55vh;

  border-radius: 10px;

  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;




const StartButton = styled(NavLink)`
  display: flex;
  width: 100%;

  border-radius: 5px;

  text-decoration: none;
  color: black;
  border: 1px solid black;

  transition: 0.2s;

  margin: 2em 0;
  margin-left: 1em;
  padding: 1em 1em;

  &:hover {
    color: #5f30e2;;
    opacity: 0.8;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <AnnoucementContainer>
        <AnnouncementMarquee message="📢 Struggling with Job Applications? Get instant feedback & improve your resume today! 🚀"/>
        <AnnouncementBoard/>
      </AnnoucementContainer>

      <CardContainer>
          <ImageSection>
            <Image src={appPic1} alt=""  />
          </ImageSection>
          <ContentSection>
            <ContentBlock>
              <HeaderText>Optimize Your Resume & Get More Interviews!</HeaderText>
              <SmallText>Our AI -powered tool analyzes your resume and provides instant feedback to help you stand out in job applications.</SmallText>
            </ContentBlock>
            <StartButton to="/resumeanalyzer">
              Start Now to Optimize Your Resume!
            </StartButton>
          </ContentSection>
      </CardContainer>  

      <CardContainer>
          <ContentSection>
            <ContentBlock>
              <HeaderText>Perfect Your Resume: Fix Grammar & Spelling Instantly!</HeaderText>
              <SmallText>Our AI-powered grammar and spelling check ensures your resume is polished, professional, and error-free. </SmallText>
            </ContentBlock>
            <StartButton to="/grammarchecker">
              Check Your Spelling and Grammar for Free!
            </StartButton>
          </ContentSection>

          <ImageSection>
            <Image src={appPic2} alt=""  />
          </ImageSection>
      </CardContainer>  

      <CardContainer>
          <ImageSection>
            <Image src={appPic3} alt=""  />
          </ImageSection>
          <ContentSection>
            <ContentBlock>
              <HeaderText>Get Your Career Advice from AI!</HeaderText>
              <SmallText>Our AI Chatbot can give you any advice or suggestion on your career to help with your job seeking.</SmallText>
            </ContentBlock>
            <StartButton to="/aichatbot">
              Chat with AI for Career Advices!
            </StartButton>
          </ContentSection>
      </CardContainer>  

    </HomeContainer>
  )
}

export default Home;