import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import TextToolbar from "../components/GrammarCheckerComponent/TextToolbar";
import GrammarSideMenu from "../components/GrammarCheckerComponent/GrammarSideMenu";


const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 90vh; /* Full viewport height */
  background-color: white;
  overflow: hidden; /* Prevents page scroll */
`;

const EditorPanel = styled.div`
  flex: 1;
  padding: 2em;
  top: 10%;
  // margin-left: 2em;
  border-radius: 20px;
  overflow-y: auto;  /* Enables scrolling */
  height: 70vh;   /* Ensures it takes full viewport height */
  margin-bottom: 5%;
  // max-height: 100vh; /* Prevents exceeding screen height */
`;

const TextEditor = styled.div`
  flex: 1;
  padding: 40px;
  background: white;
  font-size: 18px;
  line-height: 1.8;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  // position: relative;
  // overflow-y: auto; /* Enables scrolling */
  max-height: 80vh; /* Ensures proper scrolling */
  padding-bottom: 20%;

  &:focus {
    border: none;
    box-shadow: none;
  }

  &[data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: gray;
    position: absolute;
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
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: left 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")}; /* Hide when closed */
`;


const FloatingButton = styled.button`
  z-index: 10;
  position: fixed;
  bottom: 20px;
  right: 8%;
  background: #28a745;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s;
  
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
  margin: 1em;
  color: #333;
  // margin-bottom: 20px; /* Spacing between title and content */
`;


const GrammarChecker = () => {
  const [userText, setUserText] = useState("");
  const [textAnalysis, setTextAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    // Ensure placeholder shows when content is empty
    if (editorRef.current && userText.trim() === "") {
      editorRef.current.innerHTML = "";
    }
  }, [userText]);


  const checkText = async () => {
    if (!userText.trim()) return;
    
    setLoading(true);
    setMenuOpen(true); // Auto open menu on results
  
    const startTime = Date.now(); // Start timing
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/check_text/", { text: userText });
      
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
  

  const getHighlightedText = (textAnalysis) => {
    if (!textAnalysis) return null;
    let { corrected_text, spelling_errors, grammar_errors } = textAnalysis;
    let corrections = [...spelling_errors, ...grammar_errors];

    corrections.sort((a, b) => b.corrected.length - a.corrected.length);

    const regexPattern = new RegExp(
      corrections.map(({ corrected }) => `(${corrected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`).join("|"),
      "gi"
    );

    return corrected_text.split(regexPattern).map((part, index) =>
      corrections.some(({ corrected }) => corrected === part) ? <Highlight key={index}>{part}</Highlight> : part
    );
  };

  const replaceWithCorrectedText = () => {
    if (textAnalysis && textAnalysis.corrected_text) {
      setUserText(textAnalysis.corrected_text);
      if (editorRef.current) {
        editorRef.current.innerText = textAnalysis.corrected_text; // Update editor content
      }
    }
  };
  
  const handleInput = (e) => {
    let text = e.target.innerText;
    let words = text.trim().split(/\s+/).filter(word => word.length > 0); // Count words properly
  
    if (words.length <= 1000) {
      setUserText(text);
    } else {
      e.target.innerText = userText; // Prevents adding extra words
      alert("Word limit reached (1000 words).");
    }
  };
  
  

  return (
    <PageContainer>
      {/* Left Side - Full Page Editor */}
      <EditorPanel>
        <PageTitle>Grammar & Spelling Checker</PageTitle>
        {/* <Divider/> */}
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

      {/* Floating Check Button */}
      <FloatingButton onClick={checkText} disabled={!userText.trim() || loading}>
        ✧ Check Your Spelling & Grammar Error ✧
      </FloatingButton>

      <TextToolbar userText={userText}/>


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
