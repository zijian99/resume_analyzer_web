import React from "react";
import styled from "styled-components";

// Import PNG icons (Make sure they are inside the /assets folder)
import reactIcon from "../assets/tech/react.png";
import nodeIcon from "../assets/tech/node.png";
import jsIcon from "../assets/tech/javascript.png";
import cssIcon from "../assets/tech/css.png";
import pythonIcon from "../assets/tech/python.png"; 
import fastAPIIcon from "../assets/tech/fastapi.png";
import springbootIcon from "../assets/tech/spring-boot.png";
import githubIcon from "../assets/tech/github.png";
import gitIcon from "../assets/tech/git.png";



const TechStackContainer = styled.div`
  padding: 50px 20px;
`;


const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  border-left: 4px solid #4a90e2;

  margin-bottom: 1.5em;
  padding-left: 10px;
`;


const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  justify-content: space-between;
  gap: 5em;
  
  margin: 1em;
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  border-radius: 16px;

  transition: 0.3s;
  cursor: pointer;
  
  padding: 1em;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TechIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const TechName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TechStack = () => {

  const techs = [
    { name: "React", icon: reactIcon },
    { name: "Node.js", icon: nodeIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "CSS", icon: cssIcon },
    { name: "FastAPI", icon: fastAPIIcon },
    { name: "Spring Boot", icon: springbootIcon },
    { name: "GitHub", icon: githubIcon },
    { name: "Git", icon: gitIcon },
  ];

  return (
    <TechStackContainer>
      <Title>Technologies</Title>
      <TechGrid>
        {techs.map((tech, index) => (
          <TechItem key={index}>
            <TechIcon src={tech.icon} alt={tech.name} />
            <TechName>{tech.name}</TechName>
          </TechItem>
        ))}
      </TechGrid>
    </TechStackContainer>
  );
};

export default TechStack;
