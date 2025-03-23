import React, { useState,useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import styled from "styled-components";
import main_gif from "../assets/writing_expert.gif";
import cat_gif from "../assets/cat_gif.gif";
import content1 from "../assets/content1.gif";
import content2 from "../assets/content2.gif";
import content3 from "../assets/content3.gif";
import content5 from "../assets/content5.gif";
import content6 from "../assets/annual_report_example.jpg";
import LogoCarousel from "../components/LogoCarousel";
import PricingPlan from "../components/PricingPlan";
import { AiOutlineDownload } from "react-icons/ai";




// Styled Components
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTAINER

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1; /* Takes up remaining height after navbar */

  width: 100%;
  // overflow-y: auto;
  // scroll-behavior: smooth;
`;

const CardContainer = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: row;
  justify-content: space-between;

  // min-height: 100vh; /* Each section takes full viewport height */

  // background-color: purple;

  // margin-bottom: 0.5em;
  padding: 2em 5em;
`;

const CardContainer1 = styled.div`
  display: flex;
  // align-items: center;
  // justify-content: center;

  min-height: 100vh; /* Each section takes full viewport height */
  width: 100%;

  background-color: red;

  margin-bottom: 0.5em 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 50%;
 
  background-color: white;
`;

const PricingContainer = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: column;
  justify-content: space-between;

  // min-height: 100vh; /* Each section takes full viewport height */

  // background-color: purple;

  // margin-bottom: 0.5em;
  margin: 10em 0;
  // padding: 5em 5em;

`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
  // justify-content: center;

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

const GetAccountButton = styled(NavLink)`
  display: flex;
  width: fit-content;

  border-radius: 5px;

  text-decoration: none;
  // text-transform: uppercase;
  // font-weight: bold;

  // background: #007dfc;
  // background: #3cc9b4;
  background: #5f30e2;
  color: white;
  

  transition: 0.2s;

  margin: 2em 0;
  padding: 2em 1em;

  &:hover {
    color: white;
    opacity: 0.8;
  }
`;

const DownloadMobileButton = styled(NavLink)`
  display: flex;
  width: fit-content;

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
  padding: 2em 1em;

  &:hover {
    color: #5f30e2;;
    opacity: 0.8;
  }
`;

const GetAccountBoldText = styled.div`
  white-space: nowrap;

  font-weight: bold;
  margin-right: 0.5em;
`;

const GetAccountText = styled.div`
  white-space: nowrap;

  margin: 0 0.5em;
`;



const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: start;
  flex: 1;

  width: 50%;

  // padding: 0.5em;
`;

const RightSection = styled.div`
  display: flex;
  // justify-content: center;
  align-items: flex-end;
  // flex: 1;
  position: relative;

  width: 50%;
  // height: 100vh; /* Ensure full page height */

  // background-color: grey;

  padding: 1em;
`;

const ContentBlock = styled.div`
  /* Center content both horizontally and vertically */
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: start; /* Optional: Ensures text is also centered */

  min-height: 80vh;

  border-radius: 10px;
  font-size: 18px;

  background: white;
  // padding: 20px;
`;

const StickyImageWrapper = styled.div`
  display: flex;
  align-self: start;
  align-items:center;
  justify-content: center;  
  position: sticky;

  top: 20%; /* Adjust based on navbar if needed */
  // width: 50%;
  width: 100%;

  margin-top: 10%;
`;

const Image = styled.img`
  width: 90%;
  height: 55vh;

  border-radius: 10px;

  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;


const PricingTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-self: center;

  width: 100%;

  font-size: 3em;
  font-weight: bold;

  // background-color:grey;
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sections = [
  { id: 1, headertext: "Better writing, better results",smalltext:"Be perfectly professional, clear, and convincing in a few clicks, not a few hours.", image: content1 },
  { id: 2, headertext: "The right text for the context",smalltext:"Get personalized suggestions based on what you're writing and who will read it.", image: content2},
  { id: 3, headertext: "Works where you work",smalltext:"Works across all the apps and sites you use. No copying, no pasting, no context switching.", image: content3 },
  { id: 4, headertext: "This is responsible AI",smalltext:"Don’t compromise on security. We never sell your data, provide it for advertising purposes, or allow third parties to use it to train their models.", image: cat_gif },
];

const Landing = () => {

  const [currentImage, setCurrentImage] = useState(sections[0].image);
  const [isFading, setIsFading] = useState(false);
  const sectionRefs = useRef([]);
  // const { ref: firstContainerRef, inView: firstIsInView } = useInView({ threshold: 0.8 });
  // const { ref: secondContainerRef, inView: secondIsInView } = useInView({ threshold: 0.8 });
  // const { ref: thirdContainerRef, inView: thirdIsInView } = useInView({ threshold: 0.8 });

  // Manually checking if current ContentBlock is in View, we changed the images based on each content
  useEffect(() => {
    const handleScroll = () => {
      let newImage = currentImage;
      let found = false;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
            newImage = sections[i].image;
            found = true;
            break;
          }
        }
      }

      if (found && newImage !== currentImage) {
        setIsFading(true);
        setTimeout(() => {
          setCurrentImage(newImage);
          setIsFading(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentImage]);


  return (
    <Wrapper>

        {/* FIRST PART OF LANDING PAGE */}
        <CardContainer>
          <HeaderContainer>
            <HeaderText>Resume Analyzer that ensure your resume quality and writing shine </HeaderText>
            <SmallText>Work with AI that helps with your resume analysis and feedback, to get you to your desired jobs. </SmallText>

            <ButtonContainer>
              <GetAccountButton to="/login"> 
                <GetAccountBoldText>Get Your Account</GetAccountBoldText>
                <GetAccountText>It's Free </GetAccountText>
                <GoArrowRight/>
              </GetAccountButton>
              <DownloadMobileButton to="/mobile"> 
                <GetAccountBoldText>Download App For Mobile</GetAccountBoldText>
                <AiOutlineDownload />
              </DownloadMobileButton>
            </ButtonContainer>

            <div> By signing up, you agree to the Terms and Conditions and Privacy Policy.</div>
            <div> The Website is using Google Gemini Flash 2.0.</div>
          </HeaderContainer>
              
            <HeaderContainer>
              <img src={main_gif} alt="logo" />
            </HeaderContainer>
        </CardContainer>

        {/* LOGO SLIDER THAT SHOWS TRUSTED ORGANIZATION */}
        <LogoCarousel/>

        {/* SECOND PART OF LANDING PAGE */}
        <CardContainer>
          <LeftSection>
            {sections.map((section, index) => (
              <ContentBlock
                key={section.id}
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                <HeaderText>{section.headertext}</HeaderText>
                <SmallText>{section.smalltext}</SmallText>
              </ContentBlock>
            ))}
          </LeftSection>

          <RightSection>
            <StickyImageWrapper>
              <Image src={currentImage} alt="Sticky" isFading={isFading} />
            </StickyImageWrapper>
          </RightSection>
        </CardContainer>
        
        {/* THIRD PART OF LANDING PAGE(PRICING PLAN) */}
        <PricingContainer>
          <PricingTitle>Choose the Right</PricingTitle>
          <PricingTitle>Resume Analysis Plan</PricingTitle>

          <PricingPlan/>
        </PricingContainer>

        {/* FOURTH PART OF LANDING PAGE(SOME RANDOM CONTENT) */}
        <CardContainer>
          <RightSection>
            <Image src={content6} alt=""  />
          </RightSection>

          <LeftSection>
            <ContentBlock>
              <HeaderText>The Productivity Shift</HeaderText>
              <SmallText>AI-fluent power users are leading the way to reclaim the workweek. Learn from their habits and scale them across your enterprise to save millions in productivity gains.</SmallText>
            </ContentBlock>  
          </LeftSection>
      </CardContainer>
    </Wrapper>
  );
};



export default Landing;
