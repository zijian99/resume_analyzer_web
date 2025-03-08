import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: #f8f9fc;
`;

const EditorPanel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: white;
  border-right: 2px solid #e0e0e0;
  overflow: hidden;
`;

const ResultPanel = styled.div`
  width: 50%;
  padding: 40px;
  background: white;
  overflow-y: auto;
`;

const TextEditor = styled.div`
  // flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
  line-height: 1.8; /* Increased line height for better readability */
  min-height: 80%;
  background: white;
  overflow-y: auto;
  outline: none;
  white-space: pre-wrap;
  word-wrap: break-word;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const HighlightedText = styled.div`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 18px;
  line-height: 1.8; /* Increased spacing */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

// Styled Component for Highlighted Text
const Highlight = styled.span`
  background-color: yellow;
`;

const GrammarChecker = () => {
  const [userText, setUserText] = useState("");
  const [textAnalysis, setTextAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkText = async () => {
    if (!userText.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/check_text/", { text: userText });
      setTextAnalysis(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("Failed to analyze text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getHighlightedText = (textAnalysis) => {
  if (!textAnalysis) return null; // Handle undefined case

  let { corrected_text, spelling_errors, grammar_errors } = textAnalysis;
  let corrections = [...spelling_errors, ...grammar_errors];

  // Sort corrections by length in descending order (to replace longer corrections first)
  corrections.sort((a, b) => b.corrected.length - a.corrected.length);

  // Create a regex pattern to match the corrected words/phrases
  const regexPattern = new RegExp(
    corrections.map(({ corrected }) => `(${corrected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`).join("|"),
    "gi"
  );

  // Replace function that wraps corrected text in <Highlight>
  const highlightedText = corrected_text.split(regexPattern).map((part, index) =>
    corrections.some(({ corrected }) => corrected === part) ? (
      <Highlight key={index}>{part}</Highlight>
    ) : (
      part
    )
  );

  return <p>{highlightedText}</p>;
};
  
  

  return (
    <PageContainer>
      {/* Left Side - Full Page Text Editor */}
      <EditorPanel>
        <h2>Grammar & Spell Check</h2>
        <TextEditor
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setUserText(e.target.innerText)}
          placeholder="Start writing here..."
        />
        <Button onClick={checkText} disabled={!userText.trim() || loading}>
          {loading ? "Checking..." : "Check Text"}
        </Button>
      </EditorPanel>

      {/* Right Side - Corrections & Suggestions */}
      <ResultPanel>
        {textAnalysis && (
          <>
            <h3>Corrected Text</h3>
            <HighlightedText>{getHighlightedText(textAnalysis)}</HighlightedText>

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
        )}
      </ResultPanel>
    </PageContainer>
  );
}; 

export default GrammarChecker;


