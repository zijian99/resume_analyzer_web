import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    box-sizing: border-box;
    font-family: 'Lato',sans-serif;
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

/* Global Scrollbar Styles */
::-webkit-scrollbar {
  width: 10px; 
  height: 10px; 
}

/* Scrollbar Track */
::-webkit-scrollbar-track {
  background: #cbcaca;; 
}

/* Scrollbar Thumb */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3); 
  border-radius: 10px; 
}

/* On Hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5); 
}
`;


export default GlobalStyles;