import React, { useState } from "react";
import styled from "styled-components";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTAINER

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 60%;
  max-width: 80%;
  
  //background-color: grey;   

  margin: 10em 0;

`;

const AnswerContainer = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "100px" : "0px")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};

  transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;

  overflow: hidden;
`;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPONENT

const Title = styled.h2`
  text-align: center;

  font-size: 2.5em;
  font-weight: bold;

  margin-bottom: 1em;
`;

const FAQItem = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  background: #fff;

  overflow: hidden;
  transition: all 0.3s ease-in-out;
  
  margin: 1em;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  cursor: pointer;
  
  font-size: 18px;
  font-weight: 600;

  background: #f8f9fa;
  transition: background 0.3s ease;

  padding: 16px 20px;

  &:hover {
    background: #e9ecef;
  }
`;

const Answer = styled.div`
  font-size: 16px;

  color: #444;

  padding: 16px 20px;
`;

const Icon = styled.span`
  font-size: 20px;

  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const faqs = [
  {
    question: "What is Resume Analyzer?",
    answer: "Resume Analyzer is a website app that helps those who needs advice with their resume.",
  },
  {
    question: "Does Resume Analyzer support dark mode?",
    answer: "No currently! Dark mode is currently on development.",
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept major credit cards (Visa, American Express, Mastercard, Discover) or PayPal. If you are purchasing Grammarly Business for 10 or more members on an annual plan, you can request an invoice. Invoices can be paid by bank transfer (ACH/Wire), major credit cards, Apple Pay, and Google Pay. Note: PayPal cannot be used to pay invoices.",
  },
];

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  // Function for toggle button
  const toggleFAQ = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index) // Close if already open
        : [...prevIndexes, index] // Open if not already open
    );
  };

  return (
    <FAQContainer>
      <Title>Frequently Asked Questions</Title>

      {faqs.map((faq, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleFAQ(index)}>
            {faq.question}
            <Icon isOpen={openIndexes.includes(index)}>▼</Icon>
          </Question>
          <AnswerContainer isOpen={openIndexes.includes(index)}>
            <Answer>{faq.answer}</Answer>
          </AnswerContainer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;


