import React, { useContext } from "react";
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
  
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      {/* <Marginer direction="vertical" margin={10} /> */}
      <MutedLink href="#">Forget your password?</MutedLink>

      <SubmitButton type="submit">Sign In</SubmitButton>

      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign Up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
