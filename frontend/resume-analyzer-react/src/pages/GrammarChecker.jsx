import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import TextToolbar from "../components/GrammarCheckerComponent/TextToolbar";
import GrammarSideMenu from "../components/GrammarCheckerComponent/GrammarSideMenu";


const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 90vh; 
  overflow: hidden; /* Prevents page scroll */

  background-color: white;
`;

const EditorPanel = styled.div`
  flex: 1;
  height: 70vh;
  top: 10%;

  border-radius: 20px;

  overflow-y: auto;  /* Enables scrolling */
     
  margin-bottom: 5%;
  padding: 2em;
`;

const TextEditor = styled.div`
  flex: 1;
  max-height: 80vh; /* Ensures proper scrolling */
  
  background: white;

  font-size: 18px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;

  padding: 40px;
  padding-bottom: 20%; /*Ensure bottom text won't be covered by toolbar*/

  &:focus {
    border: none;
    box-shadow: none;
  }

  &[data-placeholder]:empty::before {
    content: attr(data-placeholder);
    position: absolute;
    color: gray;
    pointer-events: none;
  }
`;

const ToggleButton = styled.button`
  position: absolute;

  right: 37%;
  top: 50%;
  transform: translateY(-50%);

  background: white;
  color: black;
  border: 1px solid black;
  
  cursor: pointer;
  border-radius: 5px;

  transition: left 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")}; /* Hide when closed */

  padding: 10px;
`;


const FloatingButton = styled.button`
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 8%;

  background: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  
  transition: background 0.3s;
  
  padding: 15px;

  &:hover {
    background: #218838;
  }
`;

const Highlight = styled.span`
  background-color: yellow;
  font-weight: bold;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;

  margin: 1em;
`;


const GrammarChecker = () => {
  const [userText, setUserText] = useState("");
  const [textAnalysis, setTextAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const editorRef = useRef(null);

  // Ensure placeholder shows when content is empty
  useEffect(() => {  
    if (editorRef.current && userText.trim() === "") {
      editorRef.current.innerHTML = "";
    }
  }, [userText]);


  // Handle when user input text
  const handleInput = (e) => {

    let text = e.target.innerText;
    // Counting Words
    let words = text.trim().split(/\s+/).filter(word => word.length > 0); 
  
    if (words.length <= 1000) {
      setUserText(text);
    } else {
      // Prevents adding extra words
      e.target.innerText = userText; 
      alert("Word limit reached (1000 words).");
    }
    
  };


  // Check for grammar & spelling error via API and show result in sidebar
  const checkText = async () => {

    if (!userText.trim()) 
      return;
    
    // Show loading screen at sidebar
    setLoading(true);
    setMenuOpen(true); 
  
    const startTime = Date.now(); 
    
    try {
      // CHANGE LOCAL/LIVE HERE
      // const response = await axios.post("http://127.0.0.1:8000/check_text/", { text: userText });
      const response = await axios.post("https://resume-analyzer-genai-fastapi.onrender.com/check_text/", { text: userText });
      
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(1000 - elapsedTime, 0); // Ensure at least 1s total delay
  
      setTimeout(() => {
        setTextAnalysis(response.data);
        setLoading(false);
      }, delay);

    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("Failed to analyze text. Please try again.");

      setLoading(false);
    }
  };
  

  // Highlight changes on text based on original text to show in sidebar
  const getHighlightedText = (textAnalysis) => {
    if (!textAnalysis) 
      return null;

    let { corrected_text, spelling_errors, grammar_errors } = textAnalysis;
    let corrections = [...spelling_errors, ...grammar_errors];

    corrections.sort((a, b) => b.corrected.length - a.corrected.length);

    const regexPattern = new RegExp(
      corrections.map(({ corrected }) => `(${corrected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`).join("|"),
      "gi"
    );

    // Highlight the corrected text part
    return corrected_text.split(regexPattern).map((part, index) =>
      corrections.some(({ corrected }) => corrected === part) ? <Highlight key={index}>{part}</Highlight> : part
    );
  };


  // Function to replace user input textarea with corrected text
  const replaceWithCorrectedText = () => {

    if (textAnalysis && textAnalysis.corrected_text) {
      setUserText(textAnalysis.corrected_text);
      
      if (editorRef.current) {
        // Update editor content
        editorRef.current.innerText = textAnalysis.corrected_text; 
      }
      
    }
  };
  
  

  return (
    <PageContainer>
      {/* Left Side - Full Page Editor */}
      <EditorPanel>
        <PageTitle>Grammar & Spelling Checker</PageTitle>
        <TextEditor
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Start writing here..."
          onInput={handleInput}
        />
      </EditorPanel>
      
      {/* Toggle Button */}
      {/* <ToggleButton isOpen={menuOpen} onClick={() => setMenuOpen(false)}>
        <FiChevronLeft size={20} />
      </ToggleButton> */}

      <TextToolbar userText={userText}/>

      {/* Floating Check Button */}
      <FloatingButton onClick={checkText} disabled={!userText.trim() || loading}>
        ✧ Check Your Spelling & Grammar Error ✧
      </FloatingButton>


      {/* Right Side - Side Menu */}
      <GrammarSideMenu
        isOpen={menuOpen}
        loading={loading}
        textAnalysis={textAnalysis}
        replaceWithCorrectedText={replaceWithCorrectedText}
        getHighlightedText={getHighlightedText}
      />

    </PageContainer>
  );
};

export default GrammarChecker;
