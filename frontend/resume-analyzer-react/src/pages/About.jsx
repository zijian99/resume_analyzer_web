import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons
import TechStack from "../components/TechStack";

const AboutContainer = styled.div`
  background-color: #fff;
  display:flex;
  flex-direction: column; 
  justify-content: space-between;
  color: #333;
  font-family: Arial, sans-serif;
  padding: 2em 8em;
  // max-width: 900px;
  // margin: auto;
`;

const SectionContainer = styled.div`
  background-color: #fff;
  display:flex;
  flex-direction: column; 
  justify-content: space-between;
  color: #333;
  font-family: Arial, sans-serif;
  margin-bottom: 8em;
  // max-width: 900px;
  // margin: auto;
`;


const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 1.5em;
  border-left: 4px solid #4a90e2;
  padding-left: 10px;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: normal;  /* Preserves new lines */
  word-wrap: break-word;
`;

const GameIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const GameIcon = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 15px;
  border-radius: 10px;
`;

const DeveloperCard = styled.div`
  background: #f9f9f9;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20%;
  margin-top: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #4a90e2;
`;

const DeveloperName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SocialLinks = styled.div`
  // display: flex;
  // justify-content: center;
  margin: 0 1em ;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  margin: 0 10px;
  color:rgb(2, 2, 2);
  font-size: 28px;
  transition: color 0.3s ease;

  &:hover {
    color: #2c6dbc;
  }
`;

const DisclaimerText = styled.p`
  font-size: 16px;
  color: #ff4d4d; /* Red text */
  font-weight: bold;
  margin-top: 15px;
`;

const About = () => {
  return (
    <AboutContainer>
      <SectionContainer>
      <Title>About Us</Title>
      <Text>
        Our AI Resume Analyzer helps job seekers improve their resumes by providing following functions:<br/>
        <br/>
        - Resume Analysis<br/>
        - Grammar & Spelling Check<br/>
        - AI Chatbot Advisor<br/><br/>
        Start optimizing your resume today!<br/><br/>
      </Text>
      <Text>
        We understand the challenges of job applications and the importance of a well-structured, error-free resume. Our platform gives detailed insights into resume content, formatting, and keyword optimization** to help users align with industry standards and Applicant Tracking Systems (ATS).
      </Text>
      <Text>
        Our AI-powered Grammar & Spelling Checker ensures that your resume is polished and professional, eliminating errors that could affect your first impression with recruiters.
      </Text>
      <Text>
        The AI Chatbot Advisor acts as your virtual assistant, providing interview tips, job market insights, and resume enhancement suggestions to help you land your dream job.
      </Text>
      <Text>
        Our mission is to empower job seekers by making professional career guidance accessible, efficient, and AI-driven.
      </Text>
      </SectionContainer>


      {/* DEVELOPER SECTION */}
      <SectionContainer>
        <Title>Developer</Title>
        <DeveloperCard>
          <DeveloperName>Zi Jian</DeveloperName>
          <SocialLinks>
            <SocialIcon href="https://github.com/zijian99" target="_blank">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/in/czj99" target="_blank">
              <FaLinkedin />
            </SocialIcon>
          </SocialLinks>
        </DeveloperCard>

        

      </SectionContainer>

      <TechStack/>

      <DisclaimerText>
          Disclaimer: This is a personal side project developed individually.
        </DisclaimerText>
    </AboutContainer>
  );
};

export default About;
