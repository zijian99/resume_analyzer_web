import React from 'react'
import styled from 'styled-components'

const Landing = () => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    // flex: 1; /* Takes up remaining height after navbar */
    // overflow-y: auto;
    // scroll-behavior: smooth;
  `;

  const CardContainer = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: row;
    justify-content: space-between;
    // min-height: 100vh; /* Each section takes full viewport height */
  
    background-color: white;
    margin-bottom: 0.5em;
    padding: 5em 5em;
  `;
  const CardContainer1 = styled.div`
    display: flex;
    // align-items: center;
    // justify-content: center;
    min-height: 100vh; /* Each section takes full viewport height */
    width: 100%;
    // background-color: red;
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


const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ContentBlock = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  min-height: 90vh;
  font-size: 18px;
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
  display: flex;
  align-self: start;
  margin-top: 10%;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;


    
  return (
    <Wrapper>
      <CardContainer>
          <HeaderContainer>
              <HeaderText>Resume Analyzer that ensure your resume quality and writing shine </HeaderText>
              <SmallText>Work with AI that helps with your resume analysis and feedback, to get you to your desired jobs. </SmallText>
              <div>sign up</div>
              <div> some words</div>
            </HeaderContainer>

            <HeaderContainer>
              <img src="src\assets\writing_expert.gif" alt="logo" />
            </HeaderContainer>
      </CardContainer>
      <div>
      
      <CardContainer1>
      
      <LeftSection>
        <ContentBlock>Content 1</ContentBlock>
        <ContentBlock>Content 2</ContentBlock>
        <ContentBlock>Content 3</ContentBlock>
      </LeftSection>

      <RightSection>
      <StickyImageWrapper>
          <Image src="src\assets\writing_expert.gif" alt="Sticky" />
      </StickyImageWrapper>
      </RightSection>
      </CardContainer1>
      </div>
      <CardContainer>Landing 3</CardContainer>
    </Wrapper>
  );
};

export default Landing;