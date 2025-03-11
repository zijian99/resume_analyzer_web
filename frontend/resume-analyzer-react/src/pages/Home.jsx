import React from 'react'
import AnnouncementBoard from '../components/AnnouncementComponent/AnnouncementBoard'
import AnnouncementMarquee from '../components/AnnouncementComponent/AnnouncementMarquee'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';



const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 90vh;

  // min-height: 100vh; /* Each section takes full viewport height */

  // background-color: purple;

  // margin-bottom: 0.5em;
  padding: 0em 5em;
`;



const HeaderText = styled.h2`
  // z-index: 10;

  font-size: 48px;
  font-weight: 600;
  // line-height: 1.24;

  // color: #fff; 
  color:black;

  // margin-bottom: 1em;
`;

const SmallText = styled.h5`
    z-index: 10;

  font-weight: 500;
  font-size: 24px;

  // color: #fff;
  color:black;

  margin: 0;
  margin-top: 1em;
`;







const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: start;
  align-items: center;
  justify-content: center;
  flex: 1;

  width: 50%;
  margin: 1em;

  // padding: 0.5em;
`;

const RightSection = styled.div`
  display: flex;
  // justify-content: center;
  align-items: flex-end;
  // flex: 1;
  position: relative;

  width: 50%;
  margin: 1em;
  // height: 100vh; /* Ensure full page height */

  // background-color: grey;

  // padding: 1em;
`;

const ContentBlock = styled.div`
  /* Center content both horizontally and vertically */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: start; /* Optional: Ensures text is also centered */

  // min-height: 80vh;

  border-radius: 10px;
  font-size: 18px;

  background: white;
  // padding: 20px;
`;



const Image = styled.img`
  width: 90%;
  height: 55vh;

  border-radius: 10px;

  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const AnnoucementContainer = styled.div`
  padding: 2em;
  height: 70vh;
  background: radial-gradient(circle at top, #111e40 10%, #0a0027 50%, #050017 100%);
`;

const FunctionContainer = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  height: 200vh;
  margin-top: 0.5em;
`;

const StartButton = styled(NavLink)`
  display: flex;
  width: 100%;

  border-radius: 5px;

  text-decoration: none;
  // text-transform: uppercase;
  // font-weight: bold;

  // background: #007dfc;
  // background: #3cc9b4;
  // background: #5f30e2;
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
    <Container>
      <AnnoucementContainer>
        <AnnouncementMarquee message="📢 Struggling with Job Applications? Get instant feedback & improve your resume today! 🚀"/>
        <AnnouncementBoard/>
      </AnnoucementContainer>
      <CardContainer>
          <RightSection>
            <Image src="src/assets/resume_checker.png" alt=""  />
          </RightSection>

          <LeftSection>
            <ContentBlock>
              <HeaderText>Optimize Your Resume & Get More Interviews!</HeaderText>
              <SmallText>Our AI-powered tool analyzes your resume and provides instant feedback to help you stand out in job applications.</SmallText>
            </ContentBlock>
            <StartButton to="/resumeanalyzer">
              Start Now to Optimize Your Resume!
            </StartButton>
          </LeftSection>
      </CardContainer>  

      <CardContainer>
          <LeftSection>
            <ContentBlock>
              <HeaderText>Perfect Your Resume: Fix Grammar & Spelling Instantly!</HeaderText>
              <SmallText>Our AI-powered grammar and spelling check ensures your resume is polished, professional, and error-free. </SmallText>
            </ContentBlock>
            <StartButton to="/grammarchecker">
              Check Your Spelling and Grammar for Free!
            </StartButton>
          </LeftSection>

          <RightSection>
            <Image src="src/assets/content1.gif" alt=""  />
          </RightSection>

          
      </CardContainer>  


      
    </Container>
  )
}

export default Home