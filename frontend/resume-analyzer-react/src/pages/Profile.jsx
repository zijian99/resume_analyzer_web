import React, { useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
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

const Profile = () => {
  const [name, setName] = useState("XXX");
  const [email, setEmail] = useState("XXX@example.com");

  return (
    <ProfileContainer>
      <Title>Profile</Title>

      <Section>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Section>

      <Section>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Section>

      <SaveButton>Save Changes</SaveButton>
    </ProfileContainer>
  );
};

export default Profile;