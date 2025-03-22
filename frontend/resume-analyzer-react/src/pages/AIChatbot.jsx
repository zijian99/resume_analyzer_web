import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import avatarPic from "../assets/avatar.png"

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 20px 50px;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const MessageBoxContainer = styled.div`
  max-width: 60%;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 1em;
`;

const Message = styled.div`
  max-width: 50%;
  min-width: fit-content;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  line-height: 1.8;
  text-align: start;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  color: ${(props) => (props.isUser ? 'white' : 'black')};
  background-color: ${(props) => (props.isUser ? '#007BFF' : 'white')};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  position: relative;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: ${(props) => (props.isUser ? '0' : '8px')};
  margin-left: ${(props) => (props.isUser ? '8px' : '0')};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-top: 1px solid #ddd;
  position: sticky; /* Keeps input fixed at bottom */
  padding: 20px;
  bottom: 0;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  outline: none;
  background: #f0f0f0;
  resize: none;
  height: 40px;
  min-height: 20px;
  max-height: 150px;
  overflow-y: auto;

  &::placeholder {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #888;
  }
`;

const SendButton = styled.button`
  margin-left: 8px;
  padding: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 1em;
  color: #333;
`;

const TypingIndicator = styled.div`
  font-size: 18px;
  color: #888;
  font-style: italic;
  margin-left: 8px;
`;

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you with your career today? Are you looking for job search advice, resume tips, or just general career guidance? 😊", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onmessage = (event) => {
      setTyping(true); // Show "Typing..." for 1 second before responding
      setTimeout(() => {
        setTyping(false);
        const botMessage = { text: event.data, isUser: false };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    };

    return () => ws.current.close();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [typing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      // Ensure scrolling happens after state updates
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      ws.current.send(input);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <PageTitle>Your AI Career Advisor</PageTitle>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <MessageBoxContainer key={index} isUser={msg.isUser}>
            {!msg.isUser && <Avatar src={avatarPic} alt="Chatbot Avatar" />}
            <Message isUser={msg.isUser}>{msg.text}</Message>
          </MessageBoxContainer>
        ))}
        {typing && (
          <MessageBoxContainer isUser={false}>
            <Avatar src={avatarPic} alt="Chatbot Avatar" />
            <TypingIndicator>Typing...</TypingIndicator>
          </MessageBoxContainer>
        )}
        {/* Empty div to keep the scroll at the bottom */}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
        />
        <SendButton onClick={sendMessage}>📩</SendButton>
        
      </InputContainer>
    </ChatContainer>
  );
};

export default AIChatbot;
