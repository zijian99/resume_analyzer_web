import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./AccountBoxStyles";
import { AccountContext } from "./AccountContext";

export function LoginForm(props) {
  const navigate = useNavigate(); // Hook for navigation
  const { switchToSignup } = useContext(AccountContext);

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    navigate("/home");

    // try {
    //   const response = await fetch("http://your-backend-api.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     // Store token if needed
    //     localStorage.setItem("token", data.token);
    //     // Redirect to home page
    //     navigate("/home");
    //   } else {
    //     setError(data.message || "Invalid login credentials");
    //   }
    // } catch (error) {
    //   setError("Something went wrong. Please try again.");
    // }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <SubmitButton type="submit">Sign In</SubmitButton>
      </FormContainer>

      <MutedLink href="#">Forgot your password?</MutedLink>
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign Up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
