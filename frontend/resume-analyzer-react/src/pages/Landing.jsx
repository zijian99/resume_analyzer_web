import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import gif1 from "../../src/assets/writing_expert.gif";
import gif2 from "../../src/assets/gif2.gif";
import gif3 from "../../src/assets/gif3.gif";

const sections = [
    { id: 1, text: "Content 1", image: gif1 },
    { id: 2, text: "Content 2", image: gif2},
    { id: 3, text: "Content 3", image: gif3 }
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
`;

const ContentBlock = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-height: 90vh;
  font-size: 18px;
  /* Center content both horizontally and vertically */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; /* Optional: Ensures text is also centered */
  
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
  background-color: grey;
`;

const StickyImageWrapper = styled.div`
  position: sticky;
  top: 20%; /* Adjust based on navbar if needed */

  // width: 50%;
  width: 100%;
  display: flex;
  align-self: start;
  margin-top: 10%;
`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  border-radius: 10px;
  opacity: ${(props) => (props.isFading ? 0 : 1)};
  transition: opacity 1s ease-in-out;
`;

const CardContainer = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: row;
  justify-content: space-between;
  // min-height: 100vh; /* Each section takes full viewport height */

  // background-color: purple;
  margin-bottom: 0.5em;
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

  const { ref: firstContainerRef, inView: firstIsInView } = useInView({ threshold: 0.6 });
  const { ref: secondContainerRef, inView: secondIsInView } = useInView({ threshold: 0.6 });
  const { ref: thirdContainerRef, inView: thirdIsInView } = useInView({ threshold: 0.6 });

  const [isFading, setIsFading] = useState(false);
  
  useEffect(() => {
    setIsFading(true); // Start fade-out
    const timeout = setTimeout(() => {
      setCurrentImage(
        firstIsInView ? sections[0].image : 
        secondIsInView ? sections[1].image : 
        thirdIsInView ? sections[2].image : sections[0].image
      );
      setIsFading(false); // Fade-in new image
    }, 1000); // Delay to match transition
  
    return () => clearTimeout(timeout);
  }, [firstIsInView, secondIsInView, thirdIsInView]);

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
              <img src={gif1} alt="logo" />
            </HeaderContainer>
        </CardContainer>
    <CardContainer1>
      <LeftSection>
        <ContentBlock ref={firstContainerRef}>
          <div>Content 11111111111111</div>
          
        </ContentBlock>
        <ContentBlock ref={secondContainerRef}>
          Content 2
        </ContentBlock>
        <ContentBlock ref={thirdContainerRef}>
          Content 3
        </ContentBlock>
      </LeftSection>

      <RightSection>
        <StickyImageWrapper>
          <Image src={currentImage} alt="Sticky" isFading={isFading} />
        </StickyImageWrapper>
      </RightSection>
    </CardContainer1>

    <CardContainer>landing 3</CardContainer>

    </Wrapper>
  );
};



export default Landing;
