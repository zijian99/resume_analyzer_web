import styled from "styled-components";
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiOutlineStrikethrough, AiOutlineUnorderedList } from "react-icons/ai";

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



const TextToolbar = ({userText}) => {
  
  return (
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
  );
};

export default TextToolbar;
