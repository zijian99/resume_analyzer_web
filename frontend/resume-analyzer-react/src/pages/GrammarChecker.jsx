import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi"; // Icons
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiOutlineStrikethrough, AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";  // Loading Spinner
import loadingGIF from "../assets/loading.gif"


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
  top:10%;
  // margin-left: 2em;
  border-radius: 20px;
  overflow-y: auto;  /* Enables scrolling */
  // overflow: auto;  /* Allows scrolling */
  height: 70vh;   /* Ensures it takes full viewport height */
  margin-bottom: 5%;
  // max-height: 100vh; /* Prevents exceeding screen height */
`;

const SideMenu = styled.div`
  width: ${(props) => (props.isOpen ? "35%" : "0")};
  transition: width 0.3s ease-in-out;
  background: white;
  border-left: 1px solid #ddd;
  padding: 20px;
  padding-bottom: 5%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  align-self: stretch; /* Allows it to fill height */
  overflow-y: auto; /* Enables scrolling */
  max-height: 80vh; /* Prevents overflow */
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



// Styled Components
// const PageContainer = styled.div`
//   // display: flex;
//   // width: 100%;
//   // min-height: 90vh;
//   // background-color: #f8f9fc;
//   // // overflow: hidden; /* Prevents entire page from scrolling */
//   // position: relative;
//   // overflow: auto;

//   display: flex;
//   align-items: flex-start;
//   width: 100%;
//   min-height: 90vh;
//   background-color: white;

//   box-sizing: border-box;
// `;


// const EditorPanel = styled.div`
//   flex: 1;
//   padding: 40px;
//   background: white;
//   font-size: 18px;
//   line-height: 1.8;
//   outline: none;
//   white-space: pre-wrap;
//   word-wrap: break-word;
//   position: relative;

//   &:focus {
//     border: none;
//     box-shadow: none;
//   }

//   &[data-placeholder]:empty::before {
//     content: attr(data-placeholder);
//     color: gray;
//     position: absolute;
//     pointer-events: none;
//   }
// `;

// const EditorPanel = styled.div`
//   // flex: 1;
//   // display: flex;
//   // flex-direction: column;
//   // overflow: hidden; /* Prevents unwanted horizontal scrolling */
//   // background: white;

//   flex: 1;
//   padding: 2em;
//   margin-left: 2em;
//   border-radius: 20px;
// Subtle border to enhance glass effect */


// `;

// const SideMenu = styled.div`
//   // width: ${(props) => (props.isOpen ? "35%" : "0")};
//   // transition: width 0.3s ease-in-out;
//   // background: white;
//   // border-left: 1px solid #ddd;
//   // // display: flex;
//   // // flex-direction: column;
//   // position: sticky;
//   // align-self: flex-start;
  
//   // /* Enable scrolling inside SideMenu */
//   overflow-y: auto;
//   // min-height: 90vh; /* Ensures it doesn't overflow the screen */
//   // padding: ${(props) => (props.isOpen ? "20px" : "0")};
//   // padding-bottom: 10%;

//   width: ${(props) => (props.isOpen ? "35%" : "0")};
//   transition: width 0.3s ease-in-out;
//   // min-width: 250px;
//   background: white;
//   border-left: 1px solid #ddd;
//   padding: 20px;
//   padding-bottom: 10%;
//   // border-radius: 12px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   position: sticky;
//   top: 10%;
//   align-self: flex-start;
// `;


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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background-color: #f8f9fc;
  font-weight: bold;
  border: 1px solid #ddd;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: white;
`;

const Highlight = styled.span`
  background-color: yellow;
  font-weight: bold;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: #ddd;
  margin: 1px;
`;




const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 1em;
  color: #333;
  // margin-bottom: 20px; /* Spacing between title and content */
`;

// const TextEditor = styled.div`
//   flex: 1;
//   padding: 40px;
//   background: white;
//   font-size: 18px;
//   line-height: 1.8;
//   outline: none;
//   white-space: pre-wrap;
//   word-wrap: break-word;
//   position: relative;
//   padding-bottom: 20%;

//   &:focus {
//     border: none;
//     box-shadow: none;
//   }

//   &[data-placeholder]:empty::before {
//     content: attr(data-placeholder);
//     color: gray;
//     position: absolute;
//     pointer-events: none;
//   }
// `;

const CorrectedText = styled.p`
  line-height: 1.8;  /* Adjust for better readability */
  white-space: pre-wrap; /* Ensures new lines are preserved */
  word-wrap: break-word;  /* Prevents overflow */
  font-size: 18px;
  color: #333;
  padding: 10px 0;
`;

const Toolbar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 30%;
  transform: translateX(-50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 1000;
`;

const ToolbarButton = styled.button`
  background: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const WordCount = styled.span`
  margin-left: auto;
  font-weight: bold;
  color: #333;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  background-color: #fcfcff;
`;

const ReplaceTextButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
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

      <Toolbar>
        <ToolbarButton onClick={() => document.execCommand('bold', false, null)}>
          <AiOutlineBold />
        </ToolbarButton>

        <ToolbarButton onClick={() => document.execCommand('italic', false, null)}>
          <AiOutlineItalic />
        </ToolbarButton>

        <ToolbarButton onClick={() => document.execCommand('underline', false, null)}>
          <AiOutlineUnderline />
        </ToolbarButton>

        <ToolbarButton onClick={() => document.execCommand('strikethrough', false, null)}>
          <AiOutlineStrikethrough />
        </ToolbarButton>

        <ToolbarButton onClick={() => document.execCommand('insertUnorderedList', false, null)}>
          <AiOutlineUnorderedList />
        </ToolbarButton>


        <WordCount>Words: {userText.trim().split(/\s+/).length}</WordCount>
      </Toolbar>


      {/* Right Side - Side Menu */}
      <SideMenu isOpen={menuOpen}>
        {loading ? (
          // Show a spinner or GIF while loading
          <LoadingScreen>
            <img style={{width:"100px", height:"100px"}} src={loadingGIF} alt=""/>
          </LoadingScreen>
        ) : textAnalysis ? (
          // Show results when available
          <>
            <h3>Corrected Text</h3>
            <CorrectedText>{getHighlightedText(textAnalysis)}</CorrectedText>

            <ReplaceTextButton onClick={replaceWithCorrectedText}>
              Replace with Corrected Text
            </ReplaceTextButton>


            <h4>Spelling Mistakes</h4>
            <Table>
              <thead>
                <tr>
                  <Th>Misspelled Word</Th>
                  <Th>Corrected Word</Th>
                </tr>
              </thead>
              <tbody>
                {textAnalysis.spelling_errors.map((error, index) => (
                  <tr key={index}>
                    <Td style={{ color: "red" }}>{error.original}</Td>
                    <Td style={{ fontWeight: "bold", color: "green" }}>{error.corrected}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h4>Grammar Mistakes</h4>
            <Table>
              <thead>
                <tr>
                  <Th>Original Text</Th>
                  <Th>Corrected Text</Th>
                  <Th>Suggestion</Th>
                </tr>
              </thead>
              <tbody>
                {textAnalysis.grammar_errors.map((error, index) => (
                  <tr key={index}>
                    <Td style={{ color: "red" }}>{error.original}</Td>
                    <Td style={{ fontWeight: "bold", color: "green" }}>{error.corrected}</Td>
                    <Td>{error.suggestion}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          // Show initial message when no analysis has been done
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>Start typing and press the button below to check your grammar.</p>
            <p style={{ fontSize: "16px" }}>Your corrected text will appear here.</p>
          </div>
        )}
      </SideMenu>


    </PageContainer>
  );
};

export default GrammarChecker;
