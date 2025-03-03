import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import logo1 from "../../src/assets/logo_example/logoex1.gif";
import logo2 from "../../src/assets/logo_example/logoex2.jpg";
import logo3 from "../../src/assets/logo_example/logoex3.gif";
import logo4 from "../../src/assets/logo_example/logoex4.jpg";
import logo5 from "../../src/assets/logo_example/logoex5.jpg";
import logo6 from "../../src/assets/logo_example/logoex6.jpg";
import logo7 from "../../src/assets/logo_example/logoex7.jpg";
import logo8 from "../../src/assets/logo_example/logoex8.gif";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";


const CarouselContainer = styled.div`
    padding: 5em;
    display: flex;
    flex-direction: column;

`;

const SliderContainer = styled.div`
  overflow: hidden;
  padding: 60px 0;
  background: white;
  white-space: nowrap;
  border-radius: 20px;
  position: relative;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    content: "";
    z-index: 2;
  }
//   animation-play-state: ${(props) => (props.isPaused ? "paused" : "")};
  &:before {
    left: 0;
    // background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
  }

  &:after {
    right: 0;
    // background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
  }

//   &:hover .slideTrack {
//     animation-play-state: paused;
//   }

  & .slideTrack {
    animation-play-state: ${(props) => (props.isPaused === true ? "paused" : "running")};
  }
`;

const SlideTrack = styled.div`
  display: inline-block;
  animation: ${(props) => (props.isPaused ? "none" : "20s slide infinite linear")};

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const Logo = styled.img`
  height: 100px;
  margin: 0 40px;
`;

const PauseButton = styled.button`
  align-self: flex-start; /* Keeps button on the left */
  cursor: pointer;
  border: none;
  background-color: white;
`;

const Text = styled.div`
    font-size: 20px;
    align-items: center;
    text-align: center;
    color: grey;
`;

const LogoCarousel = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Clone the logos for seamless infinite scrolling
    const container = carouselRef.current;
    const clone = container.children[0].cloneNode(true);
    container.appendChild(clone);
  }, []);

  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
  ];

  return (
    <CarouselContainer>
    <Text>Trusted by 0 organization and 0 people</Text>
    <SliderContainer ref={carouselRef} isPaused={isPaused}>
        <SlideTrack className="slideTrack" >
          {logos.map((logo, index) => (
            <Logo key={index} src={logo} alt={`Logo ${index + 1}`} />
          ))}
        </SlideTrack>
      </SliderContainer>
    <PauseButton onClick={() => setIsPaused(!isPaused)}>
    {isPaused ? <FaRegCirclePlay size={32} /> : <FaRegCirclePause size={32}  />}
  </PauseButton>
  </CarouselContainer>
    
  );
};

export default LogoCarousel;





