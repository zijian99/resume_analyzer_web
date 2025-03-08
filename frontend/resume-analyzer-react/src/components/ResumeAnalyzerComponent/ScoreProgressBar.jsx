import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Function to determine color based on score
const getColor = (score) => {
  if (score < 40) return "#e74c3c"; // Red
  if (score < 70) return "#f1c40f"; // Yellow
  return "#2ecc71"; // Green
};

// Animation for text fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ScoreProgressBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

// Styled Components
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 15px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  // margin-top: 10px;
  position: relative;

  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;

  //   width: 300px; /* Set a fixed width */
  // height: 20px;
  // background: #ddd;
  // border-radius: 10px;
  // overflow: hidden;
  // position: relative;
`;

const ScoreFill = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background: ${(props) => getColor(props.score)};
  transition: width 1.5s ease-in-out;

  //   height: 100%;
  // width: ${(props) => props.width}%;
  // background: ${(props) => getColor(props.score)};
  // transition: width 1.5s ease-in-out;
`;

const ScoreText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => getColor(props.score)};
  text-align: center;
  margin-top: 5px;
  animation: ${fadeIn} 1s ease-in-out;

  //   font-size: 18px;
  // font-weight: bold;
  // color: #333;
  // text-align: center;
  // margin-top: 5px;
  // animation: ${fadeIn} 1s ease-in-out;
`;

// Score Progress Bar Component
const ScoreProgressBar = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
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

    // Delay progress update slightly for smooth animation
    setTimeout(() => {
      setProgress(score);
    }, 200);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <ScoreProgressBarContainer>
      <ProgressBarContainer>
        <ScoreFill width={progress} score={score} />
      </ProgressBarContainer>
      <ScoreText score={animatedScore}>{animatedScore}/100</ScoreText>
    </ScoreProgressBarContainer>  
  );
};

export default ScoreProgressBar;










// const ProgressBar = ({ score }) => {
//   const [animatedScore, setAnimatedScore] = useState(0);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 1000; // 1 second
//     const stepTime = 10;
//     const step = score / (duration / stepTime);

//     const interval = setInterval(() => {
//       start += step;
//       if (start >= score) {
//         start = score;
//         clearInterval(interval);
//       }
//       setAnimatedScore(Math.round(start));
//     }, stepTime);

//     // Delay progress update slightly for smooth animation
//     setTimeout(() => {
//       setProgress(score);
//     }, 200);

//     return () => clearInterval(interval);
//   }, [score]);

//   return (
//     <div>
//       <ProgressBarContainer>
//         <ProgressFill width={progress} score={score} />
//       </ProgressBarContainer>
//       <ScoreText>{animatedScore}%</ScoreText>
//     </div>
//   );
// };

// export default ProgressBar;

