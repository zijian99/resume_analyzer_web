import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons
import TechStack from "../components/TechStack";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  
  background-color: #fff;
  color: #333;
  font-family: Arial, sans-serif;
  
  padding: 2em 8em;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;

  background-color: #fff;
  color: #333;
  font-family: Arial, sans-serif;

  margin-bottom: 8em;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  
  border-left: 4px solid #4a90e2;
  
  margin-bottom: 1.5em;
  padding-left: 10px;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 1.6;
  white-space: normal;  /* Preserves new lines */
  word-wrap: break-word;

  margin-bottom: 1.5em;
`;


const DeveloperCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 20%;

  background: #f9f9f9;
  
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  
  padding: 2em;
  margin-top: 20px;
`;

const DeveloperName = styled.h2`
  font-size: 24px;
  font-weight: bold;

  margin-bottom: 5px;
`;

const SocialLinks = styled.div`
  margin: 0 1em ;
  margin-top: 1em;
`;

const SocialIcon = styled.a`
  
  color:rgb(2, 2, 2);
  font-size: 28px;
  transition: color 0.3s ease;

  margin: 0 10px;

  &:hover {
    color: #2c6dbc;
  }
`;

const DisclaimerText = styled.p`
  color: #ff4d4d; /* Red text */
  font-size: 16px;
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
