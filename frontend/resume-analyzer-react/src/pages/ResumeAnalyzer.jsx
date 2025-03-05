import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircularScoreIndicator from "../components/CircularScoreIndicator";
import ScoreProgressBar from "../components/ScoreProgressBar";

// Mock Resume Analysis Data
const mockAnalysis = {
  filename: "zchua_resume_software.pdf",
  analysis: {
    score: 85,
    feedback:
      "This is a well-structured resume that effectively highlights the candidate's skills and experience. The inclusion of specific projects and internships, along with quantifiable achievements, makes the resume compelling. The use of keywords relevant to computer science roles is also a strong point. Contact information is clear and professional.",
    suggestions: [
      "While GPA is good, explicitly stating the grading scale (e.g., 'GPA: 4.18/5.00') can further clarify the achievement.",
      "In 'Academic Project' sections, quantifying accomplishments or impacts can strengthen the description.",
      "In 'Cloud Computing Project', consider mentioning the scale of the ecommerce data.",
      "In 'Multidisciplinary Design Project', elaborate on the specific task assessment for the robotic car.",
      "In the skills section, consider adding more specific libraries or tools used within each framework.",
      "Consider tailoring the resume to specific job descriptions, highlighting the most relevant projects and skills.",
    ],
  },
};




// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  // background-color: #f8f9fc;
  // background-color: blue;
`;

const AnalysisPanel = styled.div`
  // width: 50%;
  // height: 90vh;
  // // background-color: grey; 
  // // margin: 2em;  
  // padding: 2em;
  // background-color: white;
  // // display: flex;
  // // flex-direction: column;
  // justify-content: center;
  // // gap: 20px;
  // box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  // overflow: auto;

  // width: 50%;
  padding: 2em;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Keeps space between items */
  // box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);

  height: 90%; /* Keeps it constrained */
  overflow-y: auto; /* Enables vertical scrolling if needed */


`;

const ResumeViewerPanel = styled.div`
  width: 50%;
  height: 90%; /* Keeps it constrained */
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  // box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Progress Bar Container
const ProgressContainer = styled.div`
  width: 80%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  bottom: 20px;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease-in-out;
`;

// File Upload Section
const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #ccc;
  background: #f9f9f9;
  border-radius: 12px;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

// PDF Viewer using iframe
const PdfViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
`;

const ScoreDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: start;
  width: 100%;
  // box-sizing: border-box;
`;

// Table Styles
const SuggestionTable = styled.table`
  width: 100%;
  // border-collapse: collapse;
  margin-top: 15px;
  background: #f1f3f5;
  border-radius: 8px;
  // overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;


const Feedback = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  background: #f8f9fc;
  padding: 15px;
  border-radius: 8px;
  box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
`;

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setUploading(true);
      setProgress(0);

      const fileURL = URL.createObjectURL(uploadedFile);

      // Simulate Progress Bar Increase
      let progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(progressInterval);
            setUploading(false);
            setFile(fileURL);
            return 100;
          }
          return oldProgress + 50; // Increase by 20% every 400ms (total ~2 seconds)
        });
      }, 400);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleAnalyze = () => {
    if (file) {
      setAnalyzed(true);
    }
  };

  return (
    <PageContainer>
      {/* Left Side - Resume Score Analysis */}
      <AnalysisPanel>
        {!analyzed ? (
          <UploadSection>
            <h2>Upload Your Resume (PDF Only)</h2>
            <input type="file" accept="application/pdf" onChange={handleUpload} />
            <UploadButton onClick={handleAnalyze} disabled={!file}>
              Analyze
            </UploadButton>
          </UploadSection>
        ) : (
          <ScoreDisplayContainer>
            <h2>Resume Score: 85/100</h2>
            <CircularScoreIndicator score={85}/>
            
            <p>Your resume is well-structured and effectively highlights key skills.</p>
            <ScoreProgressBar score={75} />
            <Feedback>{mockAnalysis.analysis.feedback}</Feedback>
            {/* Suggestions Table */}
            <h4>Suggestions for Improvement:</h4>
            <SuggestionTable>
              <thead>
                <tr>
                  <TableHeader>No.</TableHeader>
                  <TableHeader>Suggestion</TableHeader>
                </tr>
              </thead>
              <tbody>
                {mockAnalysis.analysis.suggestions.map((suggestion, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{suggestion}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </SuggestionTable>

          </ScoreDisplayContainer>
        )}
      </AnalysisPanel>

      {/* Right Side - PDF Viewer with Progress Bar */}
      {false && <ResumeViewerPanel>
        {uploading ? (
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
        ) : file ? (
          <PdfViewer src={`${file}#toolbar=0&view=fitH`} />
        ) : (
          <p>Upload a PDF to Preview</p>
        )}
      </ResumeViewerPanel>}
    </PageContainer>
  );
};

export default ResumeAnalyzer;
