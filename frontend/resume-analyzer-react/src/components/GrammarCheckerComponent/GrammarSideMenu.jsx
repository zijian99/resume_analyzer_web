import React from "react";
import styled from "styled-components";
import loadingGIF from "../../assets/loading.gif"

const SideMenuContainer = styled.div`
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

const CorrectedText = styled.p`
  line-height: 1.8;  /* Adjust for better readability */
  white-space: pre-wrap; /* Ensures new lines are preserved */
  word-wrap: break-word;  /* Prevents overflow */
  font-size: 18px;
  color: #333;
  padding: 10px 0;
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





const GrammarSideMenu = ({ isOpen, loading, textAnalysis, replaceWithCorrectedText, getHighlightedText }) => {
  
  return (
      <SideMenuContainer isOpen={isOpen}>
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
      </SideMenuContainer>
  );
};

export default GrammarSideMenu;
