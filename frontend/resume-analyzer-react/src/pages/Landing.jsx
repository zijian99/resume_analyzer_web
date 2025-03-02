import React, { useState,useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import main_gif from "../../src/assets/writing_expert.gif";
import cat_gif from "../../src/assets/cat_gif.gif";
import randomgif from "../../src/assets/randomgif.gif";
import content1 from "../../src/assets/content1.gif";
import content2 from "../../src/assets/content2.gif";
import content3 from "../../src/assets/content3.gif";
import content5 from "../../src/assets/content5.gif";
import LogoCarousel from "../components/LogoCarousel";

const sections = [
    { id: 1, headertext: "Better writing, better results",smalltext:"Be perfectly professional, clear, and convincing in a few clicks, not a few hours.", image: content1 },
    { id: 2, headertext: "The right text for the context",smalltext:"Get personalized suggestions based on what you're writing and who will read it.", image: content2},
    { id: 3, headertext: "Works where you work",smalltext:"Works across all the apps and sites you use. No copying, no pasting, no context switching.", image: content3 },
    { id: 4, headertext: "This is responsible AI",smalltext:"Don’t compromise on security. We never sell your data, provide it for advertising purposes, or allow third parties to use it to train their models.", image: cat_gif },
  ];

// Styled Components
// const Container = styled.div`
// display: flex;
// // align-items: center;
// flex-direction: row;
// justify-content: space-between;
// // min-height: 100vh; /* Each section takes full viewport height */
// `;

const LeftSection = styled.div`
  flex: 1;
  width: 50%;
  display: flex;
  flex-direction: column;
  // align-items: start;
  // padding: 0.5em;
`;

const ContentBlock = styled.div`
  background: white;
  // padding: 20px;
  border-radius: 10px;
  min-height: 80vh;
  font-size: 18px;
  /* Center content both horizontally and vertically */
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  text-align: start; /* Optional: Ensures text is also centered */
  
`;

const RightSection = styled.div`
  // flex: 1;
  display: flex;
  width: 50%;
  // justify-content: center;
  align-items: flex-end;
  // height: 100vh; /* Ensure full page height */
  position: relative;
  padding: 1em;
  // background-color: grey;
`;

const StickyImageWrapper = styled.div`
  position: sticky;
  top: 20%; /* Adjust based on navbar if needed */

  // width: 50%;
  width: 100%;
  display: flex;
  align-self: start;
  align-items:center;
  justify-content: center;  
  margin-top: 10%;
`;

const Image = styled.img`
  width: 90%;
  height: 55vh;
  border-radius: 10px;
  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const CardContainer = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: row;
  justify-content: space-between;
  // min-height: 100vh; /* Each section takes full viewport height */

  // background-color: purple;
  // margin-bottom: 0.5em;
  padding: 5em 5em;
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
  width: 50%;
  justify-content: center;
  background-color: white;
`;

const HeaderText = styled.h2`
  font-size: 48px;
  font-weight: 600;
  // line-height: 1.24;
  // color: #fff; 
  color:black;
  // z-index: 10;
  // margin-bottom: 1em;
`;

const SmallText = styled.h5`
  // color: #fff;
  color:black;
  font-weight: 500;
  font-size: 24px;
  z-index: 10;
  margin: 0;
  margin-top: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // flex: 1; /* Takes up remaining height after navbar */
  // overflow-y: auto;
  // scroll-behavior: smooth;
`;

const GetAccountButton = styled(NavLink)`
  display: flex;
  width: fit-content;
  text-decoration: none;
  // font-weight: bold;
  // text-transform: uppercase;
  transition: 0.2s;
  margin: 2em 0;
  padding: 2em 1em;
  background: #007dfc;
  color: white;
  border-radius: 5px;
  &:hover {
  color: white;
  opacity: 0.8;
  }
`;

const GetAccountBoldText = styled.div`
  white-space: nowrap;
  font-weight: bold;
`;

const GetAccountText = styled.div`
  white-space: nowrap;
  margin: 0 0.5em;
`;


const Landing = () => {

  const [currentImage, setCurrentImage] = useState(sections[0].image);

  const { ref: firstContainerRef, inView: firstIsInView } = useInView({ threshold: 0.8 });
  const { ref: secondContainerRef, inView: secondIsInView } = useInView({ threshold: 0.8 });
  const { ref: thirdContainerRef, inView: thirdIsInView } = useInView({ threshold: 0.8 });

  const [isFading, setIsFading] = useState(false);
  
  const sectionRefs = useRef([]);

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
        <CardContainer>
        <HeaderContainer>
              <HeaderText>Resume Analyzer that ensure your resume quality and writing shine </HeaderText>
              <SmallText>Work with AI that helps with your resume analysis and feedback, to get you to your desired jobs. </SmallText>
              <GetAccountButton onClick={()=>{console.log("clicked")}}> 
                <GetAccountBoldText>Get Your Account</GetAccountBoldText>
                <GetAccountText>It's Free </GetAccountText>
                <GoArrowRight/>
              </GetAccountButton>
              <div> By signing up, you agree to the Terms and Conditions and Privacy Policy.</div>
              <div> The Website is using Google Gemini Flash 2.0.</div>
            </HeaderContainer>
              
            <HeaderContainer>
              <img src={main_gif} alt="logo" />
            </HeaderContainer>
        </CardContainer>

        <LogoCarousel/>


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

    <CardContainer>
      landing 3

    </CardContainer>

    </Wrapper>
  );
};



export default Landing;
