import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import loadingGIF from "../assets/loading.gif"
import { FiChevronLeft } from "react-icons/fi"; // Import a clean arrow icon
import ResumeAnalyzeResult from "../components/ResumeAnalyzerComponent/ResumeAnalyzeResult";
import ResumeAnalyzeResultDemo from "../components/ResumeAnalyzerComponent/ResumeAnalyzeResultDemo";


// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: white;
  padding: 0 2em;  /* Add padding */ 
  box-sizing: border-box; /* Ensures padding doesn't affect the total height */
`;

const AnalysisPanel = styled.div`
  min-width: 50%;
  flex-grow:1;
  margin: 1em;
  // padding: 2em;
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

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns all content to the left */
  width: 100%;
  
  // // box-sizing: border-box;
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

const FloatingBackButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #007bff;
  border: 2px solid #007bff;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.8;

  }
`;


const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [textAnalysis, setTextAnalysis] = useState(null);


  const handleAnalyzeDemo = () => {
    if (file) {
      setLoading(true); // ** Show loading animation **
      
      setTimeout(() => {
        console.log("Analysis complete, hiding loading screen...");
        setLoading(false);
        setAnalyzed(true);
      }, 2000);
    }
  };

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
  
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setUploading(true);
      setProgress(0);
  
      // Generate a URL to preview the file
      const fileURL = URL.createObjectURL(uploadedFile);
      
      setFile({ raw: uploadedFile, preview: fileURL }); // Store both raw file and preview URL
  
      // Simulate progress bar
      let progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(progressInterval);
            setUploading(false);
            return 100;
          }
          return oldProgress + 50;
        });
      }, 400);
    } else {
      alert("Only PDF files are allowed.");
    }
  };
  
  
  
  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("file", file.raw); // Ensure it's the actual File object
      
      // CHANGE LOCAL/LIVE HERE
      // const result = await axios.post("http://127.0.0.1:8000/upload_resume/", formData, {
      //   headers: { "Accept": "application/json" },
      // });
      const result = await axios.post("https://resume-analyzer-genai-fastapi.onrender.com/upload_resume/", formData, {
        headers: { "Accept": "application/json" },
      });
      
  
      setLoading(false);
  
      if (result.data && result.data.analysis) {
        console.log(result.data)
        console.log(result.data.analysis)

        setTextAnalysis(result.data.analysis);
        setAnalyzed(true);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error analyzing resume:", error.response?.data || error.message);
      alert("Failed to analyze resume. Please try again.");
      setLoading(false);
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
            {/* <UploadButton onClick={handleAnalyzeDemo} disabled={!file}>
              AnalyzeDemo
            </UploadButton> */}
          </UploadSection>
        ) : (
          <ResultContainer>
            <ResumeAnalyzeResult textAnalysis={textAnalysis}/>
            {/* <ResumeAnalyzeResultDemo/> */}
            <FloatingBackButton onClick={handleReturn}>
              <FiChevronLeft size={24} />
              Back to Upload Again
            </FloatingBackButton>
          </ResultContainer>
        )}
      </AnalysisPanel>



      {/* Right Side - PDF Viewer with Progress Bar */}
      {!analyzed && <ResumeViewerPanel>
        {uploading ? (
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
        ) : file ? (
          <PdfViewer src={file?.preview ? `${file.preview}#toolbar=0&view=fitH` : ""} />
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
