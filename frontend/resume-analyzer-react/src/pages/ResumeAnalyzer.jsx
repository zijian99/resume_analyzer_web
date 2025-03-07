import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import CircularScoreIndicator from "../components/CircularScoreIndicator";
import ScoreProgressBar from "../components/ScoreProgressBar";
import loadingGIF from "../assets/loading.gif"

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
  background-color: white;
  padding: 0 2em;  /* Add padding */
  box-sizing: border-box; /* Ensures padding doesn't affect the total height */
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

  min-width: 50%;
  padding: 2em;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Keeps space between items */
  // box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);

  height: 90%; /* Keeps it constrained */
  // overflow-y: auto; /* Enables vertical scrolling if needed */


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


const ReturnButton = styled.button`
  align-self: flex-start; /* Aligns to the left inside ScoreDisplayContainer */
  background: white;
  color: black;
  border: 2px solid black;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  // margin-bottom: 10px; /* Adds space below the button */

  &:hover {
    opacity: 0.8;
    color: #5f30e2;
    border: 2px solid #5f30e2;
  }
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

// ** Loading Animation **
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Spinner = styled.div`
  border: 6px solid #ddd;
  border-top: 6px solid #007bff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(true); // ** Show loading animation **
      
      setTimeout(() => {
        console.log("Analysis complete, hiding loading screen...");
        setLoading(false);
        setAnalyzed(true);
      }, 2000);
    }
  };

  const handleReturn = () => {
    setAnalyzed(false);
    setFile(null);
    setProgress(0);
  }

  return (
    <>
    {/* Show Full-Screen Loading when Analyzing */}
    {loading && (
      <LoadingScreen>
       <img style={{width:"100px", height:"100px"}} src={loadingGIF} alt=""/>
      </LoadingScreen>
    )}
    {!loading &&
    <PageContainer>
      {/* Left Side - Resume Score Analysis */}
      <AnalysisPanel>
        {!analyzed ? (
          
          <UploadSection>
            {/* <h1 style={{color:"#5f30e2"}}>Resume Analyzer</h1> */}
            <h2>Upload Your Resume (PDF Only)</h2>
            <input type="file" accept="application/pdf" onChange={handleUpload} />
            <UploadButton onClick={handleAnalyze} disabled={!file}>
              Analyze
            </UploadButton>
          </UploadSection>
        ) : (
          <ScoreDisplayContainer>
            <ReturnButton onClick={handleReturn}>{"<<"} Upload Again</ReturnButton>
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
      {!analyzed && <ResumeViewerPanel>
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

  }
  </>
  );
};

export default ResumeAnalyzer;
