import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fc;
`;

const AnalysisPanel = styled.div`
  width: 50%;
  padding: 40px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ResumeViewerPanel = styled.div`
  width: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
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

const Home = () => {
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
          return oldProgress + 20; // Increase by 20% every 400ms (total ~2 seconds)
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
          <>
            <h2>Resume Score: 85/100</h2>
            <p>Your resume is well-structured and effectively highlights key skills.</p>
          </>
        )}
      </AnalysisPanel>

      {/* Right Side - PDF Viewer with Progress Bar */}
      <ResumeViewerPanel>
        {uploading ? (
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
        ) : file ? (
          <PdfViewer src={`${file}#toolbar=0&view=fitH`} />
        ) : (
          <p>Upload a PDF to Preview</p>
        )}
      </ResumeViewerPanel>
    </PageContainer>
  );
};

export default Home;
