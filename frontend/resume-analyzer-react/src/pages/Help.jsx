import React from "react";
import styled from "styled-components";

const HelpContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const Subtitle = styled.h2`
  color: #444;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const FAQItem = styled.div`
  margin: 10px 0;
`;

const Question = styled.h3`
  color: #007bff;
  cursor: pointer;
`;

const Answer = styled.p`
  margin: 5px 0 15px 10px;
  color: #666;
`;

const ContactButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  &:hover {
    background-color: #0056b3;
  }
`;

const Help = () => {
  return (
    <HelpContainer>
      <Title>Help & Support</Title>

      <Section>
        <Subtitle>How It Works</Subtitle>
        <p>1️⃣ Upload your resume in PDF or DOC format.</p>
        <p>2️⃣ Our AI analyzes grammar, spelling, and structure.</p>
        <p>3️⃣ Get detailed feedback and improvement suggestions.</p>
      </Section>

      <Section>
        <Subtitle>Frequently Asked Questions</Subtitle>
        <FAQItem>
          <Question>🔹 Is my resume data secure?</Question>
          <Answer>Yes! We do not store your data after analysis.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>🔹 What file formats do you support?</Question>
          <Answer>We support PDF and DOC/DOCX formats.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>🔹 How accurate is the analysis?</Question>
          <Answer>Our AI uses industry standards to provide the best insights.</Answer>
        </FAQItem>
      </Section>

      <Section>
        <Subtitle>Need More Help?</Subtitle>
        <p>If you have any issues, feel free to reach out to our support team.</p>
        <ContactButton>Contact Support</ContactButton>
      </Section>
    </HelpContainer>
  );
};

export default Help;