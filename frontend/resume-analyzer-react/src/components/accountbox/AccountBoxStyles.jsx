import styled from "styled-components";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTAINER

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  // background-color:green;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);

  padding: 2em 2em;
`;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMPONENT

export const MutedLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;

  color: rgba(150, 150, 150, 0.8);

  margin: 2em 1em;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;

  color: rgb(93, 47, 194);

  margin: 0 4px;
`;

export const Input = styled.input`
  width: 90%;
  height: 35px;
  box-sizing: border-box;

  outline: none;
  border: 0px solid rgba(200, 200, 200, 0.3);
  border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);

  font-size: 14px;
  
  transition: all 200ms ease-in-out;
  
  margin: 1em 2em;
  // padding: 2px 10px;

  &::placeholder {
    color: rgb(150, 150, 150);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    //border-bottom: 2px solid rgb(241, 196, 15);
    border-bottom: 2px solid rgb(93, 47, 194);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;

  font-size: 15px;
  font-weight: 600;

  color: #fff;
  background: rgb(93, 47, 194);
  background: linear-gradient(
    58deg,
    rgba(93, 47, 194, 1) 20%,
    rgba(93, 27, 194, 1) 100%
  );
  // background: rgb(241, 196, 15);
  // background: linear-gradient(
  //   58deg,
  //   rgba(241, 196, 15, 1) 20%,
  //   rgba(243, 172, 18, 1) 100%
  // );

  transition: all, 240ms ease-in-out;

  margin: 2em 2em;
  padding: 11px 40%;

  &:hover {
    opacity: 0.9;
  }
`;
