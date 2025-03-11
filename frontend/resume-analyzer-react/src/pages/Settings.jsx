import React, { useState } from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSlider = styled.span`
  width: 40px;
  height: 20px;
  background: ${(props) => (props.checked ? "#007bff" : "#ccc")};
  border-radius: 20px;
  position: relative;
  margin-left: 10px;
  transition: 0.3s;
  &::before {
    content: "";
    width: 18px;
    height: 18px;
    background: white;
    position: absolute;
    top: 1px;
    left: ${(props) => (props.checked ? "20px" : "2px")};
    border-radius: 50%;
    transition: 0.3s;
  }
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  &:hover {
    background-color: #0056b3;
  }
`;

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <SettingsContainer>
      <Title>Settings</Title>

      <Section>
        <Label>Preferred Theme</Label>
        <Input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., light, dark"
        />
      </Section>

      <Section>
        <Label>Email Notifications</Label>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <ToggleSlider checked={notifications} />
        </ToggleSwitch>
      </Section>

      <SaveButton>Save Changes</SaveButton>
    </SettingsContainer>
  );
};

export default Settings;