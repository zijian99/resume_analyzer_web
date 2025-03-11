import React from "react";
import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const MarqueeContainer = styled.div`
//   top: 20%;
  overflow: hidden;
  white-space: nowrap;
//   background: white;
  color: white;
  padding: 10px 0;
  font-size: 16px;
  position: relative;
`;

const MarqueeText = styled.div`
  display: inline-block;
  font-weight: bold;
  padding-left: 100%;
  animation: ${scroll} 30s linear infinite;
`;

const AnnouncementMarquee = ({ message }) => {
  return (
    <MarqueeContainer>
      <MarqueeText>{message}</MarqueeText>
    </MarqueeContainer>
  );
};

export default AnnouncementMarquee;
