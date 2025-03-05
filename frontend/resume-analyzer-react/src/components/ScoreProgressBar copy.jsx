import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const ScoreText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  // max-width: 400px;
  height: 1.5em;
  // border-radius: 8px;
  background: linear-gradient(to right, #e74c3c, #f39c12, #f1c40f, #2ecc71);
  position: relative;
  margin: 10px auto;
`;

const ScoreMarker = styled.div`
  // position: absolute;
  left: ${(props) => props.position}%;
  // top: -15px;
  // transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
  color: black;
  white-space: nowrap;

  &::before {
    content: "";
    // position: absolute;
    // top: 15px;
    // left: 50%;
    // transform: translateX(-50%);
    // width: 0;
    // height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid blue; /* Pointer triangle */
  }
`;

const Labels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  // position: absolute;
  // top: 100%;
  // left: 0;
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const ScoreProgressBar = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second animation
    const stepTime = 10;
    const step = score / (duration / stepTime);

    const interval = setInterval(() => {
      start += step;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setAnimatedScore(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <Container>
      <ScoreText>Your resume scored {animatedScore} out of 100.</ScoreText>
      <ProgressBarContainer>
        <ScoreMarker position={animatedScore}>YOUR RESUME</ScoreMarker>
      </ProgressBarContainer>
      <Labels>
        <span>0</span>
        <span>100</span>
      </Labels>
    </Container>
  );
};

export default ScoreProgressBar;
