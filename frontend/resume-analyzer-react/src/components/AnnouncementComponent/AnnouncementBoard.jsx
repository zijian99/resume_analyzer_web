import React, { useState, useEffect } from "react";
import styled from "styled-components";

const slides = [
  "src/assets/2.png",
  "src/assets/news1.jpg",
  "src/assets/news2.png",
];

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
//   background: grey;
  color: white;
  font-family: Arial, sans-serif;
`;

const LeftPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  padding: 3em;
  position: relative;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  display: flex;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  object-fit: cover;
  transition: transform 0.8s ease-in-out;
`;

const RightPanel = styled.section`
  flex: 1.2;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #555;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Tab = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  color: ${(props) => (props.active ? "white" : "rgb(198, 198, 198)")};
  border-bottom: ${(props) => (props.active ? "2px solid white" : "none")};
`;

const Announcements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const AnnouncementItem = styled.div`
//   font-size: 14px;
//   padding: 8px;
//   border-bottom: 1px solid #444;
//   color: rgb(198, 198, 198);
//   cursor: pointer;
//   &:hover {
//     color:rgb(255, 255, 255);
//   }
// `;

const ViewMore = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  &:hover {
    background:rgba(196, 196, 196, 0.5);
    // border-color: #f39c12;
  }
`;

const Indicators = styled.div`
  display: flex;
  // justify-content: center;
  margin-left: 40%;
  gap: 10px;
  margin-top: 10px;
`;

const Indicator = styled.div`
  width: ${(props) => (props.active ? "124px" : "8px")};
  height: 8px;
  background: ${(props) => (props.active ? "#34ebd8" : "#bbb")};
  transition: 
    width ${(props) => (props.active ? "1s cubic-bezier(0.4, 0, 0.2, 1)" : "0s")},
    background 0.1s ease-in;
  // border-radius: 3px;
  transform-origin: left;
`;

const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px;
  border-bottom: 1px solid #444;
  color: rgb(198, 198, 198);
  cursor: pointer;
  &:hover {
    color: rgb(255, 255, 255);
  }
`;

const DateText = styled.div`
  flex-shrink: 0;
  width: 100px; /* Adjust as needed */
  color: white;
`;

const AnnouncementText = styled.div`
  flex-grow: 1;
  padding-left: 10px;
`;

// const announcementsData = {
//   Updates: [
//     { date: "2025/03/10", text: "3月10日外挂封禁名单" },
//     { date: "2025/03/05", text: "角色补给 | 天光驰物" },
//   ],
//   Announcement: [
//     { date: "2025/01/31", text: "补给概率公示" },
//   ],
//   Event: [
//     { date: "2025/03/01", text: "春季特别活动开启" },
//   ],
//   News: [
//     { date: "2025/03/05", text: "装备补给 | 飞游星&花火·诡戏干役" },
//   ],
// };

const announcementsData = {
    Updates: [
      { date: "2025/03/10", text: "Enhanced AI scoring algorithm deployed for better resume evaluation." },
      { date: "2025/03/07", text: "Improved PDF parsing: More accurate extraction of skills and experience!" },
      { date: "2025/03/05", text: "New feature: Resume comparison with top industry resumes now available!" },
    ],
    Announcement: [
      { date: "2025/02/25", text: "We’ve revamped our UI for a more seamless resume review process!" },
      { date: "2025/02/15", text: "System maintenance scheduled on February 20th, 2025, from 2 AM to 4 AM (UTC)." },
      { date: "2025/01/31", text: "Introducing multi-language support: Analyze resumes in English, French, and Spanish!" },
      { date: "2025/01/20", text: "We now support ATS-friendly resume checks to improve job application success rates." },
    ],
    Event: [
      { date: "2025/03/10", text: "Join our Resume Optimization Webinar and learn how to improve your CV!" },
      { date: "2025/03/05", text: "Exclusive Q&A with hiring managers: What do they look for in a resume?" },
      { date: "2025/03/01", text: "Spring Resume Challenge: Submit your CV for expert review and feedback." },
      { date: "2025/02/20", text: "Live Demo: How to craft the perfect resume for software engineers." },
    ],
    News: [
      { date: "2025/03/05", text: "Resume Analyzer surpasses 10,000 analyzed resumes milestone!" },
      { date: "2025/03/03", text: "Featured on TechReview: 'Top AI Tools for Job Seekers in 2025'." },
      { date: "2025/02/28", text: "Now integrated with LinkedIn: Analyze your profile and get resume recommendations." },
      { date: "2025/02/18", text: "85% of users see a higher interview success rate after using our tool!" },
    ],
  };
  
const AnnouncementBoard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Updates");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <Container>
      <LeftPanel aria-label="Slideshow">
        <SlideContainer>
          {slides.map((src, index) => (
            <SlideImage
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ transform: `translateX(${-100 * currentIndex}%)` }}
            />
          ))}
          
        </SlideContainer>
        <Indicators>
          {slides.map((_, index) => (
            <Indicator key={index} active={currentIndex === index} />
          ))}
        </Indicators>

      </LeftPanel>
      <RightPanel>
        <Tabs>
          {Object.keys(announcementsData).map((tab) => (
            <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </Tab>
          ))}
        </Tabs>
        <Announcements>
            {announcementsData[activeTab].map((item, index) => (
            <AnnouncementItem key={index}>
                <DateText>{item.date}</DateText>
                <AnnouncementText>{item.text}</AnnouncementText>
            </AnnouncementItem>
            ))}
        </Announcements>
        <ViewMore>View More</ViewMore>
      </RightPanel>
    </Container>
  );
};

export default AnnouncementBoard;
