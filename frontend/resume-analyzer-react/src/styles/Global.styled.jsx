import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    
}

html {
    overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #cbcaca;
}

::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: grey;
}
`;


export default GlobalStyles;