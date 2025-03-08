import React from "react";
import styled from "styled-components";
import CircularScoreIndicator from "./CircularScoreIndicator";

const mockData = {
  filename: "zchua_resume_software.pdf",
  analysis: {
    score: 78,
    content_score: 80,
    format_score: 85,
    sections_score: 75,
    skills_score: 80,
    ats_parse_rate: 90,
    analysis: [
      {
        category: "Content Suggestions",
        feedback: "The resume effectively highlights relevant projects and internships. The use of action verbs is good.",
        suggestions: "Quantify accomplishments whenever possible (e.g., 'Improved data retrieval time by X%'). Consider adding a brief summary or objective statement at the beginning to highlight key skills and career goals."
      },
      {
        category: "Spelling & Grammar",
        feedback: "The resume appears to be free of major spelling and grammatical errors.",
        suggestions: "Proofread carefully, paying attention to articles (a/an/the) and subject-verb agreement. Use tools like Grammarly to ensure accuracy."
      },
      {
        category: "Resume Length",
        feedback: "The resume is a good length for someone with your experience level.",
        suggestions: "Ensure that all content is relevant and high-impact. Remove any redundant information."
      },
      {
        category: "Personal Details",
        feedback: "Contact information is clearly presented, including links to GitHub and LinkedIn.",
        suggestions: "Ensure that the links are working and up-to-date. Consider adding your location (city, state) for clarity."
      },
      {
        category: "Formatting Tips",
        feedback: "The resume is well-formatted and easy to read.",
        suggestions: "Use consistent formatting throughout (e.g., date formats, bullet point styles). Consider using a professional resume template to enhance visual appeal."
      }
    ]
  }
};

const categoryIcons = {
  "Content Suggestions": "✅",  // Check mark for good content
  "Spelling & Grammar": "🔤",  // Letters for spelling & grammar
  "Resume Length": "📄",  // Document icon for resume length
  "Personal Details": "🆔",  // ID card for personal details
  "Formatting Tips": "🎨"  // Paint palette for formatting
};

const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: white;
  padding: 2em;
  box-sizing: border-box;
`;

const ScorePanel = styled.div`
  width: 25%;
  min-width: 250px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 10%;
  align-self: flex-start;
`;

const AnalysisPanel = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ScoreIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0;
  font-size: 16px;
`;

const ScoreValue = styled.span`
  display: inline-block;
  min-width: 40px;
  padding: 4px 10px;
  border-radius: 20px;
  text-align: center;
  background-color: ${({ score }) =>
    score >= 80 ? "rgba(0, 128, 0, 0.2)" :
    score >= 50 ? "rgba(255, 165, 0, 0.2)" :
                 "rgba(255, 0, 0, 0.2)"};
  color: ${({ score }) =>
    score >= 80 ? "green" :
    score >= 50 ? "orange" :
                 "red"};
`;

const Divider = styled.hr`
  border: none;
  height: 0.5px;
  background-color: #ddd;
  margin: 12px 0;
`;

const AnalysisSection = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background: green;
    border-radius: 5px;
  }
`;
 
const ResumeAnalyzeResult = () => {
  const { analysis } = mockData;

  return (
    <PageContainer>
      {/* Sticky Score Panel */}
      <ScorePanel>
        <h3>Your Score</h3>
        <ScoreIndicatorWrapper>
          <CircularScoreIndicator score={analysis.score} />
        </ScoreIndicatorWrapper>
        <Divider />
        
        <ScoreItem>
          <span>Content</span> <ScoreValue score={analysis.content_score}>{analysis.content_score}%</ScoreValue>
        </ScoreItem>
        <ScoreItem>
          <span>Format</span> <ScoreValue score={analysis.format_score}>{analysis.format_score}%</ScoreValue>
        </ScoreItem>
        <ScoreItem>
          <span>Sections</span> <ScoreValue score={analysis.sections_score}>{analysis.sections_score}%</ScoreValue>
        </ScoreItem>
        <ScoreItem>
          <span>Skills</span> <ScoreValue score={analysis.skills_score}>{analysis.skills_score}%</ScoreValue>
        </ScoreItem>
      </ScorePanel>

      {/* Scrollable Analysis Panel */}
      <AnalysisPanel>
        <AnalysisSection>
          <h3>📘 ATS PARSE RATE</h3>
          <p>
            An <strong>Applicant Tracking System</strong> (ATS) is used by employers and recruiters to quickly scan resumes.
          </p>
          <ProgressBar progress={analysis.ats_parse_rate} />
          <h4>Great!</h4>
          <p>We parsed {analysis.ats_parse_rate}% of your resume successfully using an industry-leading ATS.</p>
        </AnalysisSection>

        {analysis.analysis.map((item, index) => (
          <AnalysisSection key={index}>
            <h3>
              {categoryIcons[item.category]} {item.category}
            </h3>
            <p><strong>Feedback:</strong></p>
            <p>{item.feedback}</p>
            <p><strong>Suggestions:</strong></p>
            <p>{item.suggestions}</p>
          </AnalysisSection>
        ))}

      </AnalysisPanel>
    </PageContainer>
  );
};

export default ResumeAnalyzeResult;
