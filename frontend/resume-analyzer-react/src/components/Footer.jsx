import React from "react";
import styled from "styled-components";


const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 5em 5em;
  margin-top: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;  /* Make all sections equal height */
  gap: 20px;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  flex: 1;  /* Make all sections take equal width */
  display: flex;
  flex-direction: column;  /* Ensure the content is evenly spread */
  
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2em;
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  margin-bottom: 1em;

  &:hover {
    // color: #007bff;
    color: #5f30e2;
  }
`;

const CopyrightText = styled.div`
    margin-top: 5em;
    font-size: 12px;

`;

const sections = [
  {
    title: "Get Resume Analyzer",
    links: [
      { text: "Resume Analyzer for Your Desktop", url: "#" },
      { text: "Resume Analyzer for Windows", url: "#" },
      { text: "Resume Analyzer for Mac", url: "#" },
      { text: "Resume Analyzer Browser Extension", url: "#" },
      { text: "Resume Analyzer for Mobile", url: "#" },

    ],
  },
  {
    title: "Learn More",
    links: [
      { text: "Plans", url: "#" },
      { text: "AI at Resume Analyzer", url: "#" },
      { text: "Generative AI", url: "#" },
      { text: "AI Writing Assistant", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", url: "#" },
      { text: "Responsible AI", url: "#" },
      { text: "Trust Center", url: "#" },
      { text: "Privacy Policy", url: "#" },
      { text: "Terms of Service", url: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { text: "Help Center", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "LinkedIn", url: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        {sections.map((section, index) => (
          <FooterSection key={index}>
            <h3>{section.title}</h3>
            {section.links.map((link, idx) => (
              <FooterLink key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
              </FooterLink>
            ))}
          </FooterSection>
        ))}
      </FooterWrapper>
      <CopyrightText>2025 © Resume Analyzer Inc.</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;