import React, { useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./AccountBoxStyles";
import { AccountContext } from "./AccountContext";

export function RegisterForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false)

  const handleRegister = async (e) => {
    // e.preventDefault();
    // setError(null);
    // setSuccess(null);
    setIsRegistered(true);
    setSuccess("Registration successful! You can now sign in.");
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match!");
    //   return;
    // }

    // try {
    //   const response = await fetch("http://localhost:8080/auth/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ fullName, email, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setSuccess("Registration successful! You can now sign in.");
    //   } else {
    //     setError(data.message || "Registration failed.");
    //   }
    // } catch (err) {
    //   setError("Something went wrong. Please try again.");
    // }
  };

  return (
    <BoxContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}

      
      {success && <p style={{ color: "green" }}>{success}</p>}

      {!isRegistered && <FormContainer onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          // required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // required
        />
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </FormContainer>}
      
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign In
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
